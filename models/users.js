const Joi = require('@hapi/joi');
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
            .update(changes),
    loginSchema: user => {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .max(255)
                .required(),
            password: Joi.string()
                .required()
                .min(5)
                .max(255)
        });

        return Joi.validate(user, schema);
    },
    registerSchema: user => {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .max(255)
                .required(),
            password: Joi.string()
                .required()
                .min(5)
                .max(255),
            username: Joi.string()
                .min(3)
                .max(255)
                .required()
        });

        return Joi.validate(user, schema);
    },
    putSchema: user => {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .max(255),
            password: Joi.string()
                .min(5)
                .max(255),
            username: Joi.string()
                .min(3)
                .max(255),
            avatar: Joi.string().max(255),
            motto: Joi.string().max(255),
            description: Joi.string(),
            tag_id: Joi.number()
        });

        return Joi.validate(user, schema);
    }
};
