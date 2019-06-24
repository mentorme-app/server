const { auth, user } = require('../../lib/routes');
const authRouter = require('./auth');
const userRouter = require('./user');

module.exports = server => {
    server.use(auth, authRouter);
    server.use(user, userRouter);

    server.get('/', (req, res) => {
        res.status(200).json('MentorMe API is live!');
    });
};
