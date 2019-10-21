"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../middlewares/auth");

var _user = require("./user/user.control");

var _files = require("./files/files.control");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/user/password').post(_auth.jwtAuth, _user.changePassword);
router.route('/user/email').get(_auth.jwtAuth, _user.emailModuleData);
router.route('/files/saved').get(_auth.jwtAuth, _files.savedFiles);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=information.route.js.map