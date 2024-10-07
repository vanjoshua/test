const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    element: './src/element.js',
    element2: './src/element2.js',
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
      {
        test: /\.css$/, // This rule matches all CSS files
        use: ['style-loader', 'css-loader'] // Use both style-loader and css-loader
      },
    ]
  },
};