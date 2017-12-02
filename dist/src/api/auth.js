'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../utils/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = _express2.default.Router();

auth.post('/login', function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  var auth = (0, _auth.authentication)(username, password);
  res.status = 200;
  res.json({
    status: res.status,
    data: auth,
    activeUser: _auth.activeUser

  });
});
exports.default = auth;