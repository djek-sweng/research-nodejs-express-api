/* eslint-disable no-undef */
'use strict';

const assert = require('node:assert');

const sinon = require('sinon');

const Guid = require('./../shared/guid');
const jwt = require('./../shared/jwt');
const { Unauthorized } = require('./../shared/errors');
const UUT = require('./../middlewares/authentication.handler');

describe('authentication handler', () => {
  describe('is authenticated', () => {
    it('should throw unauthorized if no authorization header is given', () => {
      // arrange
      const req = {
        get: () => null,
      };
      const res = {};
      const next = () => {};
      // act
      // assert
      assert.throws(
        UUT.bind(this, req, res, next),
        Unauthorized(null, 'Invalid authorization header.')
      );
    });

    it('should throw unauthorized if the authorization header is only one string', () => {
      // arrange
      const req = {
        get: () => 'Bearer ',
      };
      const res = {};
      const next = () => {};
      // act
      // assert
      assert.throws(
        UUT.bind(this, req, res, next),
        Unauthorized(null, 'Invalid authorization header.')
      );
    });

    it('should throw unauthorized if the authorization token is invalid', () => {
      // arrange
      const req = {
        get: () => 'Bearer xyz',
      };
      const res = {};
      const next = () => {};
      // act
      // assert
      assert.throws(
        UUT.bind(this, req, res, next),
        Unauthorized(null, 'Invalid authorization token.')
      );
    });

    it('should provide the userId after decode authorization token', () => {
      // arrange
      const req = {
        get: () => 'Bearer xyz',
      };
      const res = {};
      const next = () => {};

      const decodedToken = {
        sub: Guid.newGuid(),
      };

      sinon.stub(jwt, 'decodeToken');
      jwt.decodeToken.returns(decodedToken);

      // act
      UUT(req, res, next);

      // assert
      assert.equal(jwt.decodeToken.called, true);
      assert.equal(req.userId, decodedToken.sub);

      jwt.decodeToken.restore();
    });
  });
});
