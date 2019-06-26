exports.up = knex =>
    knex.schema.table('users', table => {
        table.string('phone_number');
    });

exports.down = knex => {
    return knex.schema.dropTableIfExists('users');
};
