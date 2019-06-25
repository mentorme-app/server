const { auth, user, tags, questions } = require('../../lib/routes');
const authRouter = require('./auth');
const userRouter = require('./user');
const tagsRouter = require('./tags');
const questionsRouter = require('./questions');

module.exports = server => {
    server.use(auth, authRouter);
    server.use(user, userRouter);
    server.use(tags, tagsRouter);
    server.use(questions, questionsRouter);

    server.get('/', (req, res) => {
        res.status(200).json('MentorMe API is live!');
    });
};
