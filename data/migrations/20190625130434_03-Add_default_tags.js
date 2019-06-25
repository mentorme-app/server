exports.up = knex =>
    knex.schema.raw(
        'ALTER TABLE "users" ALTER COLUMN "tag_id" SET DEFAULT "1"'
    );

exports.down = knex => knex.schema.dropTableIfExists('users');
