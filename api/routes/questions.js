const router = require('express').Router();
const validate = require('../../middleware/validate');
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

router.post('/', validate(Question.postSchema), async (req, res) => {
    const { title, question, author_id, tag_id } = req.body;
    try {
        const [user] = await User.getById(author_id);
        const [tag] = await Tags.getById(tag_id);

        if (!user) {
            return res.status(404).json({
                message: 'User with this ID does not exist'
            });
        }

        if (!tag) {
            return res.status(404).json({
                message: 'Tag with this ID does not exist'
            });
        }

        const [addQuestion] = await Question.addResource({
            title,
            question,
            author_id,
            tag_id
        });

        if (addQuestion) {
            const [addedQuestion] = await Question.getById(addQuestion);
            delete addedQuestion.author_id;
            delete addedQuestion.tag_id;
            addedQuestion.author = user;
            addedQuestion.tag = tag;

            res.status(201).json(addedQuestion);
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [resource] = await Question.getById(id);

        if (!resource) {
            return res
                .status(404)
                .json({ message: 'A question with this ID does not exist' });
        }

        const deletingResource = await Question.delResource(id);

        res.status(200).json({
            message: `Resource with ID ${id} was ${
                deletingResource > 0 ? '' : 'not '
            }deleted`
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
