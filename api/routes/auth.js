const bcrypt = require('bcryptjs');
const router = require('express').Router();
const validate = require('../../middleware/validate');
const generateToken = require('../../lib/generateToken');
const User = require('../../models/users');

/**
 * @todo - add validation middleware
 *
 */
router.post('/login', validate(User.loginSchema), async (req, res) => {
    const { email, password } = req.body;
    try {
        // fetch user from DB
        const [user] = await User.filter({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            delete user.password;

            /**
             * generateToken takes in
             * { id, email }
             */
            const token = generateToken(user);

            res.status(200).json({
                user,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// add validation object
router.post('/register', validate(User.registerSchema), async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // check if username/email already exist in database
        const [user] = await User.filter({ email });

        if (user) {
            return res
                .status(400)
                .json({ message: 'This email is already taken' });
        }

        // encrypt password
        password = bcrypt.hashSync(password, 10);

        // save user to db
        const [newUser] = await User.addUser({ username, email, password });

        if (newUser) {
            const [getNewUser] = await User.getById(newUser);
            // remove password from user response
            delete getNewUser.password;

            // generate token
            /**
             * generateToken takes in
             * { id, email }
             */
            const token = generateToken(getNewUser);
            // send token back in response together with required user info
            // but without password!

            res.status(201).json({
                user: getNewUser,
                token
            });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
