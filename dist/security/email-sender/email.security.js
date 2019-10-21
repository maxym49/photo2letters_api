"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptEmailData = exports.decryptEmailData = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _encryptionTool = _interopRequireDefault(require("../encryption-tool/encryptionTool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var decryptEmailData = function decryptEmailData(type) {
  var data = _fs["default"].readFileSync(_path["default"].join(__dirname, '../../../tokens/email-token', 'email.json'));

  var jsonFile = JSON.parse(data);
  var et = new _encryptionTool["default"]();

  switch (type) {
    case 'host':
      return et.decrypt(jsonFile.host);

    case 'port':
      return et.decrypt(jsonFile.port);

    case 'user':
      return et.decrypt(jsonFile.user);

    case 'pass':
      return et.decrypt(jsonFile.pass);
  }
};

exports.decryptEmailData = decryptEmailData;

var encryptEmailData = function encryptEmailData(emailData) {
  var et = new _encryptionTool["default"]();
  return et.encrypt(emailData);
};

exports.encryptEmailData = encryptEmailData;
//# sourceMappingURL=email.security.js.map