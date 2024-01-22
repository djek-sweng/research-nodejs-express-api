'use strict';

const { StatusCodes } = require('http-status-codes');

module.exports.Unauthorized = (payload, message) => {
  const err = Error();

  err.statusText = 'UNAUTHORIZED';
  err.status = StatusCodes.UNAUTHORIZED;
  err.payload = payload ?? null;
  err.message = message ?? null;

  return err;
};

module.exports.Forbidden = (payload, message) => {
  const err = Error();

  err.statusText = 'FORBIDDEN';
  err.status = StatusCodes.FORBIDDEN;
  err.payload = payload ?? null;
  err.message = message ?? null;

  return err;
};

module.exports.NotFound = (payload, message) => {
  const err = Error();

  err.statusText = 'NOT_FOUND';
  err.status = StatusCodes.NOT_FOUND;
  err.payload = payload ?? null;
  err.message = message ?? null;

  return err;
};

module.exports.UnprocessableEntity = (payload, message) => {
  const err = Error();

  err.statusText = 'UNPROCESSABLE_ENTITY';
  err.status = StatusCodes.UNPROCESSABLE_ENTITY;
  err.payload = payload ?? null;
  err.message = message ?? null;

  return err;
};

module.exports.InternalServerError = (payload, message) => {
  const err = Error();

  err.statusText = 'INTERNAL_SERVER_ERROR';
  err.status = StatusCodes.INTERNAL_SERVER_ERROR;
  err.payload = payload ?? null;
  err.message = message ?? null;

  return err;
};

module.exports.NotImplemented = (payload, message) => {
  const err = Error();

  err.statusText = 'NOT_IMPLEMENTED';
  err.status = StatusCodes.NOT_IMPLEMENTED;
  err.payload = payload ?? null;
  err.message = message ?? null;

  return err;
};
