'use strict';

const { validationResult } = require('express-validator');

const { UnprocessableEntity } = require('./../shared/errors');

module.exports.executeAsync = async (next, callback) => {
  try {
    return await callback();
  } catch (err) {
    next(err);
    return err;
  }
};

module.exports.ensureRequest = (req) => {
  const errors = validationResult(req);

  const message = `${req.method} ${req.baseUrl} is unprocessable.`;

  if (!errors.isEmpty()) {
    throw UnprocessableEntity({ errors: errors.array() }, message);
  }
};
