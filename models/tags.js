const db = require('../data/db');

module.exports = {
    getAll: () => db('tags'),
    filter: query => db('tags').where(query),
    getById: id => db('tags').where({ id })
};
