const db = require('../data/db');

module.exports = {
    getAll: () =>
        db('questions')
            .join('tags', 'questions.tag_id', 'tags.id')
            .join('users', 'questions.author_id', 'users.id'),
    filter: query => db('questions').where(query),
    getById: id => db('questions').where({ id })
};
