'use strict';

const { body } = require('express-validator');

module.exports.ensureSetNote = () => {
  return [
    body('title', 'Invalid title. Must be string of min:4 and max:100 characters.')
      .trim()
      .isString()
      .isLength({ min: 4, max: 100 }),
    body('content', 'Invalid content. Must be string of min:8 and max:400 characters.')
      .trim()
      .isString()
      .isLength({ min: 8, max: 400 }),
  ];
};
