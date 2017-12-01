import express from 'express'

import auth from './auth'

const router = express.Router()

router.use('/auth', auth)

router.get('/', (req, res) => {
  res.status = 200
  return res.json({
    message: 'welcome to HackerBay thumbnails generator to access the API - api/v1/login',
    status: res.status
  })
})

export default router
