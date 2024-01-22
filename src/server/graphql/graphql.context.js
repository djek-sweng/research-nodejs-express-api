'use strict';

const jwt = require('./../shared/jwt');
const User = require('./../models/user.model');

module.exports = async (req) => {
  const ctx = {
    user: null,
  };

  const authorization = req.headers.authorization;
  if (!authorization) {
    return ctx;
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    return ctx;
  }

  let decodedToken;
  try {
    decodedToken = jwt.decodeToken(token);
  } catch {
    return ctx;
  }

  const userId = decodedToken?.sub;
  if (!userId) {
    return ctx;
  }

  const user = await User.findById(userId);
  if (!user) {
    return ctx;
  }

  ctx.user = user;

  return ctx;
};
