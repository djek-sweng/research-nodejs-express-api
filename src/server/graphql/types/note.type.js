'use strict';

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const { UserType } = require('./user.type');
const { PaginationType } = require('./pagination.type');

const NoteType = new GraphQLObjectType({
  name: 'NoteType',
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    owner: { type: UserType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

module.exports.NoteType = NoteType;

module.exports.NoteInputType = new GraphQLInputObjectType({
  name: 'NoteInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports.NoteDataType = new GraphQLObjectType({
  name: 'NoteData',
  fields: {
    entries: { type: new GraphQLList(NoteType) },
    totalCount: { type: GraphQLInt },
    pagination: { type: PaginationType },
  },
});
