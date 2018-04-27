import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "path";
import favicon from "serve-favicon";
import csurf from "csurf";

import config from "./config";
import app from "./app";

import logout from "./server/logout";
import forceSsl from "./server/forceSsl";
import robots from "./server/robots";
import sitemap from "./server/sitemap";
import render from "./server/render";

import notifierServer from "./server/notifierServer";
import ApiService from "./services/ApiService";

// Initialize express server
const server = express();
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());

// Favicon
server.use(favicon(path.resolve("./src/assets/uiux_favicon.png")));

// Logout
server.get('/logout', logout);

// Notifier
let io;
server.post('/notifier/update', (req, res) => {notifierServer.post(req, res, io);});

// SSL
if (server.get("env") === "production") {
  server.use(forceSsl);
}

// Google
server.get('/robots.txt', robots);
server.get('/sitemap.xml', sitemap);

// APIs reverse proxy
// Configure fetchr (for doing api calls server and client-side)
server.use(csurf({ cookie: true }));
const fetchr = app.getPlugin("FetchrPlugin");
fetchr.registerService(ApiService);

// Use the fetchr middleware (will enable requests from /api)
server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

// On production, use the public directory for static files
if (server.get("env") === "production") {
  server.use(express.static(path.resolve(__dirname, "../public"), {
    maxAge: 365 * 24 * 60 * 60
  }));
}

// On development, serve the static files from the webpack dev server.
if (server.get("env") === "development") {
  require("../webpack/server");
}

// Render the app server-side and send it as response
server.use((req, res, next) => {
  const context = app.createContext({ req, res });
  let cookie = req.cookies[config.cookie];

  if (cookie) {
    // There user is logged, acces to the login page is forbidden
    if (req.url.indexOf('/login') == 0) {return res.redirect(303, '/');}
    next();
  } else{
    // There is no accessToken, we ask for credentials
    if (
      req.url.indexOf('/login') == 0 ||
      req.url.indexOf('/recover') == 0 ||
      req.url.indexOf('/404') == 0 ||
      req.url.indexOf('/500') == 0
    ) {next();}
    else {return res.redirect(303, '/login');}
  }
});
server.use(render);

// Generic server errors (e.g. not caught by components)
server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  console.log("Error on request %s %s", req.method, req.url);
  console.log(err);
  console.log(err.stack);
  if (err && err.statusCode == 404)
    return res.redirect(303, '/');
  else
    return res.redirect(303, '/500');
});

// Start the express server
server.set("port", process.env.PORT || 3000);

let activeServer = server.listen(server.get("port"), () => {
  console.log(`Express ${server.get("env")} server listening on ${server.get("port")}`);
});

// Start the websocket server
io = require('socket.io')({
  transports  : [ 'xhr-polling' ],
  pollingDuration  : 10,
}).listen(activeServer);

io.on('connection', function (socket) {
  var ping = setInterval(function () {
    socket.volatile.emit('testyo', 'coucou');
  }, 1000);

  socket.on('disconnect', function() {
    clearInterval(ping)
  })
})