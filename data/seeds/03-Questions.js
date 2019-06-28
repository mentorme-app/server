const faker = require('faker');

const questions = [];
for (let i = 0; i < 2; i++) {
    const question = {
        title: faker.lorem.sentence(),
        question: faker.lorem.paragraph(),
        author_id: 2,
        tag_id: i + 1
    };
    questions.push(question);
}

exports.seed = knex => knex('questions').insert(questions);
