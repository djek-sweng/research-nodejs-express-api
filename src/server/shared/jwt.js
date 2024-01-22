'use strict';

const jwt = require('jsonwebtoken');

const { getJwtConfig } = require('./config');

const { secret, expires_in, algorithm } = getJwtConfig();

module.exports.EXPIRES_IN = expires_in;

module.exports.encodeToken = (payload, subject) => {
  const options = {
    algorithm: algorithm,
    expiresIn: expires_in,
    subject: subject,
  };

  return jwt.sign(payload, secret, options);
};

module.exports.decodeToken = (token) => {
  const options = {
    algorithm: algorithm,
  };

  return jwt.verify(token, secret, options);
};
