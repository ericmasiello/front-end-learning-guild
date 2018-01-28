const path = require('path');

module.exports = {
  entry: './js/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  }
}