"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptToken = exports.decryptToken = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _encryptionTool = _interopRequireDefault(require("../encryption-tool/encryptionTool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var decryptToken = function decryptToken() {
  var data = _fs["default"].readFileSync(_path["default"].join(__dirname, '../../../tokens/dropbox-token', 'token.json'));

  var jsonFile = JSON.parse(data);
  var et = new _encryptionTool["default"]();
  return et.decrypt(jsonFile.token);
};

exports.decryptToken = decryptToken;

var encryptToken = function encryptToken(token) {
  var et = new _encryptionTool["default"]();
  return et.encrypt(token);
};

exports.encryptToken = encryptToken;
//# sourceMappingURL=dropbox.security.js.map