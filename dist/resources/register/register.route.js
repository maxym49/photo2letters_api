"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _register = require("./register.control");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/').post(_register.registerNewUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=register.route.js.map