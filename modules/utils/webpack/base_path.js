const dotenv = require('dotenv');
const isProduction = process.env.NODE_ENV === 'production';
const dotenvPath = isProduction ? './.env' : './.env.development';

const env = dotenv.config({
  path: dotenvPath
}).parsed;

const ASSETS_PATH = env.ASSETS_PATH || 'assets'

const basePath = env.BASEPATH !== "" ? `/${env.BASEPATH}/${ASSETS_PATH}` : `/${ASSETS_PATH}`;
module.exports = basePath;