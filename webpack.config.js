const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    element: './src/element.js',
    panel: './src/panel.js',
    panel2: './src/panel2.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
};