const db = require('../data/db');

module.exports = {
    getAll: () => db('users'),
    filter: query => db('users').where(query),
    getById: id => db('users').where({ id }),
    addUser: user => db('users').insert(user),
    update: (user_id, changes) =>
        db('users')
            .where({ user_id })
            .update(changes)
};
