const jwt = require('jsonwebtoken');

const generateToken = ({ id, email }) => {
    return jwt.sign(
        // token payload
        { subject: id, email },
        // token secret
        process.env.JWT_SECRET || 'top_secret_string',
        // token options
        { expiresIn: '1d' }
    );
};
module.exports = generateToken;
