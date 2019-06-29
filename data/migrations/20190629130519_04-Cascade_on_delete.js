exports.up = knex =>
    knex.schema
        .raw('ALTER TABLE users DROP COLUMN tag_id')
        .table('users', table => {
            table
                .integer('tag_id')
                .unsigned()
                .defaultTo(1);
            table
                .foreign('tag_id')
                .references('id')
                .inTable('tags')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .raw('ALTER TABLE questions DROP COLUMN tag_id')
        .raw('ALTER TABLE questions DROP COLUMN author_id')
        .table('questions', table => {
            table.integer('tag_id').unsigned();
            table
                .foreign('tag_id')
                .references('id')
                .inTable('tags')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table
                .integer('author_id')
                .unsigned()
                .notNullable();
            table
                .foreign('author_id')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .raw('ALTER TABLE conversations DROP COLUMN question_id')
        .raw('ALTER TABLE conversations DROP COLUMN mentor_id')
        .table('conversations', table => {
            table
                .integer('question_id')
                .unsigned()
                .notNullable();
            table
                .foreign('question_id')
                .references('id')
                .inTable('questions')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table
                .integer('mentor_id')
                .unsigned()
                .notNullable();
            table
                .foreign('mentor_id')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .raw('ALTER TABLE messages DROP COLUMN conversation_id')
        .raw('ALTER TABLE messages DROP COLUMN sender')
        .table('messages', table => {
            table
                .integer('sender')
                .unsigned()
                .notNullable();
            table
                .foreign('sender')
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table
                .integer('conversation_id')
                .unsigned()
                .notNullable();
            table
                .foreign('conversation_id')
                .references('id')
                .inTable('conversations')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
exports.down = knex => {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('questions')
        .dropTableIfExists('conversations')
        .dropTableIfExists('messages');
};
