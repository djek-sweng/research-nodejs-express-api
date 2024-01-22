'use strict';

const { Router } = require('express');

const accountController = require('./account.controller');
const accountValidator = require('./account.validator');
const authenticationHandler = require('./../../middlewares/authentication.handler');

const router = Router();

router.post('/signup',
  accountValidator.ensureName(),
  accountValidator.normalizeEmail(),
  accountValidator.ensureEmail(),
  accountValidator.ensureEmailNotUsed(),
  accountValidator.ensurePassword(),
  accountValidator.ensurePasswordConfirmation(),
  accountController.signup
);

router.post('/login',
  accountValidator.normalizeEmail(),
  accountValidator.ensureEmail(),
  accountController.login
);

router.get('/user/me',
  authenticationHandler,
  accountController.getUserMe
);

router.post('/user/me/status',
  authenticationHandler,
  accountValidator.ensureUserStatus(),
  accountController.setUserMeStatus
);

module.exports = router;
