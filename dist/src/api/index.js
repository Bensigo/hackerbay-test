'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _jsonpatch = require('jsonpatch');

var _jsonpatch2 = _interopRequireDefault(_jsonpatch);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _downloadImage = require('../utils/downloadImage');

var _downloadImage2 = _interopRequireDefault(_downloadImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  res.status = 200;
  return res.json({
    message: 'welcome to HackerBay thumbnails generator to access the API - api/v1/login',
    status: res.status
  });
});

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

router.post('/patch', function (req, res) {
  var _req$body = req.body,
      json = _req$body.json,
      patch = _req$body.patch;
  // replace the json with the patch

  var replace = _jsonpatch2.default.apply_patch(json, patch);
  res.json({
    data: replace
  });
});

// TODO: route for thumbnails generator for only auth user
router.post('/thumbnail', async function (req, res, next) {
  var _req$body2 = req.body,
      uri = _req$body2.uri,
      name = _req$body2.name;

  await (0, _downloadImage2.default)(uri, './downloads/' + name + '.png', async function () {
    console.log('done downloading');
    console.log(' finding file ./downloads/' + name);
    await _jimp2.default.read('./downloads/' + name + '.png', function (err, image) {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          message: 'failed to create thumbnail'
        });
      }
      console.log('start resizing image');
      // convert image size to 50 * 50
      image.resize(50, 50).quality(70).write('./thumbnails/' + name + '.png');
      console.log('resizing image done');
      res.json({
        success: true,
        message: 'thumbnail created located in ./thumbnail'
      });
    });
  });
});
exports.default = router;