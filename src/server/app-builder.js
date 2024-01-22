'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const { getDbConfig } = require('./shared/config');

const routers = {
  account: require('./features/account/account.router'),
  notebook: require('./features/notebook/notebook.router'),
};

const graphqlHandler = require('./graphql/graphql.handler');

const loggingHandler = require('./middlewares/logging.handler');
const formDataHandler = require('./middlewares/form-data.handler');
const corsHandler = require('./middlewares/cors.handler');
const errorHandler = require('./middlewares/error.handler');

module.exports.build = async () => {
  await mongoose.connect(getDbConfig().uri, { dbName: getDbConfig().name });

  const app = express();

  // request logging
  app.use(loggingHandler);

  // request parser
  app.use(bodyParser.json());

  // response compression
  app.use(compression());

  // response headers (secure express)
  app.use(helmet());

  // response headers (cors)
  app.use(corsHandler);

  // image upload
  app.use(formDataHandler.singleImageUpload);

  // static files
  app.use('/images', express.static(formDataHandler.storagePath));

  // routers
  app.use('/account', routers.account);
  app.use('/notebook', routers.notebook);

  // graphql
  app.use('/graphql', graphqlHandler);

  // error handling
  app.use(errorHandler);

  return app;
};
