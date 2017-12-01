import express from 'express'
import {authentication, activeUser} from '../utils/auth'

const auth = express.Router()

auth.post('/login', (req, res) => {
  const {username, password} = req.body
  const auth = authentication(username, password)
  res.status = 200
  res.json({
    status: res.status,
    data: auth,
    activeUser

  })
})
export default auth
