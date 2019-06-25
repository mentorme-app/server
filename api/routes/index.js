const { auth, user, tags } = require('../../lib/routes');
const authRouter = require('./auth');
const userRouter = require('./user');
const tagsRouter = require('./tags');

module.exports = server => {
    server.use(auth, authRouter);
    server.use(user, userRouter);
    server.use(tags, tagsRouter);

    server.get('/', (req, res) => {
        res.status(200).json('MentorMe API is live!');
    });
};
