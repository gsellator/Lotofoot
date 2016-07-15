// Webpack config for creating the production bundle.
var path = require("path");
var webpack = require("webpack");
var extractTextPlugin = require("extract-text-webpack-plugin");
var writeStats = require("./utils/write-stats");
var autoprefixer = require('autoprefixer');
var strip = require("strip-loader");

var appName = process.env.APP_NAME || 'lotofoot-dev';
var dist = path.resolve(__dirname, "../public/assets");

module.exports = {
  devtool: "source-map",
  entry: ['babel-polyfill', "./src/client.js"],
  output: {
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    path: dist,
    publicPath: "/assets/"
  },

  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg|xml|json)$/, include: /src\/assets\/static/, loader: "file?name=[name].[ext]" },
      { test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/, exclude: /src\/assets\/static/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel"] },
      { test: /\.scss$/, loader: extractTextPlugin.extract("style", "css?-autoprefixer!postcss!sass") },
    ]
  },
  postcss: [ autoprefixer({ browsers: ['Last 2 versions', 'iOS 7'] }) ],

  plugins: [
    // css files from the extract-text-plugin loader
    new extractTextPlugin("[name]-[chunkhash].css"),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        APP_NAME: JSON.stringify(appName),
        BROWSER: JSON.stringify(true),
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