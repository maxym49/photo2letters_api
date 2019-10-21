"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _logger = _interopRequireDefault(require("../../tools/console/logger"));

var _db = require("../../security/database/db.security");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connect = function connect() {
  _mongoose["default"].set('useFindAndModify', false);

  _mongoose["default"].connect((0, _db.decryptToken)(), {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  }).then(function () {
    _logger["default"].info('The database is running');
  })["catch"](function (error) {
    return console.error(error);
  });

  _mongoose["default"].connection.on('error', function (err) {
    _logger["default"].error(err);
  });
};

exports.connect = connect;
//# sourceMappingURL=db.js.map