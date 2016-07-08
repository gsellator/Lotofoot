// This is the webpack config to use during development.
import path from "path";
import webpack from "webpack";
import WebpackErrorNotificationPlugin from "webpack-error-notification";
import writeStats from "./utils/write-stats";
import notifyStats from "./utils/notify-stats";
import autoprefixer from "autoprefixer";

const host = "localhost";
const port = parseInt(process.env.PORT) + 1 || 3001;
const appName = process.env.APP_NAME || 'lotofoot-dev';
const dist = path.resolve(__dirname, "../public/assets");

const config = {
  devtool: "cheap-module-eval-source-map",
  entry: {
    "main": [
      "webpack-dev-server/client?http://" + host + ":" + port,
      "webpack/hot/only-dev-server",
      "./src/client.js"
    ]
  },
  output: {
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[hash].js",
    path: dist,
    publicPath: "http://" + host + ":" + port + "/assets/"
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg|xml|json)$/, include: /src\/assets\/static/, loader: "file?name=[name].[ext]" },
      { test: /\.(jpe?g|png|gif|svg|eot|woff2|woff|ttf)$/, exclude: /src\/assets\/static/, loader: "file" },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?cacheDirectory"] },
      { test: /\.scss$/, loaders: ["style", "css", "postcss", "sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"] },
    ]
  },
  postcss: [ autoprefixer({ browsers: ['Last 2 versions', 'iOS 7'] }) ],

  progress: true,
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        APP_NAME: JSON.stringify(appName),
        BROWSER: JSON.stringify(true),
      }
    }),
    new WebpackErrorNotificationPlugin(),

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

export default config;