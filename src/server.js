import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

// local app dependencies
import config from './config'
import router from './api'

const app = express()
// middleware configuration
app.use(morgan('dev'))
app.use(bodyParser.json())
// setting up cors to allow any client to consume the back end
app.use(cors())
app.use('/api/v1', router)

app.get('/', (req, res) => {
  return res.json({
    message: 'welcome to HackerBay thumbnails generator to access the API - api/v1/login'
  })
})

// handling 404 error
app.use((req, res, next) => {
  res.status = 404
  res.json({
    message: 'oops page not found',
    status: res.status
  })
  next()
})
// error handler
app.use((err, req, res, next) => {
  res.status = 500
  res.json({
    message: err,
    status: res.status
  })
  next()
})

app.listen(config.PORT, () => {
  console.log(`starting server on http://localhost:${config.PORT}/`)
})

export default app // for testing
