const Joi = require('@hapi/joi');
const db = require('../data/db');

module.exports = {
    getAll: () =>
        db('questions')
            .join('tags', 'questions.tag_id', 'tags.id')
            .join('users', 'questions.author_id', 'users.id'),
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
            author_id: [Joi.string().required(), Joi.number().required()],
            tag_id: [Joi.string().required(), Joi.number().required()],
            isAnswered: Joi.boolean()
        });

        return Joi.validate(question, schema);
    }
};
