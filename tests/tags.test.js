const assert = require('chai').assert;
const request = require('supertest');
const server = require('../api/index');
const db = require('../data/db');
const path = require('../lib/routes');
const { tag } = require('./testsSetup');

describe('Tags endpoints', function() {
    before(async function() {
        await db('tags').insert(tag);
    });

    after(async function() {
        await db('tags').truncate();
    });

    describe('GET all tags', function() {
        it('Returns status code 200 on succesfull user fetch', async function() {
            const res = await request(server).get(path.tags);
            assert.strictEqual(res.status, 200, 'Status codes 200 are equal');
        });

        it('Returns an array of tags', async function() {
            const res = await request(server).get(path.tags);
            assert.isArray(res.body, 'Returns an array');
            assert.lengthOf(res.body, 1, 'Has proper array length');
            assert.strictEqual(res.body[0].tag, tag.tag, 'Tag name is correct');
        });
    });
});
