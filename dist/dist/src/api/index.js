'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

router.use('/auth', _auth2.default);

// this route would help to protect other route with the use of token
router.use(function (req, res, next) {
  // check header or url parameter or post parameter for token
  var token = req.body.token || req.headers['x-access-token'] || req.query.token;
  if (token) {
    // check if token is available then verify the token
    _jsonwebtoken2.default.verify(token, _config2.default.SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'failed to verify token'
        });
      } else {
        // save request and use in other route
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // return a 403 error
    res.status = 403;
    res.json({
      success: false,
      message: 'no token provided',
      status: res.status
    });
  }
});

// TODO: route for json-patch

// TODO: route for thumbnails generator
/**
 *  TODO:
 *  1. read the file(image) from the request
 *  2. manipulate the file and turn it to a thumbnail
 *  3. return the thumbnail as response
 */
router.get('/secret', function (req, res) {
  res.json({
    message: 'this is a secret'
  });
});
router.get('/', function (req, res) {
  res.status = 200;
  return res.json({
    message: 'welcome to HackerBay thumbnails generator to access the API - api/v1/login',
    status: res.status
  });
});

exports.default = router;