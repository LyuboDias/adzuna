// require the path module and the html-webpack-plugin
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // specify an entry
  entry: "./src/index.js",

  //  specify the output path
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundlefile.js",
  },

  // specify the test files and files to exclude
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // specify the loader as babel-loader
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  // all webpack plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
