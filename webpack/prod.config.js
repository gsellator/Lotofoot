// Webpack config for creating the production bundle.

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");

var assetsPath = path.join(__dirname, "../public/assets");
var appName = process.env.APP_NAME || 'lotofoot-dev';

module.exports = {
  devtool: "source-map",
  entry: {
    "main": "./src/client.js"
  },
  output: {
    path: assetsPath,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[hash].js",
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg|xml|json)$/, include: /src\/assets\/static/, loader: "file?name=[name].[ext]" },
      { test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/, exclude: /src\/assets\/static/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel"] },
//      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!autoprefixer!sass") }
      { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
    ]
  },
  progress: true,
  plugins: [

    // ignore debug statements (uncommented for demo app)
    // new webpack.NormalModuleReplacementPlugin(/debug/, process.cwd() + "/webpack/utils/noop.js"),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css"),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      "process.env": {

        // Mainly used to require CSS files with webpack, which can happen only on browser
        // Used as `if (process.env.BROWSER)...`
        BROWSER: JSON.stringify(true),

        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify("production"),
        APP_NAME: JSON.stringify(appName),
        
        BROWSERSLIST: JSON.stringify("./browserslist"),
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
        }
    }),

    // stats
    function() { this.plugin("done", writeStats); }

  ]
};