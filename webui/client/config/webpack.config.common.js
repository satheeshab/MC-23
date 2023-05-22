const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    bundle: path.join(__dirname, '../src/index.js')
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./src')
    ]
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            resolve: {
              extensions: ['.js', '.jsx']
            },
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              }
            ]
          },
          {
           test: /\.html$/,
           use: {
            loader: 'html-loader'
           } 
          },
          {
            test: /\.scss$/
          },
          {
            test: /\.css$/
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/, /\.ejs$/],
            options: {
              name: 'static/media/[name].[ext]'
            }
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack']
          }
        ]
      }
    ],
  },
  plugins: [ 

    new ESLintPlugin({
      extensions: ['.js', '.jsx']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        ignoreCustomFragments: [
          /<%=[\s\S]*?%>/
        ]
      }
    }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
};
