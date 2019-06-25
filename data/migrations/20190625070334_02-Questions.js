exports.up = knex =>
    knex.schema
        .createTable('questions', table => {
            table.increments();
            table.string('title').notNullable();
            table.text('question').notNullable();
            table
                .integer('author_id')
                .unsigned()
                .notNullable();
            table
                .foreign('author_id')
                .references('id')
                .inTable('users');
            table.integer('tag_id').unsigned();
            table
                .foreign('tag_id')
                .references('id')
                .inTable('tags');
            table.boolean('isAnswered').defaultTo(false);
            table.timestamps(true, true);
        })
        .createTable('conversations', table => {
            table.increments();
            table
                .integer('question_id')
                .unsigned()
                .notNullable();
            table
                .foreign('question_id')
                .references('id')
                .inTable('questions');
            table
                .integer('mentor_id')
                .unsigned()
                .notNullable();
            table
                .foreign('mentor_id')
                .references('id')
                .inTable('users');
            table.timestamps(true, true);
        })
        .createTable('messages', table => {
            table.increments();
            table
                .integer('sender')
                .unsigned()
                .notNullable();
            table
                .foreign('sender')
                .references('id')
                .inTable('users');
            table.text('text').notNullable();
            table
                .integer('conversation_id')
                .unsigned()
                .notNullable();
            table
                .foreign('conversation_id')
                .references('id')
                .inTable('conversations');
            table.timestamps(true, true);
        });

exports.down = knex =>
    knex.schema
        .dropTableIfExists('questions')
        .dropTableIfExists('conversations')
        .dropTableIfExists('messages');
