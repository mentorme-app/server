const db = require('../data/db');

module.exports = {
    getMsgForConv: conversation_id => db('messages').where({ conversation_id }),
    addResource: resource =>
        db('messages')
            .insert(resource)
            .returning('id'),
    getById: id => db('messages').where({ id })
};
