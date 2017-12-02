'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// local app dependencies
var app = (0, _express2.default)();
// middleware configuration
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
// setting up cors to allow any client to consume the back end
app.use((0, _cors2.default)());
app.use('/api/v1', _api2.default);

app.get('/', function (req, res) {
  return res.json({
    message: 'welcome to HackerBay thumbnails generator to access the API - api/v1/login'
  });
});

// handling 404 error
app.use(function (req, res, next) {
  res.status = 404;
  res.json({
    message: 'oops page not found',
    status: res.status
  });
  next();
});

// error handler
app.use(function (err, req, res, next) {
  res.status = 500;
  res.json({
    message: err,
    status: res.status
  });
  next();
});

app.listen(_config2.default.PORT, function () {
  console.log('starting server on http://localhost:' + _config2.default.PORT + '/');
});

exports.default = app; // for testing