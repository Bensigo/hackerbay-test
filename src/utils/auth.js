import jwt from 'jsonwebtoken'
import config from '../config'

let activeUser = {
  username: null,
  password: null
}
// function for handling authentication  and return a token
const authentication = (username, pwd) => {
// check if the username and pwd is given
  if (username && pwd) {
    // check if pwd and username length is greater than 0
    if (username.length > 1 && pwd.length > 1) {
      // assign token to user that expires in 3 days
      activeUser['username'] = username
      activeUser['password'] = pwd
      const token = jwt.sign(activeUser, config.SECRET, {
        expiresIn: '3d'
      })
      return {token: token}
    }
    return {message: 'username and password most be more than 1 characters'}
  }
  return {message: 'username and password require'}
}

export {authentication, activeUser}
