'use strict';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const { PaginationType } = require('./pagination.type');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLString },
    notes: { type: new GraphQLList(GraphQLID) },
  },
});

module.exports.UserType = UserType;

module.exports.UserDataType = new GraphQLObjectType({
  name: 'UserData',
  fields: {
    totalCount: { type: GraphQLInt },
    entries: { type: new GraphQLList(UserType) },
    pagination: { type: PaginationType },
  },
});
