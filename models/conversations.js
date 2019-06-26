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
            question_id: [Joi.string().required(), Joi.number()].required(),
            mentor_id: [Joi.string().required(), Joi.number().required()]
        });

        return Joi.validate(conv, schema);
    }
};
