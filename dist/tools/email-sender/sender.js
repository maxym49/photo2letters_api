"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("../console/logger"));

var _email = require("../../security/email-sender/email.security");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sender =
/*#__PURE__*/
function () {
  function Sender() {
    _classCallCheck(this, Sender);

    this.subject = '';
    this.userEmail = '';
  }

  _createClass(Sender, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.readHtmlFile();

              case 2:
                this.initTransport();
                this.initMessage();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "initTransport",
    value: function initTransport() {
      this.transport = _nodemailer["default"].createTransport({
        host: (0, _email.decryptEmailData)('host'),
        port: (0, _email.decryptEmailData)('port'),
        secure: true,
        auth: {
          user: (0, _email.decryptEmailData)('user'),
          pass: (0, _email.decryptEmailData)('pass')
        }
      });
    }
  }, {
    key: "initMessage",
    value: function initMessage() {
      this.message = {
        from: (0, _email.decryptEmailData)('user'),
        to: this.userEmail,
        subject: this.subject,
        html: this.htmlFile,
        attachments: this.attachments
      };
    }
  }, {
    key: "readHtmlFile",
    value: function readHtmlFile() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _fs["default"].readFile(_path["default"].join(__dirname, '../../../static/templates', 'eng_template.html'), function (err, data) {
          if (err) {
            _logger["default"].error(err);

            reject(err);
          } else {
            _this.htmlFile = data.toString();
            resolve(data);
          }
        });
      });
    }
  }, {
    key: "sendMail",
    value: function sendMail() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.transport.sendMail(_this2.message, function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            _logger["default"].info("Mail has been sent to ".concat(_this2.userEmail));

            resolve();
          }
        });
      });
    }
  }, {
    key: "transport",
    set: function set(transport) {
      this._transport = transport;
    },
    get: function get() {
      return this._transport;
    }
  }, {
    key: "message",
    set: function set(message) {
      this._message = message;
    },
    get: function get() {
      return this._message;
    }
  }, {
    key: "userEmail",
    set: function set(userEmail) {
      this._userEmail = userEmail;
    },
    get: function get() {
      return this._userEmail;
    }
  }, {
    key: "subject",
    set: function set(subject) {
      this._subject = subject;
    },
    get: function get() {
      return this._subject;
    }
  }, {
    key: "htmlFile",
    set: function set(htmlFile) {
      this._htmlFile = htmlFile;
    },
    get: function get() {
      return this._htmlFile;
    }
  }, {
    key: "attachments",
    set: function set(attachments) {
      this._attachments = attachments;
    },
    get: function get() {
      return this._attachments;
    }
  }]);

  return Sender;
}();

exports["default"] = Sender;
//# sourceMappingURL=sender.js.map