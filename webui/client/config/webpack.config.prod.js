const path = require('path');
const { merge } = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkash:8].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: 'WEBUI__[name]__[local]___[hash:base64:5]',
                  camelCase: true
                },
              },
              'sass-loader'
            ]
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          },
        ]
      }
    ],
  },
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors', 
          chunks: 'all'
        }
      }
    }
  },
  plugins: [ 
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ]
});
