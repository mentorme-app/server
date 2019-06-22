const bcrypt = require('bcryptjs');
const router = require('express').Router();
const validate = require('../../middleware/validate');
const generateToken = require('../../lib/generateToken');

// add validation object
router.post('/login', validate(), async (req, res) => {
    const { username, password } = req.body;
    // fetch user from DB
    const user = username; // TBD

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        delete user.password;

        res.status(200).json(
            'User is logged in'
            //     {
            //     user,
            //     token
            // }
        );
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
});

// add validation object
router.post('/register', validate(), async (req, res) => {
    const { username, email, password } = req.body;

    // check if username/email already exist in database

    // encrypt password

    // save user to db

    // remove password from user response

    // generate token

    // send token back in response together with required user info
    // but without password!

    res.status(201).json('Created new user');
});
