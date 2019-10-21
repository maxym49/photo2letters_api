"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../middlewares/auth");

var _email = require("./email.control");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/').post(_auth.jwtAuth, _email.send);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=email.route.js.map