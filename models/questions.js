const Joi = require('@hapi/joi');
const db = require('../data/db');

module.exports = {
    getAll: () =>
        db('questions as q')
            .join('tags as t', 'q.tag_id', 't.id')
            .join('users as u', 'q.author_id', 'u.id')
            .select(
                'q.id',
                'q.title',
                'q.question',
                'q.author_id',
                'q.tag_id',
                't.tag',
                'u.username',
                'u.email',
                'u.phone_number',
                'u.avatar',
                'u.motto',
                'u.description'
            ),
    filter: query => db('questions').where(query),
    getById: id => db('questions').where({ id }),
    addResource: resource =>
        db('questions')
            .insert(resource)
            .returning('id'),
    delResource: id =>
        db('questions')
            .where({ id })
            .del(),
    postSchema: question => {
        const schema = Joi.object().keys({
            title: Joi.string()
                .required()
                .max(255),
            question: Joi.string().required(),
            author_id: Joi.number().required(),
            tag_id: Joi.number().required(),
            isAnswered: Joi.boolean()
        });
        return Joi.validate(question, schema);
    }
};
