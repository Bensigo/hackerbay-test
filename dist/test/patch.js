'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _mocha = require('mocha');

var _server = require('../src/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

(0, _mocha.describe)(' json Patch', function () {
  (0, _mocha.it)('patch a json object', function (done) {
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IjEyM3Rlc3QiLCJpYXQiOjE1MTIyNTExODUsImV4cCI6MTUxMjUxMDM4NX0._0v4urjK17yoF7Bnbuz-ZmzFKI3QDuBhYMcx9SZjrxQ';
    var data = {
      json: {
        name: 'test',
        age: '20'
      },
      patch: [{ op: 'replace', path: '/name', value: 'john ivy' }]
    };
    _chai2.default.request(_server2.default).post('api/v1/patch').set('x-access-token', token).send(data).end(function (err, req, res) {
      if (err) throw err;
      expect(res).to.have.status(200);
      expect(res).to.have.property('data');
      expect(req).to.have.header('x-access-token');
    });
    done();
  });
});