'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _mocha = require('mocha');

var _server = require('../src/server');

var _server2 = _interopRequireDefault(_server);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

(0, _mocha.describe)('Authentication /login', function () {
  (0, _mocha.it)('try to auth the a user ', function (done) {
    var user = {
      username: 'test',
      password: '123test'
    };
    _chai2.default.request(_server2.default).post('api/v1/auth/login').send(user).end(function (res) {
      expect(res).to.have.status(200);
      expect(res).to.have.property('token');
      expect(res).to.have.property('activeUser').eql({ username: 'test', password: '123test' });
    });
    done();
  });
  (0, _mocha.it)('fail to auth user', function (done) {
    var user = {
      username: 'test'
    };
    _chai2.default.request(_server2.default).post('api/v1/auth/login').send(user).end(function (res) {
      expect(res).to.have.status(200);
      expect(res).to.have.property('data').eql({ message: 'username and password require' });
    });
    done();
  });
});