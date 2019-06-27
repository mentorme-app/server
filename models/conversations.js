const Joi = require('@hapi/joi');
const db = require('../data/db');

module.exports = {
    getAllForQ: question_id =>
        db('conversations as c')
            .where({ question_id })
            .join('questions as q', 'c.question_id', 'q.id')
            .select('c.id', 'c.question_id', 'c.mentor_id', 'q.author_id'),
    getById: id =>
        db('conversations as c')
            .where({ 'c.id': id })
            .join('questions as q', 'c.question_id', 'q.id')
            .select('c.id', 'c.question_id', 'c.mentor_id', 'q.author_id'),
    addResource: resource =>
        db('conversations')
            .insert(resource)
            .returning('id'),
    postSchema: conv => {
        const schema = Joi.object().keys({
            question_id: Joi.number().required(),
            mentor_id: Joi.number().required()
        });

        return Joi.validate(conv, schema);
    }
};
