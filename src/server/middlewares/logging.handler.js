'use strict';

const fs = require('node:fs');
const path = require('node:path');

const morgan = require('morgan');

const pathfinder = require('./../shared/pathfinder');

module.exports = morgan('combined', {
  stream: fs.createWriteStream(
    path.join(pathfinder.root, 'storage', 'logging', 'access.log'),
    {
      flags: 'a',
    }
  ),
});
