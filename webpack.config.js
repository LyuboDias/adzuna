// require the path module and the html-webpack-plugin
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundlefile.js",
  },
  module: {
    rules: [
      {
        // specify the test files and files to exclude
        test: /\.js$/i,
        include: path.resolve(__dirname, "src"),
        use: {
          // specify the loader as babel-loader to transpile latest javascript syntaxes and JSX
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        //  loaders
        use: ["style-loader", "css-loader", "postcss-loader"],
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
