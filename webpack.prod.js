const common = require('./webpack.common');
const codeProdConfig = require('./code/configs/webpack/webpack.prod');
const merge = require('webpack-merge');
const DotenvWebpack = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const RtlCssPlugin = require('rtl-css-transform-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');
const isProduction = process.env.NODE_ENV === 'production';
const dotenvPath = isProduction ? './.env' : './.env.development';

const config = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new DotenvWebpack({
      path: dotenvPath,
      safe: true // load '.env.default' to verify the '.env' variables are all set. Can also be a string to a different file.
    }),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "assets/[name]-ltr.[hash].css",
      chunkFilename: "assets/[name]-ltr.[hash].css"
    }),
    new OptimizeCSSAssetsPlugin({}),
    new ReactLoadableSSRAddon({
      filename: 'react-loadable.json'
    }),
    new RtlCssPlugin({
      filename: 'assets/[name]-rtl.[hash].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      cacheGroups: {
        default: {
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          filename: 'assets/vendor.[contentHash].js'
        }
      }
    }
  },
  module: {
    rules: [{
        test: /.js$/,
        exclude: /node_modules/,
        use: ['prettier-loader']
      },
      {
        test: /\.(le|c)ss$/,
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
          }
        ]
      }
    ]
  }
};

module.exports = merge.smart(common, config, codeProdConfig);
