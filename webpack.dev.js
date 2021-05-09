const common = require('./webpack.common');
const codeDevConfig = require('./code/configs/webpack/webpack.dev');
const merge = require('webpack-merge');
const DotenvWebpack = require('dotenv-webpack');
const dotenv = require('dotenv');
const dotenvPath = './.env.development';
const proxyList = require("./code/configs/proxy");
const ExtractCssChunksWithPageDirection = require("extract-css-chunks-webpack-plugin-with-page-direction");
const RtlCssPlugin = require('rtl-css-transform-webpack-plugin');
const env = dotenv.config({
  path: dotenvPath
}).parsed;

const ASSETS_PATH = env.ASSETS_PATH || 'assets';

const proxy = {};
proxyList.map(record => {
  proxy[record.path] = {
    target: record.target,
    changeOrigin: true,
    pathRewrite: { [`^${record.path}`]: "" },
    logLevel: 'debug'
  };
});

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new DotenvWebpack({
      path: dotenvPath
    }),
    new ExtractCssChunksWithPageDirection({
      filename: `${ASSETS_PATH}/[name]-[pagedir].css`,
      chunkFilename: `${ASSETS_PATH}/[name]-[pagedir].css`
    }),
    new RtlCssPlugin({
      filename: `${ASSETS_PATH}/[name]-rtl.css`,
      sourcemap: true
    })
  ],
  devServer: {
    port: env.PORT,
    proxy
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          // style-loader
          {
            loader: ExtractCssChunksWithPageDirection.loader,
            options: {
              hot: true,
              reloadAll: true
            }
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
          // style-loader
          {
            loader: ExtractCssChunksWithPageDirection.loader,
            options: {
              hot: true,
              reloadAll: true
            }
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
          }
        ]
      }
    ]
  }
};

module.exports = merge.smart(common, config, codeDevConfig);
