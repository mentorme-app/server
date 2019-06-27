const assert = require('chai').assert;
const request = require('supertest');
const server = require('../api/index');
const db = require('../data/db');
const { user, tag } = require('./testsSetup');

describe('Users endpoints', function() {
    beforeEach(async function() {
        await db('tags').insert(tag);
        await db('users').insert(user);
    });

    afterEach(async function() {
        await db('users').truncate();
    });

    describe('GET /:id', function() {
        it('Returns status code 200 on succesfull user fetch', async function() {
            const res = await request(server).get('/api/user/1');
            assert.strictEqual(res.status, 200, 'Status codes 200 are equal');
        });

        it('Returns the user object if it exist', async function() {
            const res = await request(server).get('/api/user/1');
            assert.property(res.body, 'id', 'Contains user id');
            assert.strictEqual(res.body.id, 1, 'Responds with correct ID');
            assert.property(res.body, 'username', 'Contains username');
            assert.strictEqual(
                res.body.username,
                user.username,
                'Responds with correct username'
            );
            assert.property(res.body, 'email', 'Contains email');
            assert.strictEqual(
                res.body.email,
                user.email,
                'Responds with correct email'
            );
        });

        it('Sends 404 status code if a user with ID does not exist', async function() {
            const res = await request(server).get('/api/user/5');
            assert.strictEqual(res.status, 404, 'Status codes 404 are equal');
        });

        it('Sends an error message if user with ID does not exist', async function() {
            const res = await request(server).get('/api/user/5');
            assert.property(res.body, 'message', 'Contains error message');
        });
    });
});
