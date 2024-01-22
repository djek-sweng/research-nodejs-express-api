'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const { NoteDataType } = require('./types/note.type');
const resolvers = require('./graphql.resolvers');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      notes: {
        type: NoteDataType,
        args: {
          page: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve: resolvers.getNotes,
      },
    },
  }),
});
