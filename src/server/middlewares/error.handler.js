'use strict';

const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, next) => {
  let status;
  let statusText;

  if (err.status) {
    status = err.status;
    statusText = err.statusText;
  } else {
    status = StatusCodes.INTERNAL_SERVER_ERROR;
    statusText = 'INTERNAL_SERVER_ERROR';
  }

  const payload = err.payload;
  const message = err.message;
  const stack = err.stack;

  console.error(`[error-handler.middleware]
Time: ${new Date().toUTCString()}
Status: ${status} ${statusText}
Payload: ${JSON.stringify(payload)}
Message: ${message}
Stack: ${stack}`);

  const body = {
    status: status,
    statusText: statusText,
    payload: payload,
    message: message,
  };

  res.status(status).json(body);
};
