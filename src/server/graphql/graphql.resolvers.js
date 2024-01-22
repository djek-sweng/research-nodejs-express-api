'use strict';

const Note = require('./../models/note.model');
const { Unauthorized } = require('./../shared/errors');
const { calculateSkip, calculatePagination } = require('./../shared/paginator');

module.exports = {
  getNotes: async (_, { page }, { user }) => {
    if (!user) {
      throw Unauthorized();
    }

    if (!page) {
      page = 1;
    }

    const pageCount = 2;
    const totalCount = await Note.find().countDocuments();
    const pagination = calculatePagination(page, pageCount, totalCount);

    const users = await Note.find()
      .populate('owner')
      .sort({ createdAt: -1 })
      .skip(calculateSkip(page, pageCount))
      .limit(pageCount);

    const entries = users.map((u) => {
      return {
        ...u._doc,
        _id: u._id.toString(),
      };
    });

    return { entries: entries, totalCount: totalCount, pagination: pagination };
  },
};
