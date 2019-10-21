"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: {
      unique: true
    }
  }
}, {
  timestamps: true
});
User.plugin(_passportLocalMongoose["default"], {
  usernameField: 'email'
});

var _default = _mongoose["default"].model('User', User);

exports["default"] = _default;
//# sourceMappingURL=user.js.map