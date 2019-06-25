exports.up = knex =>
    knex.schema
        .createTable('tags', table => {
            table.increments();
            table.string('tag', 255).notNullable();
            table.timestamps(true, true);
        })
        .createTable('users', table => {
            table.increments();
            table.string('username', 255).notNullable();
            table
                .string('email', 255)
                .notNullable()
                .unique();
            table.string('password', 255).notNullable();
            table.string('avatar');
            table.string('motto');
            table.text('description');
            table
                .integer('tag_id')
                .unsigned()
                .defaultTo(1);
            table
                .foreign('tag_id')
                .references('id')
                .inTable('tags');
            table.timestamps(true, true);
        });

exports.down = knex =>
    knex.schema.dropTableIfExists('tags').dropTableIfExists('users');
