'use strict';

const { StatusCodes } = require('http-status-codes');

const Note = require('./../../models/note.model');
const User = require('./../../models/user.model');
const {
  UnprocessableEntity,
  NotFound,
  Forbidden,
} = require('./../../shared/errors');
const {
  executeAsync,
  ensureRequest,
} = require('./../../shared/controller-utils');
const { deleteFileAsync } = require('./../../shared/filesystem');
const ws = require('./../../shared/websocket');

const mapNote = (note) => {
  return {
    _id: note._id,
    title: note.title,
    content: note.content,
    imageUrl: note.imageUrl,
    owner: note.owner,
  };
};

module.exports.createNote = (req, res, next) => {
  return executeAsync(next, async () => {
    ensureRequest(req);

    if (!req.file) {
      throw UnprocessableEntity(null, 'No image file send.');
    }

    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw NotFound({ entity: 'User', id: userId });
    }

    /** Create note. */
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path;

    const note = await Note.create({
      title: title,
      content: content,
      imageUrl: imageUrl,
      owner: userId,
    });

    /** Add note reference to user. */
    user.notes.push(note);

    await user.save();

    const body = { entity: mapNote(note) };

    res.status(StatusCodes.CREATED).json(body);

    ws.emit('notes', { action: 'created', ...body });
  });
};

module.exports.getNotes = (req, res, next) => {
  return executeAsync(next, async () => {
    const notes = await Note.find();

    const entity = notes.map((n) => mapNote(n));

    const body = { entity: entity };

    res.status(StatusCodes.OK).json(body);
  });
};

module.exports.getNote = (req, res, next) => {
  return executeAsync(next, async () => {
    const noteId = req.params.id;

    const note = await Note.findById(noteId);

    if (!note) {
      throw NotFound({ entity: 'Note', id: noteId });
    }

    const body = { entity: mapNote(note) };

    res.status(StatusCodes.OK).json(body);
  });
};

module.exports.updateNote = (req, res, next) => {
  return executeAsync(next, async () => {
    ensureRequest(req);

    const noteId = req.params.id;

    const note = await Note.findById(noteId);

    if (!note) {
      throw NotFound({ entity: 'Note', id: noteId });
    }

    const userId = req.userId;

    if (note.owner.toString() !== userId) {
      throw Forbidden({ entity: 'Note', id: noteId, userId: userId });
    }

    /** Update note and image file. */
    note.title = req.body.title;
    note.content = req.body.content;

    let imageToDeletePath;

    if (req.file) {
      imageToDeletePath = note.imageUrl;
      note.imageUrl = req.file.path;
    }

    await note.save();

    deleteFileAsync(imageToDeletePath);

    const body = { entity: mapNote(note) };

    res.status(StatusCodes.OK).json(body);

    ws.emit('notes', { action: 'updated', ...body });
  });
};

module.exports.deleteNote = (req, res, next) => {
  return executeAsync(next, async () => {
    ensureRequest(req);

    const noteId = req.params.id;

    let note = await Note.findById(noteId);

    if (!note) {
      throw NotFound({ entity: 'Note', id: noteId });
    }

    const userId = req.userId;

    if (note.owner.toString() !== userId) {
      throw Forbidden({ entity: 'Note', id: noteId, userId: userId });
    }

    /** Delete note and image. */
    const imageToDeletePath = note.imageUrl;

    note = await Note.findByIdAndDelete(noteId);

    deleteFileAsync(imageToDeletePath);

    /** Remove note reference from user. */
    const user = await User.findById(userId);

    user.notes.pull(note);

    await user.save();

    const body = { entity: mapNote(note) };

    res.status(StatusCodes.OK).json(body);

    ws.emit('notes', { action: 'deleted', ...body });
  });
};
