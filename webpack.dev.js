const common = require('./webpack.common');
const merge = require('webpack-merge');
const DotenvWebpack = require('dotenv-webpack');
const dotenv = require('dotenv');
const dotenvPath = './.env.development';
const env = dotenv.config({
  path: dotenvPath
}).parsed;

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DotenvWebpack({
      path: dotenvPath
    })
  ],
  devServer: {
    port: env.PORT
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // style-loader
          {
            loader: 'style-loader'
          },
          // css-loader
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[local]'
            }
          },
          // sass-loader
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};

module.exports = merge(common, config);
