const uuid = require('uuid');

const tags = [
    { tag: 'Photography', tag_id: uuid() },
    { tag: 'Marketing', tag_id: uuid() },
    { tag: 'Product Management', tag_id: uuid() },
    { tag: 'Sales', tag_id: uuid() },
    { tag: 'Batman', tag_id: uuid() }
];

exports.seed = knex => knex('tags').insert(tags);
