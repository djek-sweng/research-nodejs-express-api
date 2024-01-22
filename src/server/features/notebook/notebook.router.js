'use strict';

const express = require('express');

const notebookController = require('./notebook.controller');
const notebookValidator = require('./notebook.validator');
const authenticationHandler = require('./../../middlewares/authentication.handler');

const router = express.Router();

router.post('/notes',
  authenticationHandler,
  notebookValidator.ensureSetNote(),
  notebookController.createNote
);

router.get('/notes',
  authenticationHandler,
  notebookController.getNotes
);

router.get('/notes/:id',
  authenticationHandler,
  notebookController.getNote
);

router.put('/notes/:id',
  authenticationHandler,
  notebookValidator.ensureSetNote(),
  notebookController.updateNote
);

router.delete('/notes/:id',
  authenticationHandler,
  notebookController.deleteNote
);

module.exports = router;
