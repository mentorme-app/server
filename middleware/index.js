const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

module.exports = server => {
    server.use(express.json());
    server.use(compression());
    server.use(helmet());
    server.use(cors());
};
