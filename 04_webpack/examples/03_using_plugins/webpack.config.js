const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist'),
};

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(PATHS.app, 'index.html'),
});

const extractTextPluginConfig = new ExtractTextPlugin('styles.css');

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: PATHS.app,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: PATHS.app,
      },
    ],
  },
  plugins: [
    htmlWebpackPluginConfig,
    extractTextPluginConfig,
  ],
};
