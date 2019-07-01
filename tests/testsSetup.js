const id = 1000;
const badId = 5000;

module.exports = {
    user: {
        id: id,
        username: 'Joe',
        email: 'joe@gmail.com',
        password: 'secret',
        phone_number: '123-456-7890',
        avatar: null,
        motto: 'Hi! I am Joe tester',
        description: 'You can meet me in Testing enviroments testing software',
        tag_id: id
    },
    tag: {
        id: id,
        tag: 'Testing'
    },
    putUser: {
        username: 'Joey',
        password: 'not_so_secret'
    },
    id: id,
    badId: badId,
    question: {
        id: id,
        title: 'How do you test API endpoints?',
        question:
            'What do you test in them? How do you test latency? How do you do penetration tests?',
        author_id: id,
        tag_id: id
    },
    postQ: {
        title: 'How do you POST new question?',
        question: 'What do you test in them?',
        author_id: id,
        tag_id: id
    },
    mentor: {
        id: id + 1,
        username: 'Mentor',
        email: 'mentor@gmail.com',
        password: 'secret',
        phone_number: '123-456-7890',
        avatar: null,
        motto: 'Hi! I am Mentor tester',
        description: 'You can meet me in Testing enviroments testing software',
        tag_id: id
    },
    conversation: {
        id: id,
        question_id: id,
        mentor_id: id + 1
    }
};
