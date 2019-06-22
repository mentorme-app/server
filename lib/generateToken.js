const jwt = require('jsonwebtoken');

const generateToken = ({ id, username, role }) =>
    jwt.sign(
        // token payload
        { subject: id, username, role },
        // token secret
        process.env.JWT_SECRET || 'top_secret_string',
        // token options
        { expiresIn: '1d' }
    );

module.exports = generateToken;
