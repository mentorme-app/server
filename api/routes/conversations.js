const router = require('express').Router();
const client = require('../../lib/twilio');
const validate = require('../../middleware/validate');
const Questions = require('../../models/questions');
const Users = require('../../models/users');
const Conv = require('../../models/conversations');
const Msg = require('../../models/messages');

router.get('/', async (req, res) => {
    // .../api/conversations?qid=1
    // ID of question this conversation belongs to
    const { qid } = req.query;
    if (qid) {
        try {
            const convs = await Conv.getAllForQ(qid);
            if (convs) {
                res.status(200).json(convs);
            } else {
                res.status(404).json({
                    message: 'Conversations for this question ID do not exist'
                });
            }
        } catch (err) {
            res.status(500).json({ error: err });
        }
    } else {
        res.status(422).json({
            message: 'Missing query string with question id'
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [conv] = await Conv.getById(id);
        if (conv) {
            const [mentor] = await Users.getById(conv.mentor_id);
            conv.mentor = mentor;

            const [question] = await Questions.getById(conv.question_id);
            const [author] = await Users.getById(question.author_id);
            conv.author = author;

            const messages = await Msg.getMsgForConv(id);
            conv.messages = messages;

            res.status(200).json(conv);
        } else {
            res.status(404).json({
                message: 'Conversation with this ID does not exist'
            });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const conv = await Conv.getConvByUserId(id);
        if (conv.length > 0) {
            res.status(200).json(conv);
        } else {
            res.status(404).json({
                message: 'User with this ID does not have any conversations'
            });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post('/', validate(Conv.postSchema), async (req, res) => {
    const { mentor_id, question_id } = req.body;

    try {
        const conversations4question = await Conv.getAllForQ(question_id);

        const [convAlrdyExists] = conversations4question.filter(
            c => c.mentor_id === mentor_id
        );

        if (convAlrdyExists) {
            return res.status(422).json({
                message: 'You already have a conversation in this question',
                conversation: convAlrdyExists
            });
        }

        const [newConvId] = await Conv.addResource({
            mentor_id,
            question_id
        });

        if (newConvId) {
            const [question] = await Questions.getById(question_id);
            const [user] = await Users.getById(question.author_id);
            const [mentor] = await Users.getById(mentor_id);
            const [newConv] = await Conv.getById(newConvId);

            if (user.phone_number) {
                client.messages
                    .create({
                        body: `Hi ${user.username}! ${
                            mentor.username
                        } answered your question. You can find it here: ... `,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: user.phone_number
                    })
                    // eslint-disable-next-line no-console
                    .then(message => console.log(message.sid));
            }
            res.status(201).json(newConv);
        } else {
            return res.status(404).json({
                message: 'A question or user with this ID does not exist'
            });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
