"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var File = new _mongoose["default"].Schema({
  user_id: {
    type: _mongoose["default"].Types.ObjectId,
    required: true
  },
  fileType: {
    type: Number
  },
  name: String,
  fileBuffer: Buffer
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('File', File);

exports["default"] = _default;
//# sourceMappingURL=file.js.map