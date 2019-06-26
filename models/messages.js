const Joi = require('@hapi/joi');
const db = require('../data/db');

module.exports = {
    getMsgForConv: conversation_id => db('messages').where({ conversation_id }),
    addResource: resource =>
        db('messages')
            .insert(resource)
            .returning('id'),
    getById: id => db('messages').where({ id }),
    postSchema: msg => {
        const schema = Joi.object().keys({
            text: Joi.string().required(),
            conversation_id: Joi.number().required(),
            sender: Joi.number().required()
        });

        return Joi.validate(msg, schema);
    }
};
