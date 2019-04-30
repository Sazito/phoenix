const common = require('./webpack.common');
const merge = require('webpack-merge');
const DotenvWebpack = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const RtlCssPlugin = require('rtl-css-transform-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const dotenvPath = './.env.development';

const config = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new DotenvWebpack({
      path: dotenvPath,
      safe: true // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    }),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "assets/[name]-ltr.[hash].css",
      chunkFilename: "assets/[name]-ltr.[hash].css"
    }),
    new OptimizeCSSAssetsPlugin({}),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json'
    }),
    new RtlCssPlugin({
      filename: 'assets/[name]-rtl.[hash].css'
    })
  ],
  optimization:{
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
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['prettier-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // extract css
          {
            loader:ExtractCssChunks.loader,
            options: {
              hot: true,
              reloadAll: true
            }
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
      }
    ]
  }
};

module.exports = merge(common, config);
