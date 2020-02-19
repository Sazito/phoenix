const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const dotenvPath = isProduction ? './.env' : './.env.development';
const publicPath = require('./modules/utils/webpack/public_path');
try {
  if (fs.existsSync(path.resolve(__dirname, dotenvPath))) {
    console.log(`${dotenvPath} loaded`)
  } else {
    console.error('');
    console.error(`${dotenvPath} does not exist`);
    console.error(`Please make a copy from .env.default and set the correct data`);
    console.error('');
    process.exit(1);
  }
} catch(err) {
  console.error(err);
  process.exit(1);
}
const dotenv = require('dotenv');
const env = dotenv.config({
  path: dotenvPath
}).parsed;

module.exports = {
  entry: './client/index.js',
  output: {
    filename: isProduction ? 'assets/main.[contentHash].js' : 'assets/main.js',
    chunkFilename: 
    isProduction ? 'assets/[name].[contentHash].js' : 'assets/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath
  },
  devServer: {
    port: env.PORT,
    historyApiFallback: {
      index: publicPath
    },
    compress: true,
    open: true,
    publicPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'view/index.html'),
      inject: true,
      title: env.APP_NAME
    })
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "useBuiltIns": "usage",
                    "corejs": 3
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
          'eslint-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets'
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
              outputPath: './assets'
            }
          }
        ]
      }
    ]
  }
};
