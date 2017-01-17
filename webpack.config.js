var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/components/containers/main.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
				include: path.join(__dirname, 'src/stylesheets'),
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
  ]
  }
}