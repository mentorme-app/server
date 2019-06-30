module.exports = {
    user: {
        id: 1,
        username: 'Joe',
        email: 'joe@gmail.com',
        password: 'secret',
        phone_number: '123-456-7890',
        avatar: null,
        motto: 'Hi! I am Joe tester',
        description: 'You can meet me in Testing enviroments testing software',
        tag_id: 1
    },
    tag: {
        id: 1,
        tag: 'Testing'
    },
    putUser: {
        username: 'Joey',
        password: 'not_so_secret'
    },
    id: 1,
    question: {
        id: 1,
        title: 'How do you test API endpoints?',
        question:
            'What do you test in them? How do you test latency? How do you do penetration tests?',
        author_id: 1,
        tag_id: 1
    },
    postQ: {
        id: 2,
        title: 'How do you POST new question?',
        question: 'What do you test in them?',
        author_id: 1,
        tag_id: 1
    },
    mentor: {
        id: 2,
        username: 'Mentor',
        email: 'mentor@gmail.com',
        password: 'secret',
        phone_number: '123-456-7890',
        avatar: null,
        motto: 'Hi! I am Mentor tester',
        description: 'You can meet me in Testing enviroments testing software',
        tag_id: 1
    },
    conversation: {
        id: 1,
        question_id: 1,
        mentor_id: 2
    }
};
