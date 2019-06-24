const router = require('express').Router();

const dummyData = {
    id: '123456',
    name: 'Lucy',
    email: 'lucy@mail.com',
    avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    motto:
        'Batman may have made the front page but Bruce Wayne got pushed to page eight.',
    description:
        'Because some men aren\'t looking for anything logical, like money. They can\'t be bought, bullied, reasoned or negotiated with. Some men just wanna watch the world burn.',
    businessType: 'Batman',
    questionsAsked: 25,
    questionsAnswered: 74
};

router.get('/', (req, res) => {
    res.status(200).json(dummyData);
});

module.exports = router;
