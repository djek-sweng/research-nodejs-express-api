'use strict';

const { createHandler } = require('graphql-http/lib/use/express');

module.exports = createHandler({
  schema: require('./graphql.schema'),
  context: require('./graphql.context'),
});
