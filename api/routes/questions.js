const router = require('express').Router();
const Question = require('../../models/questions');

router.get('/', async (req, res) => {
    try {
        const questions = await Question.getAll();

        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
