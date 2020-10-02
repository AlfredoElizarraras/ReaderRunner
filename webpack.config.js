/* eslint-disable import/no-unresolved */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'none',

  entry: ['./src/index.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
      },

      // HTML LOADER + plug
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },

      // FILE LOADER - images
      {
        test: /\.(ogg|mp3|png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          output: 'img/',
          publicPath: '../',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
/* eslint-enable import/no-unresolved */
