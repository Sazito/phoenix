const path = require('path');
const merge = require('webpack-merge');
const codeServerConfig = require('./code/configs/webpack/webpack.server');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin');
const basePath = require('./modules/utils/webpack/base_path');
const isProduction = process.env.NODE_ENV === 'production';

const ASSETS_PATH = process.env.ASSETS_PATH || 'assets';

const config = {
  mode: process.env.NODE_ENV,
  entry: './server/index.js',
  target: 'node',
  externals: [nodeExternals(), "react-helmet"],
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
    chunkFilename: '[name].[contentHash].js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                "@babel/preset-typescript",
                [
                  "@babel/preset-env",
                  {
                    "targets": {
                      "node": "current"
                    }
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                "react-loadable/babel",
                "@babel/plugin-syntax-dynamic-import"
              ]
            }
          },
          'prettier-loader'
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          // isomorphic-style-loader
          {
            loader: 'isomorphic-style-loader'
          },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          // less-loader
          {
            loader: 'less-loader'
          }
        ]
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
              localIdentName: '[name]__[local]__[hash:base64:5]'
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
              outputPath: `../dist/${ASSETS_PATH}`,
              publicPath: basePath
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
              outputPath: `../dist/${ASSETS_PATH}`,
              publicPath: basePath
            }
          }
        ]
      }
    ]
  }
};

if (!isProduction) {
  config.devtool = 'inline-source-map';
}

module.exports = merge.smart(config, codeServerConfig);
