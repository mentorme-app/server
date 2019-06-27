const assert = require('chai').assert;
const request = require('supertest');
const server = require('../api/index');
const db = require('../data/db');
const path = require('../lib/routes');
const { user, tag, id, question } = require('./testsSetup');

describe('Questions endpoints', function() {
    before(async function() {
        await db('tags').insert(tag);
        await db('users').insert(user);
        await db('questions').insert(question);
    });

    after(async function() {
        await db('users').truncate();
        await db('tags').truncate();
        await db('questions').truncate();
    });

    describe('GET all questions', function() {
        it('Returns status code 200 on success', async function() {
            const res = await request(server).get(`${path.questions}`);
            assert.strictEqual(res.status, 200, 'Status codes 200 are equal');
        });

        it('Returns the questions array if it exist', async function() {
            const resArr = await request(server).get(`${path.questions}`);
            const res = resArr.body[0];
            assert.property(res, 'title', 'Contains title prop');
            assert.strictEqual(
                res.title,
                question.title,
                'Responds with title'
            );
            assert.property(res, 'author', 'Contains author prop');
            assert.isObject(res.author, 'Author prop contains object');
            assert.property(res.author, 'id', 'Author object contains id');
            assert.strictEqual(
                res.author.id,
                question.author_id,
                'ID in author object is equal to request author_id'
            );
        });
    });

    describe('GET /:id question', function() {
        it('Returns status code 200 on success', async function() {
            const res = await request(server).get(`${path.questions}/${id}`);
            assert.strictEqual(res.status, 200, 'Status codes 200 are equal');
        });
        it('Sends 404 status code if a user with ID does not exist', async function() {
            const res = await request(server).get(`${path.questions}/5`);
            assert.strictEqual(res.status, 404, 'Status codes 404 are equal');
        });

        it('Sends an error message if user with ID does not exist', async function() {
            const res = await request(server).get(`${path.questions}/5`);
            assert.property(res.body, 'message', 'Contains error message');
        });
    });
});
