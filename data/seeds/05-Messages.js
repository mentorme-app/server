const faker = require('faker');

const messages = [
    {
        sender: 1,
        conversation_id: 1,
        text: faker.lorem.paragraph()
    },
    {
        sender: 3,
        conversation_id: 1,
        text: faker.lorem.paragraph()
    },
    {
        sender: 1,
        conversation_id: 1,
        text: faker.lorem.paragraph()
    },
    {
        sender: 1,
        conversation_id: 1,
        text: faker.lorem.paragraph()
    },
    {
        sender: 3,
        conversation_id: 1,
        text: faker.lorem.paragraph()
    },
    {
        sender: 1,
        conversation_id: 2,
        text: faker.lorem.paragraph()
    },
    {
        sender: 4,
        conversation_id: 2,
        text: faker.lorem.paragraph()
    },
    {
        sender: 4,
        conversation_id: 2,
        text: faker.lorem.paragraph()
    },
    {
        sender: 1,
        conversation_id: 2,
        text: faker.lorem.paragraph()
    },
    {
        sender: 4,
        conversation_id: 2,
        text: faker.lorem.paragraph()
    },
    {
        sender: 2,
        conversation_id: 3,
        text: faker.lorem.paragraph()
    },
    {
        sender: 1,
        conversation_id: 3,
        text: faker.lorem.paragraph()
    },
    {
        sender: 2,
        conversation_id: 4,
        text: faker.lorem.paragraph()
    },
    {
        sender: 4,
        conversation_id: 4,
        text: faker.lorem.paragraph()
    },
    {
        sender: 4,
        conversation_id: 4,
        text: faker.lorem.paragraph()
    }
];

exports.seed = knex => knex('messages').insert(messages);
