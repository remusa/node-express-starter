import dotenv from 'dotenv'
import Knex from 'knex'
import knexfile from '../knexfile'

dotenv.config()

const ENV = process.env.NODE_ENV || 'development'
let configOptions = {}

switch (ENV) {
  case 'production':
    configOptions = knexfile.production
    break

  case 'testing':
    configOptions = knexfile.testing
    break

  default:
    configOptions = knexfile.development
    break
}

export = Knex(configOptions)
