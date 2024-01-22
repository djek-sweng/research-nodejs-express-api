'use strict';

const bcrypt = require('bcryptjs');

const { getCryptHashSalt } = require('./config');

const salt = getCryptHashSalt();

module.exports.hash = async (str) => {
  return await bcrypt.hash(str, salt);
};

module.exports.compare = async (str, hash) => {
  return await bcrypt.compare(str, hash);
};
