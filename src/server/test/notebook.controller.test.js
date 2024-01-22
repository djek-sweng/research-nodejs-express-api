/* eslint-disable no-undef */
'use strict';

const assert = require('node:assert');

const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const { getDbConfig } = require('./../shared/config');
const Guid = require('./../shared/guid');
const Note = require('./../models/note.model');
const User = require('./../models/user.model');
const UUT = require('./../features/notebook/notebook.controller');

let _user;
let _note;

describe('notebook controller', () => {
  describe('create, read, update and delete notes', () => {
    // before
    beforeEach((done) => {
      mongoose
        .connect(getDbConfig().uri, { dbName: `mocha_${Guid.newGuid()}` })
        .then(() => {
          return User.create({
            email: Guid.newGuid(),
            passwordHash: Guid.newGuid(),
            name: Guid.newGuid(),
          });
        })
        .then((user) => {
          _user = user;
          return Note.create({
            title: Guid.newGuid(),
            content: Guid.newGuid(),
            imageUrl: Guid.newGuid(),
            owner: user,
          });
        })
        .then((note) => {
          _note = note;
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // after
    afterEach((done) => {
      mongoose.connection.db
        .dropDatabase()
        .then(() => {
          return mongoose.disconnect();
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    it('should create note', (done) => {
      // arrange
      const req = {
        userId: _user._id.toString(),
        body: {
          title: Guid.newGuid(),
          content: Guid.newGuid(),
        },
        file: {
          path: Guid.newGuid(),
        },
      };
      const res = {
        statusCode: null,
        entity: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.entity = data.entity;
          return this;
        },
      };
      const next = () => {};

      // act
      // assert
      UUT.createNote(req, res, next)
        .then(() => {
          assert.equal(res.statusCode, StatusCodes.CREATED);
          assert.equal(res.entity.title, req.body.title);
          assert.equal(res.entity.content, req.body.content);
          assert.equal(res.entity.imageUrl, req.file.path);
          assert.equal(res.entity.owner._id.toString(), req.userId);
          return User.findById(req.userId).populate('notes');
        })
        .then((user) => {
          assert.equal(user.notes[0]._id.toString(), res.entity._id.toString());
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should delete note', (done) => {
      // arrange
      const req = {
        userId: _user._id.toString(),
        params: { id: _note._id.toString() },
      };
      const res = {
        statusCode: null,
        entity: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.entity = data.entity;
          return this;
        },
      };
      const next = () => {};

      // act
      // assert
      UUT.deleteNote(req, res, next)
        .then(() => {
          assert.equal(res.statusCode, StatusCodes.OK);
          assert.equal(res.entity.title, _note.title);
          assert.equal(res.entity.content, _note.content);
          assert.equal(res.entity.imageUrl, _note.imageUrl);
          assert.equal(res.entity.owner._id.toString(), req.userId);
          return Note.find();
        })
        .then((notes) => {
          assert.equal(notes.length, 0);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should return not found error if note is not found by id', (done) => {
      // arrange
      const req = {
        userId: _user._id.toString(),
        params: { id: new mongoose.Types.ObjectId() },
      };
      const res = {
        statusCode: null,
        entity: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.entity = data.entity;
          return this;
        },
      };
      const next = () => {};

      // act
      // assert
      UUT.deleteNote(req, res, next)
        .then((result) => {
          assert.equal(result.statusText, 'NOT_FOUND');
          assert.equal(result.status, StatusCodes.NOT_FOUND);
          assert.equal(result.payload.entity, 'Note');
          return Note.find();
        })
        .then((notes) => {
          assert.equal(notes.length, 1);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should return forbidden error if request user is not owner of note', (done) => {
      // arrange
      const req = {
        userId: new mongoose.Types.ObjectId(),
        params: { id: _note._id.toString() },
      };
      const res = {
        statusCode: null,
        entity: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.entity = data.entity;
          return this;
        },
      };
      const next = () => {};

      // act
      // assert
      UUT.deleteNote(req, res, next)
        .then((result) => {
          assert.equal(result.statusText, 'FORBIDDEN');
          assert.equal(result.status, StatusCodes.FORBIDDEN);
          assert.equal(result.payload.entity, 'Note');
          return Note.find();
        })
        .then((notes) => {
          assert.equal(notes.length, 1);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
