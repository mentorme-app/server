exports.seed = knex =>
    knex('conversations').insert([
        {
            question_id: 1,
            mentor_id: 1
        }
    ]);
