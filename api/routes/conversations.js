const router = require('express').Router();
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
const client = require('../../lib/twilio');
router.post('/', validate(Conv.postSchema), async (req, res) => {
    const { mentor_id, question_id } = req.body;

    try {
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
