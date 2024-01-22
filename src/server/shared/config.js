'use strict';

const dotnev = require('dotenv');

// eslint-disable-next-line no-undef
const env = process.env;

let isConfigLoaded = false;

const loadConfig = () => {
  if (!isConfigLoaded) {
    dotnev.config();
  }

  isConfigLoaded = true;
};

module.exports.getDbConfig = () => {
  loadConfig();
  return {
    uri: env.DB_URI,
    name: env.DB_NAME,
  };
};

module.exports.getServerConfig = () => {
  loadConfig();
  return {
    port: env.SERVER_PORT,
    https_port: env.SERVER_HTTPS_PORT,
    https_enable: env.SERVER_HTTPS_ENABLE === 'true' ? true : false,
  };
};

module.exports.getCryptHashSalt = () => {
  loadConfig();
  return parseInt(env.CRYPT_HASH_SALT);
};

module.exports.getJwtConfig = () => {
  loadConfig();
  return {
    secret: env.JWT_SECRET,
    expires_in: parseInt(env.JWT_EXPIRES_IN),
    algorithm: env.JWT_ALGORITHM,
  };
};
