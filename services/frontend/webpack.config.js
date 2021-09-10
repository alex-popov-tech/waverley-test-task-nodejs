const path = require('path');
require('dotenv').config();

const mode = process.env.NODE_ENV.toLowerCase() === 'production' ? 'production' : 'development';

module.exports = {
  mode,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, '..', '..', 'dist', 'assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
