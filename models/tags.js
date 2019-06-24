const db = require('../data/db');

module.exports = {
    getAll: () => db('tags'),
    filter: query => db('tags').where(query),
    getById: tag_id => db('tags').where({ tag_id })
};
