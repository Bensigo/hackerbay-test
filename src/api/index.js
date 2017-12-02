import express from 'express'
import jwt from 'jsonwebtoken'

import auth from './auth'
import config from '../config'

const router = express.Router()

router.get('/', (req, res) => {
  res.status = 200
  return res.json({
    message: 'welcome to HackerBay thumbnails generator to access the API - api/v1/login',
    status: res.status
  })
})

router.use('/auth', auth)

// this route would help to protect other route with the use of token
router.use((req, res, next) => {
  // check header or url parameter or post parameter for token
  const token = req.body.token || req.headers['x-access-token'] || req.query.token
  if (token) {
    // check if token is available then verify the token
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'failed to verify token'
        })
      } else {
        // save request and use in other route
        req.decoded = decoded
        next()
      }
    })
  } else {
    // return a 403 error
    res.status = 403
    res.json({
      success: false,
      message: 'no token provided',
      status: res.status
    })
  }
})

// TODO: route for json-patch

// TODO: route for thumbnails generator
/**
 *  TODO:
 *  1. read the file(image) from the request
 *  2. manipulate the file and turn it to a thumbnail
 *  3. return the thumbnail as response
 */

export default router
