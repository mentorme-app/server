const bcrypt = require('bcryptjs');

const users = [
    {
        username: 'Dogo mentor',
        password: bcrypt.hashSync('1234567', 10),
        email: 'dogo@mentor.com',
        avatar:
            'https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=545&q=80',
        motto: 'Ruf ruf',
        description: 'Life is simple if you have a bone to pick',
        phone_number: null,
        tag_id: 6
    },
    {
        username: 'Jack Junior',
        password: bcrypt.hashSync('1234567', 10),
        email: 'jack@test.com',
        avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
        motto: 'Yo',
        description: 'Man in black button-up shirt',
        phone_number: null,
        tag_id: 9
    }
];

exports.seed = knex => knex('users').insert(users);
