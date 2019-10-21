"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtAuth = void 0;

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwtAuth = function jwtAuth(req, res, next) {
  return _passport["default"].authenticate('jwt', {
    session: false
  })(req, res, next);
};

exports.jwtAuth = jwtAuth;
//# sourceMappingURL=auth.js.map