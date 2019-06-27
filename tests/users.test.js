const assert = require('chai').assert;
const request = require('supertest');
const bcrypt = require('bcryptjs');
const server = require('../api/index');
const db = require('../data/db');
const { user, tag, putUser } = require('./testsSetup');

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

    describe('PUT /:id', function() {
        it('Returns 404 on bad user id', async function() {
            const res = await request(server)
                .put('/api/user/5')
                .send(putUser);
            assert.strictEqual(res.status, 404, 'Status codes 404 are equal');
        });
        it('Sends an error message if user with ID does not exist', async function() {
            const res = await request(server)
                .put('/api/user/5')
                .send(putUser);
            assert.property(res.body, 'message', 'Contains error message');
        });
        it('Hashes password saved into the database', async function() {
            const res = await request(server)
                .put('/api/user/1')
                .send(putUser);
            // Grab the user from the DB and check if his password is hashed
            const [updatedUser] = await db('users');
            assert.notProperty(
                res.body,
                'password',
                'Response doesnt contain password'
            );
            assert.notStrictEqual(
                putUser.password,
                updatedUser.password,
                'Checks if the input password is NOT the same as pw saved in db'
            );
            assert.isTrue(
                bcrypt.compareSync(putUser.password, updatedUser.password),
                'Checks is the password is hashed'
            );
        });
        it('Updates user', async function() {
            const res = await request(server)
                .put('/api/user/1')
                .send(putUser);
            assert.property(res.body, 'id', 'Contains user id');
            assert.strictEqual(res.body.id, 1, 'Responds with correct ID');
            assert.property(res.body, 'username', 'Contains username');
            assert.strictEqual(
                res.body.username,
                putUser.username,
                'Responds with correct username'
            );
            assert.property(res.body, 'email', 'Contains email');
            assert.strictEqual(
                res.body.email,
                user.email,
                'Responds with correct email'
            );
        });
        it('Returns 200 on success', async function() {
            const res = await request(server)
                .put('/api/user/1')
                .send(putUser);
            assert.strictEqual(res.status, 200, 'Status codes 404 are equal');
        });
    });
});
