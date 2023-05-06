const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [ new HtmlWebpackPlugin({
    template: "./client/public/index.html",
    filename: "./index.html"
  })],
  module: {
    rules: [
      { test: /\.html$/i, loader: "html-loader" },
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
  devServer: {
    compress: true,
    proxy: [
      {
        context: ['/'],
        target: 'http://localhost:5000/',
      },
    ],
    static: {
        directory: path.join(__dirname, 'dist'),
    },
  },
};
