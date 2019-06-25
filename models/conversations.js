const db = require('../data/db');

module.exports = {
    getAllForQ: question_id => db('conversations').where({ question_id }),
    getById: id => db('conversations').where({ id }),
    addResource: resource =>
        db('conversations')
            .insert(resource)
            .returning('id')
};
