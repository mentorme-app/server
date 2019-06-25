const router = require('express').Router();
const User = require('../../models/users');

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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await User.getById(id);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'User with this ID does not exist' });
        }

        delete user.password;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
