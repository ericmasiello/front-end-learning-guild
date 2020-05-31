const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.resolve(__dirname, "dist"),
};

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(PATHS.app, "index.html"),
});

const miniCssPlugin = new MiniCssExtractPlugin();

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        include: PATHS.app,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        include: PATHS.app,
      },
    ],
  },
  plugins: [htmlWebpackPlugin, miniCssPlugin],
};
