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
    describe('GET conversations for a question', function() {
        it('Returns status 422 on missing qid query string', async function() {
            const res = await request(server).get(`${path.conversations}`);
            assert.strictEqual(res.status, 422, 'Status code 422 match');
        });
        it('Sends error msg on missing qid query string', async function() {
            const res = await request(server).get(`${path.conversations}`);
            assert.property(
                res.body,
                'message',
                'Contains error msg on missing QS'
            );
        });
        it('Returns status 200 on success', async function() {
            const res = await request(server).get(
                `${path.conversations}?qid=${seed.id}`
            );
            assert.strictEqual(res.status, 200, 'Status code 200 match');
        });
        it('Returns an array of conversations', async function() {
            const res = await request(server).get(
                `${path.conversations}?qid=${seed.id}`
            );
            assert.isArray(res.body, 'res.body contains an array');
            const conv = res.body[0];
            assert.property(
                conv,
                'question_id',
                'Conversation contains question_id'
            );
            assert.property(
                conv,
                'mentor_id',
                'Conversation contains mentor_id'
            );
            assert.strictEqual(
                conv.question_id,
                seed.question.id,
                'question_id match'
            );
            assert.strictEqual(
                conv.mentor_id,
                seed.mentor.id,
                'mentor_id match'
            );
        });
    });
    describe('GET conversation by ID', function() {
        it('Returns 404 on bad ID', async function() {
            const res = await request(server).get(`${path.conversations}/5`);
            assert.strictEqual(res.status, 404, 'Status code 404 match');
        });
        it('Returns error msg on bad ID', async function() {
            const res = await request(server).get(`${path.conversations}/5`);
            assert.property(res.body, 'message', 'Contains error msg');
        });
        it('Returns 200 on success', async function() {
            const res = await request(server).get(
                `${path.conversations}/${seed.id}`
            );
            assert.strictEqual(res.status, 200, 'Status code 200 match');
        });
        it('Returns conversation obj on success', async function() {
            const res = await request(server).get(
                `${path.conversations}/${seed.id}`
            );
            assert.isObject(res.body, 'Conversation is object');
            assert.property(res.body, 'mentor', 'Conv has mentor prop');
            assert.property(res.body, 'author', 'Conv has author prop');
            assert.property(res.body, 'messages', 'Conv has messages prop');
        });
    });
});
