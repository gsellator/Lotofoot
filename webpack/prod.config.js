// Webpack config for creating the production bundle.
var path = require("path");
var webpack = require("webpack");
var extractTextPlugin = require("extract-text-webpack-plugin");
var writeStats = require("./utils/write-stats");
var autoprefixer = require('autoprefixer');

var appName = process.env.APP_NAME || 'lotofoot-dev';
var dist = path.resolve(__dirname, '../public/assets');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/client.js'
  ],
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: dist,
    publicPath: '/assets/'
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|xml|json|css|js)$/,
        include: /src\/assets\/static/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/,
        exclude: /src\/assets\/static/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: [/src\/assets\/static/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["env", {
                  "targets": {
                    "browsers": [ "ie 11" ]
                  }
                }],
                "stage-0",
                "react"
              ],
              plugins: ['transform-object-assign']
            },
          },
        ]
      },


      {
        test: /\.scss$/,
        loader: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "autoprefixer-loader",
              options: {
                browsers: ['Last 2 versions', 'iOS 7']
              }
            },
            {
              loader: "sass-loader"
            }
          ],
        })
      },

    ]
  },

  plugins: [
    // css files from the extract-text-plugin loader
    new extractTextPlugin({
      filename: "[name]-[chunkhash].css",
    }),

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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // stats
    function() {
      this.plugin('done', writeStats);
    }
  ]
};