import express from 'express'
import jwt from 'jsonwebtoken'
import jimp from 'jimp'
import jsonPatch from 'jsonpatch'

import auth from './auth'
import config from '../config'
import downloadImage from '../utils/downloadImage'

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

router.post('/patch', (req, res) => {
  const {json, patch} = req.body
  // replace the json with the patch
  const replace = jsonPatch.apply_patch(json, patch)
  res.json({
    data: replace
  })
})

// TODO: route for thumbnails generator for only auth user
router.post('/thumbnail', async (req, res, next) => {
  const {uri, name} = req.body
  await downloadImage(uri, `./downloads/${name}.png`, async () => {
    console.log('done downloading')
    console.log(` finding file ./downloads/${name}`)
    await jimp.read(`./downloads/${name}.png`, (err, image) => {
      if (err) {
        console.log(err)
        res.json({
          success: false,
          message: 'failed to create thumbnail'
        })
      }
      console.log('start resizing image')
      // convert image size to 50 * 50
      image.resize(50, 50)
        .quality(70)
        .write(`./thumbnails/${name}.png`)
      console.log('resizing image done')
      res.json({
        success: true,
        message: 'thumbnail created located in ./thumbnail'
      })
    })
  })
})
export default router
