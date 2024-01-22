'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = class Guid {
  static newGuid() {
    return uuidv4();
  }
};
