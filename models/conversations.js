const Joi = require('@hapi/joi');
const db = require('../data/db');

module.exports = {
    getAllForQ: question_id => db('conversations').where({ question_id }),
    getById: id => db('conversations').where({ id }),
    addResource: resource =>
        db('conversations')
            .insert(resource)
            .returning('id'),
    postSchema: conv => {
        const schema = Joi.object().keys({
            question_id: [Joi.string(), Joi.number()],
            mentor_id: [Joi.string(), Joi.number()]
        });

        return Joi.validate(conv, schema);
    }
};
