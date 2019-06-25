const router = require('express').Router();
const Tags = require('../../models/tags');

router.get('/', async (req, res) => {
    try {
        const tags = await Tags.getAll();

        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
