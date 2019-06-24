const faker = require('faker');
const bcrypt = require('bcryptjs');

const users = [];
for (let i = 0; i < 5; i++) {
    const user = {
        username: faker.internet.userName(),
        password: bcrypt.hashSync('1234567', 10),
        email: faker.internet.email(),
        avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        motto: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        tag_id: i + 1
    };
    users.push(user);
}
console.log(users);
exports.seed = knex => knex('users').insert(users);
