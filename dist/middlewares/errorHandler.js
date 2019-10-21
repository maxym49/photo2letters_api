"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;

var _logger = _interopRequireDefault(require("../tools/console/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function errorHandler(err, req, res) {
  _logger["default"].error(err);

  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({
      message: err.message
    });
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res.status(400).json({
      message: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      message: 'Invalid Token'
    });
  } // default to 500 server error


  return res.status(500).json({
    message: err.message
  });
}
//# sourceMappingURL=errorHandler.js.map