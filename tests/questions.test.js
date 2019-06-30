const assert = require('chai').assert;
const request = require('supertest');
const server = require('../api/index');
const db = require('../data/db');
const path = require('../lib/routes');
const { user, tag, id, question, postQ } = require('./testsSetup');

describe('Questions endpoints', function() {
    before(async function() {
        await db('tags').insert(tag);
        await db('users').insert(user);
        await db('questions').insert(question);
    });

    after(async function() {
        await db.raw('TRUNCATE TABLE tags CASCADE');
        await db.raw('TRUNCATE TABLE users CASCADE');
        await db.raw('TRUNCATE TABLE questions CASCADE');
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
            assert.notProperty(res, 'password', 'Does not containt pw');
            assert.notProperty(
                res,
                'phone_number',
                'Does not containt phone number'
            );
        });
    });

    describe('GET /:id question', function() {
        it('Returns status code 200 on success', async function() {
            const res = await request(server).get(`${path.questions}/${id}`);
            assert.strictEqual(res.status, 200, 'Status codes 200 are equal');
        });
        it('Returns the question object', async function() {
            const res = await request(server).get(`${path.questions}/${id}`);
            assert.property(res.body, 'title', 'Contains title prop');
            assert.strictEqual(
                res.body.title,
                question.title,
                'Responds with title'
            );
            assert.property(res.body, 'author', 'Contains author prop');
            assert.isObject(res.body.author, 'Author prop contains object');
            assert.property(res.body.author, 'id', 'Author object contains id');
            assert.strictEqual(
                res.body.author.id,
                question.author_id,
                'ID in author object is equal to request author_id'
            );
            assert.notProperty(res.body, 'password', 'Does not containt pw');
            assert.notProperty(
                res.body,
                'phone_number',
                'Does not containt phone number'
            );
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

    describe.only('POST question', function() {
        it('Returns status code 201 on success', async function() {
            const q = await db('questions');
            q.forEach(a => console.log('before 201', a));
            const res = await request(server)
                .post(`${path.questions}`)
                .send(postQ);
            console.log(res.body);
            const w = await db('questions');
            w.forEach(a => console.log('after 201', a));
            assert.strictEqual(res.status, 201, 'Status codes 201 are equal');
        });
        it('Returns newly created question object', async function() {
            const q = await db('questions');
            q.forEach(a => console.log('before ret', a));
            const res = await request(server)
                .post(`${path.questions}`)
                .send(postQ);
            console.log(res.body);
            const w = await db('questions');
            w.forEach(a => console.log('after ret', a));
            assert.property(res.body, 'id', 'Does have an ID');
            assert.property(res.body, 'author', 'Does have author prop');
            assert.property(res.body, 'tag', 'Does have tag prop');
            assert.notProperty(
                res.body,
                'author_id',
                'Does not have author_id prop'
            );
            assert.notProperty(res.body, 'tag_id', 'Does not have tag_id prop');
        });
        it('Sends 404 if author_id does not exist', async function() {
            const badQ = { ...postQ, author_id: 5 };
            const res = await request(server)
                .post(`${path.questions}`)
                .send(badQ);
            assert.strictEqual(res.status, 404, 'Status coded 404 match');
        });
        it('Sends 404 if tag_id does not exist', async function() {
            const badQ = { ...postQ, tag_id: 5 };
            const res = await request(server)
                .post(`${path.questions}`)
                .send(badQ);
            assert.strictEqual(res.status, 404, 'Status coded 404 match');
        });
        it.skip('Sends 422 on failed data validation', async function() {
            const badQ = { ...postQ, id: 5 };
            const res = await request(server)
                .post(`${path.questions}`)
                .send(badQ);
            assert.strictEqual(res.status, 422, 'Status coded 422 match');
        });
    });
    describe('DELETE question by ID', function() {
        it('Sends 404 status code if a question with ID does not exist', async function() {
            const res = await request(server).delete(`${path.questions}/5`);
            assert.strictEqual(res.status, 404, 'Status codes 404 are equal');
        });
        it('Sends an error message if question with ID does not exist', async function() {
            const res = await request(server).delete(`${path.questions}/5`);
            assert.property(res.body, 'message', 'Contains error message');
        });
        it('Deletes the correct resource', async function() {
            const [before] = await db('questions').where({ id });
            await request(server).delete(`${path.questions}/${id}`);
            const [after] = await db('questions').where({ id });
            assert.exists(before, 'Resource with ID exists');
            assert.notExists(after, 'The resource does no longer exist');
        });
    });
});
