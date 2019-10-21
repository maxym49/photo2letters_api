"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Email = new _mongoose["default"].Schema({
  user_id: {
    type: _mongoose["default"].Types.ObjectId,
    required: true
  },
  value: String,
  selectedFiles: {
    type: [String]
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Email', Email);

exports["default"] = _default;
//# sourceMappingURL=email.js.map