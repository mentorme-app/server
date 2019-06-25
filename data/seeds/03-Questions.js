const faker = require('faker');

const questions = [];
for (let i = 0; i < 5; i++) {
    const question = {
        title: faker.lorem.sentence(),
        question: faker.lorem.paragraph(),
        author_id: i + 1,
        tag_id: i + 1
    };
    questions.push(question);
}

exports.seed = knex => knex('questions').insert(questions);
