'use strict';

const { GraphQLObjectType, GraphQLInt } = require('graphql');

module.exports.PaginationType = new GraphQLObjectType({
  name: 'Pagination',
  fields: {
    current: { type: GraphQLInt },
    previous: { type: GraphQLInt },
    next: { type: GraphQLInt },
    first: { type: GraphQLInt },
    last: { type: GraphQLInt },
  },
});
