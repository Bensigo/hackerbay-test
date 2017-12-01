import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))

app.listen(8080, () => {
  console.log('server up on http://localhost:8080/')
})
