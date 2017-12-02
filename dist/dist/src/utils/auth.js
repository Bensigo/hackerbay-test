'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activeUser = exports.authentication = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var activeUser = {
  username: null,
  password: null
  // function for handling authentication  and return a token
};var authentication = function authentication(username, pwd) {
  // check if the username and pwd is given
  if (username && pwd) {
    // check if pwd and username length is greater than 0
    if (username.length > 1 && pwd.length > 1) {
      // assign token to user that expires in 3 days
      activeUser['username'] = username;
      activeUser['password'] = pwd;
      var token = _jsonwebtoken2.default.sign(activeUser, _config2.default.SECRET, {
        expiresIn: '3d'
      });
      return { token: token };
    }
    return { message: 'username and password most be more than 1 characters' };
  }
  return { message: 'username and password require' };
};

exports.authentication = authentication;
exports.activeUser = activeUser;