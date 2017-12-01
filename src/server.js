import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

// local app dependencies
import config from './config'

const app = express()
// middleware configuration
app.use(morgan('dev'))
app.use(bodyParser.json())
// setting up cors to allow any client to consume the back end
app.use(cors())

app.listen(config.PORT, () => {
  console.log(`starting server on http://localhost:${config.PORT}/`)
})
