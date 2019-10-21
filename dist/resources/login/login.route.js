"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _login = require("./login.control");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/').post(_passport["default"].authenticate('local', {
  session: false
}), _login.loginUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=login.route.js.map