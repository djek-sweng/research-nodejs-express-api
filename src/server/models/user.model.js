'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: 'I am loving Node.js',
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note',
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('User', schema);
