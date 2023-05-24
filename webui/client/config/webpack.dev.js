const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test'){
  const checkEnv = dotenv.config({
    path: '../config/test/.testenv'
  });
  if(checkEnv.error) {
    throw new Error('Unable to load .testenv file');
  }
} else {
  const checkEnv = dotenv.config({
    path: '../.env'
  });
  if(checkEnv.error) {
    throw new Error('Unable to load .env file');
  }
}

const common = require('./webpack.common');

const publicUrl = '/';

module.exports = merge(common, {
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicUrl
  },
  module: {
    rules: [
      {
        oneOf: [
          {
           test: /\.html$/,
           exclude: /index\.html$/,
           use: [{ loader: 'html-loader' }]
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: 'WEBUI__[name]__[local]___[hash:base64:5]',
                  camelCase: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              { 
                loader: 'style-loader',
                options: {
                }
              },
              {
                loader: 'css-loader',
                options: {
                }
              }
            ]
          },
        ]
      }
    ],
  },
  watch: (!process.env.NODE_ENV === 'test'),
  watchOptions: {
    ignored: /node_modules/
  },
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 3001,
    proxy: [
      {
        '/api': 'http://localhost:3000',
        '/auth': 'http://localhost:3000',
        '/log': 'http://localhost:3000'
      },
    ],
    client: {
      progress: true
    },
    devMiddleware: {
      index: true,
      publicPath: publicUrl,
      serverSideRender: true,
      writeToDisk: true,
    },
    compress: true,
    historyApiFallback: true,
    watchFiles: publicUrl,
    hot: true
  },
  plugins: [ 
    new webpack.DefinePlugin({
      'process.env': dotenv.parsed
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, '../public/env.ejs'),
      filename: 'env.js',
      templateParameters: {
        MICROFRONTEND_APP1_URL: 'replaceActualApp1Url',
        MICROFRONTEND_APP2_URL: 'replaceActualApp2Url'
      }
  })],
});
