const tags = [
    { tag: 'Photography' },
    { tag: 'Marketing' },
    { tag: 'Product Management' },
    { tag: 'Sales' },
    { tag: 'Batman' }
];

exports.seed = knex => knex('tags').insert(tags);
