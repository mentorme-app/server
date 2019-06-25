const tags = [
    { tag: '' },
    { tag: 'Photography' },
    { tag: 'Marketing' },
    { tag: 'Product Management' },
    { tag: 'Sales' },
    { tag: 'Freelancing' },
    { tag: 'Writing' },
    { tag: 'Tech' },
    { tag: 'Fashion' }
];

exports.seed = knex => knex('tags').insert(tags);
