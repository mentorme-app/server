const assert = require('chai').assert;
const request = require('supertest');
const server = require('../api/index');
const db = require('../data/db');
const path = require('../lib/routes');
const seed = require('./testsSetup');

describe('Conversations endpoints', function() {
    before(async function() {
        await db('tags').insert(seed.tag);
        // author
        await db('users').insert(seed.user);
        // mentor
        await db('users').insert(seed.mentor);
        await db('questions').insert(seed.question);
        await db('conversations').insert(seed.conversation);
    });
    after(async function() {
        await db.raw('TRUNCATE TABLE tags CASCADE');
        await db.raw('TRUNCATE TABLE users CASCADE');
        await db.raw('TRUNCATE TABLE questions CASCADE');
        await db.raw('TRUNCATE TABLE conversations CASCADE');
    });
    it('Is in correct env', function() {
        assert.strictEqual(
            process.env.NODE_ENV,
            'testing',
            'Is in testing env'
        );
    });

    describe('POST new message', function() {
        it('Will send 422 and correct error on failed input validation', async function() {
            const res = await request(server)
                .post(path.messages)
                .send({ ...seed.message, invalid: 'property' });
            assert.strictEqual(res.status, 422, 'Status code 422 match');
            assert.include(res.body, 'is not allowed');
        });
        it('Will send 200 and new message in response on success', async function() {
            const res = await request(server)
                .post(path.messages)
                .send(seed.message);
            assert.strictEqual(res.status, 201, 'Status code 201 matches');
            assert.isObject(res.body, 'Response msg is object');
            assert.property(res.body, 'text', 'Response has text property');
            assert.property(res.body, 'sender', 'Response has sender property');
            assert.property(
                res.body,
                'conversation_id',
                'Response has conversation_id property'
            );
        });
    });
});
