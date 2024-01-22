'use strict';

const { StatusCodes } = require('http-status-codes');

const User = require('./../../models/user.model');
const crypt = require('./../../shared/crypt');
const jwt = require('./../../shared/jwt');
const { Unauthorized, NotFound } = require('./../../shared/errors');
const {
  executeAsync,
  ensureRequest,
} = require('./../../shared/controller-utils');

module.exports.signup = (req, res, next) => {
  return executeAsync(next, async () => {
    ensureRequest(req);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    /** Hash password and create user. */
    const passwordHash = await crypt.hash(password);

    const user = await User.create({
      name: name,
      email: email,
      passwordHash: passwordHash,
    });

    const body = {
      entity: {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    };

    res.status(StatusCodes.CREATED).json(body);
  });
};

module.exports.login = (req, res, next) => {
  return executeAsync(next, async () => {
    ensureRequest(req);

    const email = req.body.email;
    const password = req.body.password;

    /** User found? */
    const user = await User.findOne({ email: email });

    if (!user) {
      throw Unauthorized({ entity: 'User', email: email });
    }

    /** Password valid? */
    const isValid = await crypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw Unauthorized({ entity: 'User', email: email });
    }

    const userId = user._id.toString();

    /** Generate encoded token. */
    const payload = {
      email: email,
    };

    const token = jwt.encodeToken(payload, userId);

    const body = {
      access_token: token,
      expires_in: jwt.EXPIRES_IN,
      user_id: userId,
    };

    res.status(StatusCodes.OK).json(body);
  });
};

module.exports.getUserMe = (req, res, next) => {
  return executeAsync(next, async () => {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      throw NotFound({ entity: 'User', id: userId });
    }

    const body = {
      entity: {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    };

    res.status(StatusCodes.OK).json(body);
  });
};

module.exports.setUserMeStatus = (req, res, next) => {
  return executeAsync(next, async () => {
    ensureRequest(req);

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      throw NotFound({ entity: 'User', id: userId });
    }

    user.status = req.body.status;

    await user.save();

    const body = {
      entity: {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    };

    res.status(StatusCodes.OK).json(body);
  });
};
