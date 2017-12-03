'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _mocha = require('mocha');

var _server = require('../src/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

var imageData = {
  name: 'niceDog',
  uri: 'https://www.petinsurance.com/images/VSSimages/consumer/v5/banner_dog_insurance.jpg'
};

(0, _mocha.describe)('Thumbnail generator', function () {
  (0, _mocha.it)('successfully generate thumbnail from image uri', function (done) {
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IjEyM3Rlc3QiLCJpYXQiOjE1MTIyNTExODUsImV4cCI6MTUxMjUxMDM4NX0._0v4urjK17yoF7Bnbuz-ZmzFKI3QDuBhYMcx9SZjrxQ';
    _chai2.default.request(_server2.default).post('/api/v1/thumbnail').set('x-access-token', token).send(imageData).end(function (err, req, res) {
      console.log(err);
      expect(res).to.have.status(200);
      expect(res).to.have.property('message').eql('thumbnail created located in ./thumbnail');
      expect(req).to.have.header('x-access-token');
    });
    done();
  });
  (0, _mocha.it)('fail to generate thumbnail', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/thumbnail').send(imageData).end(function (err, req, res) {
      if (err) throw err;
      expect(res).to.have.status(403);
      expect(res).to.have.property('status').eql(false);
    });
    done();
  });
});