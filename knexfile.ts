// const dotenv = require('dotenv')

// dotenv.config()

// Update with your config settings.

const DATABASE_URL = process.env.DATABASE_URL

export = {
  development: {
    client: 'pg',
    connection: DATABASE_URL,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  testing: {
    client: 'pg',
    connection: DATABASE_URL,
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: DATABASE_URL,
    searchPath: ['knex', 'public'],
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
}
