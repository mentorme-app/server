exports.seed = knex =>
    knex('conversations').insert([
        {
            question_id: 1,
            mentor_id: 3
        },
        {
            question_id: 1,
            mentor_id: 4
        },
        {
            question_id: 2,
            mentor_id: 1
        },
        {
            question_id: 4,
            mentor_id: 2
        }
    ]);
