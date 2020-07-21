import bcrypt from 'bcrypt-nodejs'
import { Request, Response } from 'express'
import Knex from 'knex'

export const register = (req: Request, res: Response, db: Knex.Transaction) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json('Incorrect form submission')
  }

  const hash = bcrypt.hashSync(password)

  return db.transaction(trx => {
    trx
      .insert({
        email,
        password: hash,
      })
      .into('users')
      .returning('email')
      .then(trx.commit)
      .catch(trx.rollback)
  })
}

export const login = (req: Request, res: Response, db: Knex.QueryBuilder) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json('Incorrect form submission')
  }

  db.select('email', 'password')
    .from('users')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].password)

      if (isValid) {
        res.json({
          user: {
            email: data.email,
          },
        })
      } else {
        res.status(400).json('Wrong credentials')
      }
    })
}

export const profile = (req: Request, res: Response, db: Knex.QueryBuilder) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json('Incorrect profile id')
  }

  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Profile not found')
      }
    })
}

exports = { register, login, profile }
