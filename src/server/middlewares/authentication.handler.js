'use strict';

const jwt = require('./../shared/jwt');
const { Unauthorized } = require('./../shared/errors');

module.exports = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    throw Unauthorized(null, 'Invalid authorization header.');
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    throw Unauthorized(null, 'Invalid authorization header.');
  }

  let decodedToken;
  try {
    decodedToken = jwt.decodeToken(token);
  } catch {
    throw Unauthorized(null, 'Invalid authorization token.');
  }

  const userId = decodedToken?.sub;
  if (!userId) {
    throw Unauthorized(null, 'Invalid authorization token.');
  }

  req.userId = userId;

  next();
};
