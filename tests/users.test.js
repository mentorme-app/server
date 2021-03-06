const assert = require('chai').assert;
const request = require('supertest');
const bcrypt = require('bcryptjs');
const server = require('../api/index');
const db = require('../data/db');
const path = require('../lib/routes');
const { user, tag, putUser, id, badId } = require('./testsSetup');

describe('Users endpoints', function() {
    before(async function() {
        await db('tags').insert(tag);
        await db('users').insert(user);
    });

    after(async function() {
        await db.raw('TRUNCATE TABLE tags CASCADE');
        await db.raw('TRUNCATE TABLE users CASCADE');
    });

    it('Is in correct env', function() {
        assert.strictEqual(
            process.env.NODE_ENV,
            'testing',
            'Is in testing env'
        );
    });

    describe('GET /:id', function() {
        it('Returns status code 200 on successful user fetch', async function() {
            const res = await request(server).get(`${path.user}/${id}`);
            assert.strictEqual(res.status, 200, 'Status codes 200 are equal');
        });

        it('Returns the user object if it exist', async function() {
            const res = await request(server).get(`${path.user}/${id}`);
            assert.property(res.body, 'id', 'Contains user id');
            assert.strictEqual(res.body.id, id, 'Responds with correct ID');
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
            const res = await request(server).get(`${path.user}/${badId}`);
            assert.strictEqual(res.status, 404, 'Status codes 404 are equal');
        });

        it('Sends an error message if user with ID does not exist', async function() {
            const res = await request(server).get(`${path.user}/${badId}`);
            assert.property(res.body, 'message', 'Contains error message');
        });
    });

    describe('PUT /:id', function() {
        it('Returns 404 on bad user id', async function() {
            const res = await request(server)
                .put(`${path.user}/${badId}`)
                .send(putUser);
            assert.strictEqual(res.status, 404, 'Status codes 404 are equal');
        });
        it('Sends an error message if user with ID does not exist', async function() {
            const res = await request(server)
                .put(`${path.user}/${badId}`)
                .send(putUser);
            assert.property(res.body, 'message', 'Contains error message');
        });
        it('Returns 200 on success', async function() {
            const res = await request(server)
                .put(`${path.user}/${id}`)
                .send(putUser);
            assert.strictEqual(res.status, 200, 'Status codes 200 are equal');
        });
        it('Updates user', async function() {
            const res = await request(server)
                .put(`${path.user}/${id}`)
                .send(putUser);
            assert.property(res.body, 'id', 'Contains user id');
            assert.strictEqual(res.body.id, id, 'Responds with correct ID');
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

        it('Hashes password saved into the database', async function() {
            const res = await request(server)
                .put(`${path.user}/${id}`)
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
                'Checks if hashes of input password and hash of pw in db are equal'
            );
        });
    });
});
