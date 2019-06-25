const router = require('express').Router();
const Question = require('../../models/questions');
const Tags = require('../../models/tags');
const User = require('../../models/users');

router.get('/', async (req, res) => {
    try {
        const questions = await Question.getAll();

        const updatedQ = questions.map(q => {
            q.author = {
                id: q.author_id,
                username: q.username,
                email: q.email,
                avatar: q.avatar,
                motto: q.motto,
                description: q.description
            };
            q.tag = {
                tag: q.tag,
                id: q.tag_id
            };
            delete q.tag_id;
            delete q.author_id;
            delete q.password;
            delete q.username;
            delete q.email;
            delete q.avatar;
            delete q.motto;
            delete q.description;
            return q;
        });

        res.status(200).json(updatedQ);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [resource] = await Question.getById(id);

        if (!resource) {
            return res
                .status(404)
                .json({ message: 'A question with this ID does not exist' });
        }

        const [user] = await User.getById(resource.author_id);
        const [tag] = await Tags.getById(resource.tag_id);
        delete resource.tag_id;
        resource.tag = tag;
        resource.author = user;

        res.status(200).json(resource);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
