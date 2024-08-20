const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    element: './src/element.js',
    panel: './src/panel.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  }
};