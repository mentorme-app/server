module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/mentorme.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },
    testing: {
        client: 'sqlite3',
        connection: {
            filename: './data/test.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    }
};
