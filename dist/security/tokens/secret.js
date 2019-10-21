"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptSecret = exports.decryptSecret = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _encryptionTool = _interopRequireDefault(require("../encryption-tool/encryptionTool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var decryptSecret = function decryptSecret() {
  var data = _fs["default"].readFileSync(_path["default"].join(__dirname, '../../../tokens/secret-token', 'secret.json'));

  var jsonFile = JSON.parse(data);
  var et = new _encryptionTool["default"]();
  return et.decrypt(jsonFile.secret);
};

exports.decryptSecret = decryptSecret;

var encryptSecret = function encryptSecret(secret) {
  var et = new _encryptionTool["default"]();
  return et.encrypt(secret);
};

exports.encryptSecret = encryptSecret;
//# sourceMappingURL=secret.js.map