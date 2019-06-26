const router = require('express').Router();
const validate = require('../../middleware/validate');
const Msg = require('../../models/messages');

router.post('/', validate(Msg.postSchema), async (req, res) => {
    const { sender, text, conversation_id } = req.body;

    try {
        const [msgId] = await Msg.addResource({
            sender,
            text,
            conversation_id
        });

        const [newMsg] = await Msg.getById(msgId);

        res.status(201).json(newMsg);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
