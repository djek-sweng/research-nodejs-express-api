'use strict';

const { body } = require('express-validator');

const User = require('./../../models/user.model');

module.exports.ensureName = () => {
  return body(
    'name',
    'Please enter valid status of min:3 and max:40 alphanumeric characters.'
  )
    .trim()
    .isLength({ min: 3, max: 40 })
    .isAlphanumeric();
};

module.exports.ensureEmail = () => {
  return body('email').isEmail().withMessage('Please enter valid email.');
};

module.exports.ensureEmailNotUsed = () => {
  return body('email').custom(async (input) => {
    const user = await User.findOne({ email: input });
    if (user) {
      throw new Error('Email already used.');
    }
    return true;
  });
};

module.exports.normalizeEmail = () => {
  return body('email').trim().normalizeEmail();
};

module.exports.ensurePassword = () => {
  return body(
    'password',
    'Please enter valid password of min:8 and max:80 alphanumeric characters.'
  )
    .trim()
    .isLength({ min: 4, max: 80 })
    .isAlphanumeric();
};

module.exports.ensurePasswordConfirmation = () => {
  return body('confirmPassword')
    .trim()
    .custom((input, { req }) => {
      if (input !== req.body.password) {
        throw new Error('Invalid password confirmation.');
      }
      return true;
    });
};

module.exports.ensureUserStatus = () => {
  return body(
    'status',
    'Please enter valid status of min:8 and max:200 alphanumeric characters.'
  )
    .trim()
    .isLength({ min: 8, max: 200 })
    .isString();
};
