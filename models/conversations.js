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
    getConvByUserId: id =>
        db('conversations as c')
            .where({ 'c.mentor_id': id })
            .orWhere({ 'q.author_id': id })
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

/*
SELECT c.id, c.question_id, c.mentor_id, q.author_id FROM conversations as c
JOIN questions as q
ON q.id = c.question_id
WHERE c.mentor_id = 1 OR q.author_id = 1
*/
