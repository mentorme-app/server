exports.up = knex =>
    knex.schema
        .createTable('tags', table => {
            table.increments();
            table.uuid('tag_id');
            table.string('tag', 255).notNullable();
            table.timestamps(true, true);
        })
        .createTable('users', table => {
            table.increments();
            table.uuid('user_id');
            table.string('username', 255).notNullable();
            table
                .string('email', 255)
                .notNullable()
                .unique();
            table.string('password', 255).notNullable();
            table.string('avatar');
            table.string('motto');
            table.text('description');
            table.string('tag_id');
            table
                .foreign('tag_id')
                .references('id')
                .inTable('tags');
            table.timestamps(true, true);
        });

exports.down = knex =>
    knex.schema.dropTableIfExists('tags').dropTableIfExists('users');
