const p = require('../../lib/routes');
const authRouter = require('./auth');
const userRouter = require('./user');
const tagsRouter = require('./tags');
const questionsRouter = require('./questions');
const conversationsRouter = require('./conversations');

module.exports = server => {
    server.use(p.auth, authRouter);
    server.use(p.user, userRouter);
    server.use(p.tags, tagsRouter);
    server.use(p.questions, questionsRouter);
    server.use(p.conversations, conversationsRouter);

    server.get('/', (req, res) => {
        res.status(200).json('MentorMe API is live!');
    });
};
