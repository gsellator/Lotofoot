// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var notifyStats = require("./utils/notify-stats");

var assetsPath = path.resolve(__dirname, "../public/assets");

var WEBPACK_HOST = "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;
var appName = process.env.APP_NAME || 'lotofoot-dev';

module.exports = {
  devtool: "#eval-source-map",
  entry: {
    "main": [
      "webpack-dev-server/client?http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
      "webpack/hot/only-dev-server",
      "./src/client.js"
    ]
  },
  output: {
    path: assetsPath,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[hash].js",
    publicPath: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT + "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg|xml|json)$/, include: /src\/assets\/static/, loader: "file?name=[name].[ext]" },
      { test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/, exclude: /src\/assets\/static/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?cacheDirectory"] },
      { test: /\.scss$/, loader: "style!css!autoprefixer!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true" }
    ]
  },
  progress: true,
  plugins: [

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        APP_NAME: JSON.stringify(appName),
        BROWSER: JSON.stringify(true)
      }
    }),

    // stats
    function () {
      this.plugin("done", notifyStats);
    },
    function () {
      this.plugin("done", writeStats);
    },

    // print a webpack progress
    new webpack.ProgressPlugin(function(percentage, message) {
      var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
      var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
      process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
    })

  ]
};