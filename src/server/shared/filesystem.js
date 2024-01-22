'use strict';

const fs = require('node:fs');
const Bluebird = require('bluebird');

const readFileAsync = Bluebird.promisify(fs.readFile);
const unlinkAsync = Bluebird.promisify(fs.unlink);

module.exports.readFileAsync = (filePath) => {
  return readFileAsync(filePath);
};

module.exports.deleteFileAsync = (filePath) => {
  if (filePath) {
    unlinkAsync(filePath);
  }
};
