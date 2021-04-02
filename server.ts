import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import db from './data/db'

dotenv.config()

const PORT = process.env.PORT || 8000
const ENV = process.env.NODE_ENV || 'development'
const CORS_WHITELIST = (process.env.CORS_WHITELIST && process.env.CORS_WHITELIST.split(',')) || []

const app: express.Application = express()

// SECURITY
app.use(helmet())
app.disable('x-powered-by')
app.use(
  cors({
    origin: CORS_WHITELIST,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: ''
    // credentials: ''
    // maxAge: ''
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
)

// Static folder
const PUBLIC: string = path.join(__dirname, 'public/')
app.use(express.static(PUBLIC))

// LOGGING
app.use(morgan('dev'))

// PARSING
app.use(express.json()) // body-parser
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, world!')
})

app.get('/api/v1/todos', async (req: express.Request, res: express.Response) => {
  const todos = await db('todo')
  res.json({ todos })
})

app.post('api/v1/users', async (req: express.Request, res: express.Response) => {
  // const response = await signup(req)
  // res.send(response)
  res.json({ message: 'signup' })
})

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT} | ENV: ${ENV}`),
)
