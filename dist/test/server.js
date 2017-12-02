'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _mocha = require('mocha');

var _server = require('../src/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

(0, _mocha.describe)('API route', function () {
  (0, _mocha.it)('testing the api route if working', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      if (err) {
        console.log(err);
      }
    });
    done();
  });
  (0, _mocha.it)('testing if the 404 route works', function (done) {
    _chai2.default.request(_server2.default).get('/test').end(function (err, res) {
      res.should.have.status(404);
      if (err) {
        console.log(err);
      }
    });
    done();
  });
});