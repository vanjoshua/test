const path = require('path');

module.exports = {
    entry: {
      element: './src/index.js',
      panel: './src/panel.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    }
  };