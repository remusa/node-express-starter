import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import db from './data/db'

dotenv.config()

const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV || 'development'

const app: express.Application = express()

// SECURITY
app.use(helmet())
app.disable('x-powered-by')
app.use(cors())

// MIDDLEWARE
app.use(bodyParser.json())

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, world!')
})

app.get('/api/v1/todos', async (req: express.Request, res: express.Response) => {
  const todos = await db('todo')
  res.json({ todos })
})

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT} | ENV: ${ENV}`),
)
