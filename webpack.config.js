const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-react'],
          plugins: ['babel-plugin-styled-components']
        }
      }
    ]
  }
};