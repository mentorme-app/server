const bcrypt = require('bcryptjs');
const router = require('express').Router();
const validate = require('../../middleware/validate');
const generateToken = require('../../lib/generateToken');

router.post('/login', validate(), async (req, res) => {
    const { username, password } = req.body;
    // fetch user from DB
    const user = username; // TBD

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        delete user.password;
        res.status(200).json({
            user,
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
});
