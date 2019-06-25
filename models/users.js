const db = require('../data/db');

module.exports = {
    getAll: () => db('users'),
    filter: query =>
        db('users')
            .where(query)
            .join('tags', 'users.tag_id', 'tags.id')
            .select(
                'users.id',
                'users.username',
                'users.email',
                'users.password',
                'users.avatar',
                'users.motto',
                'users.description',
                'tags.tag'
            ),
    getById: id =>
        db('users')
            .join('tags', 'users.tag_id', 'tags.id')
            .select(
                'users.id',
                'users.username',
                'users.email',
                'users.avatar',
                'users.motto',
                'users.description',
                'tags.tag'
            )
            .where({ 'users.id': id }),
    addUser: user =>
        db('users')
            .insert(user)
            .returning('id'),
    update: (id, changes) =>
        db('users')
            .where({ id })
            .update(changes)
};
