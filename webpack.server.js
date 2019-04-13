const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // isomorphic-style-loader
          {
            loader: 'isomorphic-style-loader'
          },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              importLoaders: true,
              localIdentName: '[local]'
            }
          },
          // sass-loader
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '../dist/assets',
              publicPath: '/assets'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '../dist/assets',
              publicPath: '/assets'
            }
          }
        ]
      }
    ]
  }
};