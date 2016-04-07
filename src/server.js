import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import morgan from "morgan";
import csurf from "csurf";
import app from "./app";
import config from "./config";
import render from "./server/render";
var request = require('superagent-promise')(require('superagent'), Promise);

// Initialize express server
const server = express();

// Usual express stuff
server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(favicon(path.resolve(__dirname, "./assets/uiux_favicon.png")));

// Google
server.get('/robots.txt', function(req, res) {
  res.header('Content-Type', 'text/plain');
  res.status(200).send('User-agent: *\nDisallow: /maintenance\nDisallow: /error\nDisallow: /mire');
});

// Logout
server.get('/logout', function(req, res) {
  res.writeHead(302, {
    'Set-Cookie': 'dld_authentication=' + '; Path=/',
    'Content-Type': 'text/plain',
    'Location': '/'
  });
  res.end();
});

// This is used by the fetchr plugin
server.use(csurf({ cookie: true }));

// Configure fetchr (for doing api calls server and client-side)
// and register its services
const fetchr = app.getPlugin("FetchrPlugin");
fetchr.registerService(require("./services/LoginService"));
fetchr.registerService(require("./services/MeService"));
fetchr.registerService(require("./services/ApiService"));

// Use the fetchr middleware (will enable requests from /api)

server.use(fetchr.getXhrPath(), fetchr.getMiddleware());

// On production, use the public directory for static files
// This directory is created by webpack on build time.

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
server.use(function(req, res, next) {
  const context = app.createContext({ req, res });
  let dld_authentication = req.cookies.dld_authentication;

  if (dld_authentication) {
    // There user is logged, acces to the login page is forbidden
    if (req.url == '/login') {res.redirect(303, '/home'); return;}
    next();
  } else{
    // There is no accessToken, we ask for credentials
    if (req.url == '/login') {next();}
    else {res.redirect(303, '/login'); return;}
  }
});

server.use(render);

// Generic server errors (e.g. not caught by components)
server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  console.log("Error on request %s %s", req.method, req.url);
  console.log(err);
  console.log(err.stack);
  res.status(500).send("Cette page n'est pas disponible");
});

// Finally, start the express server

server.set("port", process.env.PORT || 3000);

let activeServer = server.listen(server.get("port"), () => {
  console.log(`Express ${server.get("env")} server listening on ${server.get("port")}`);
});