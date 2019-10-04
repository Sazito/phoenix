const common = require('./webpack.common');
const codeDevConfig = require('./code/configs/webpack/webpack.dev');
const merge = require('webpack-merge');
const DotenvWebpack = require('dotenv-webpack');
const dotenv = require('dotenv');
const dotenvPath = './.env.development';
const proxyList = require("./code/configs/proxy");
const env = dotenv.config({
  path: dotenvPath
}).parsed;

const proxy = {};
proxyList.map(record => {
  proxy[record.path] = {
    target: record.target,
    changeOrigin: true,
    pathRewrite: { [`^${record.path}`]: "" }
  };
});

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DotenvWebpack({
      path: dotenvPath
    })
  ],
  devServer: {
    port: env.PORT,
    proxy
  },
  module: {
    rules: [
      {
        test: /\.(le|sa|sc|c)ss$/,
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
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          // sass-loader
          {
            loader: 'sass-loader'
          },
          // less-loader
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
};

module.exports = merge.smart(common, config, codeDevConfig);
