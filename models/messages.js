const db = require('../data/db');

module.exports = {
    getMsgForConv: conversation_id => db('messages').where({ conversation_id })
};
