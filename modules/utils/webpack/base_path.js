const dotenv = require('dotenv');
const isProduction = process.env.NODE_ENV === 'production';
const dotenvPath = isProduction ? './.env' : './.env.development';

const env = dotenv.config({
  path: dotenvPath
}).parsed;

const basePath = env.BASEPATH !== "" ? `/${env.BASEPATH}/assets` : `/assets`;
module.exports = basePath;