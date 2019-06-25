const router = require('express').Router();
const Conv = require('../../models/conversations');
const Question = require('../../models/questions');
const User = require('../../models/users');

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

router.post('/', async (req, res) => {
    // .../api/conversations?qid=1
    // ID of question this conversation belongs to
    const { qid } = req.query;
    const { mentor_id } = req.body;
    if (qid) {
        try {
            const [newConvId] = await Conv.addResource({
                mentor_id,
                question_id: qid
            });

            if (newConvId) {
                const newConv = await Conv.getById(newConvId);
                res.status(201).json(newConv);
            } else {
                return res.status(404).json({
                    message: 'A question or user with this ID does not exist'
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

module.exports = router;
