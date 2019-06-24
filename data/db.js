const knex = require('knex');
const knexConfig = require('../knexfile');

const dbEnv = process.env.NODE_ENV || 'development';

module.exports = knex(knexConfig[dbEnv]);
