'use strict';

module.exports.calculateSkip = (page, pageCount) => {
  return (page - 1) * pageCount;
};

module.exports.calculatePagination = (page, pageCount, totalCount) => {
  const firstPage = 1;
  const lastPage = Math.ceil(totalCount / pageCount);
  const hasPrevious = page > firstPage;
  const hasNext = page < lastPage;

  const pagination = {
    current: page,
    previous: hasPrevious ? page - 1 : null,
    next: hasNext ? page + 1 : null,
    first: firstPage,
    last: lastPage,
  };

  return pagination;
};
