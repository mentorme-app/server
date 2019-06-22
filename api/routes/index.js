const { auth } = require('../../lib/routes');
const authRouter = require('./auth');

module.exports = server => {
    server.use(auth, authRouter);

    server.get('/', (req, res) => {
        res.status(200).json('MentorMe API is live!');
    });
};
