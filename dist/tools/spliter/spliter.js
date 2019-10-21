"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRemoteFileName = exports.splitToken = void 0;

var splitToken = function splitToken(authString) {
  return authString.replace(/\W*(Bearer)\W/, '');
};

exports.splitToken = splitToken;

var getRemoteFileName = function getRemoteFileName(i, n) {
  return "".concat(i, "_").concat(n, ".pdf");
};

exports.getRemoteFileName = getRemoteFileName;
//# sourceMappingURL=spliter.js.map