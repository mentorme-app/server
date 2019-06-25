const db = require('../data/db');

module.exports = {
    getAll: () => db('users'),
    filter: query =>
        db('users')
            .where(query)
            .returning('id'),
    getById: id => db('users').where({ id }),
    addUser: user =>
        db('users')
            .insert(user)
            .returning('id'),
    update: (id, changes) =>
        db('users')
            .where({ id })
            .update(changes)
};
