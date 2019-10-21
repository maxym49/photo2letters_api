"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _colors = require("./colors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
    key: "info",
    value: function info(message) {
      console.info(_colors.green, "[information] ".concat(message));
    }
  }, {
    key: "configInfo",
    value: function configInfo(message) {
      console.info(_colors.cyan, "[app-config] ".concat(message));
    }
  }, {
    key: "error",
    value: function error(_error) {
      var stack = _error.stack,
          message = _error.message;
      if (!message) console.error(_error);else console.error(_colors.red, "[error] \nStack:\n".concat(stack, "\nMessage:").concat(message));
    }
  }, {
    key: "warn",
    value: function warn(message) {
      console.warn(_colors.yellow, "[warning] ".concat(message));
    }
  }]);

  return Logger;
}();

exports["default"] = Logger;
//# sourceMappingURL=logger.js.map