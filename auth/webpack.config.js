const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./client/index.tsx",
  output: {
    path: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html"
    })
  ]
};
