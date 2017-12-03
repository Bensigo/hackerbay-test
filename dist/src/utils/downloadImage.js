'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function downloadImage(uri, filename, callback) {
  // download and image base on url and save it
  _request2.default.head(uri, function (err, res, body) {
    if (err) {
      console.log(err);
    }
  });
  (0, _request2.default)(uri).pipe(_fs2.default.createWriteStream(filename).on('close', callback));
}
exports.default = downloadImage;