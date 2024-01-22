'use strict';

const path = require('node:path');

const multer = require('multer');

const pathfinder = require('./../shared/pathfinder');

const storagePath = path.join(pathfinder.root, 'storage', 'images');

module.exports.singleImageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, storagePath);
    },
    filename: (req, file, callback) => {
      callback(null, new Date().toISOString() + '_' + file.originalname);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
}).single('image');

module.exports.storagePath = storagePath;
