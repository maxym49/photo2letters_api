"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tesseract = require("tesseract.js");

var _logger = _interopRequireDefault(require("../console/logger"));

var _progress = _interopRequireDefault(require("progress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OCR =
/*#__PURE__*/
function () {
  function OCR() {
    _classCallCheck(this, OCR);

    this.initProperties();
  }

  _createClass(OCR, [{
    key: "createWorker",
    value: function createWorker() {
      var pb = new _progress["default"]('[:bar] :percent :etas', {
        total: 100
      });
      this._worker = (0, _tesseract.createWorker)({
        logger: function logger(m) {
          pb.tick(m.progress, 1);
        }
      });
    }
  }, {
    key: "startRecognize",
    value: function () {
      var _startRecognize = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, text;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _logger["default"].configInfo("User [".concat(this._userName, "] has started converting file [").concat(this._fileName, "]"));

                _context.next = 3;
                return this._worker.load();

              case 3:
                _context.next = 5;
                return this._worker.loadLanguage(this._language);

              case 5:
                _context.next = 7;
                return this._worker.initialize(this._language);

              case 7:
                _context.next = 9;
                return this._worker.recognize(Buffer.from(this.image, 'base64'));

              case 9:
                _ref = _context.sent;
                text = _ref.data.text;
                this.text = text;
                _context.next = 14;
                return this._worker.terminate();

              case 14:
                console.info();

                _logger["default"].configInfo("User [".concat(this._userName, "] has ended converting file [").concat(this._fileName, "]"));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function startRecognize() {
        return _startRecognize.apply(this, arguments);
      }

      return startRecognize;
    }()
  }, {
    key: "initProperties",
    value: function initProperties() {
      this.language = 'pol';
      this.text = '';
      this.userName = '';
      this.fileName = '';
      this.image = '';
      this.createWorker();
    }
  }, {
    key: "language",
    set: function set(language) {
      this._language = language;
    },
    get: function get() {
      return this._language;
    }
  }, {
    key: "text",
    set: function set(text) {
      this._text = text;
    },
    get: function get() {
      return this._text;
    }
  }, {
    key: "image",
    set: function set(image) {
      this._image = image;
    },
    get: function get() {
      return this._image;
    }
  }, {
    key: "fileName",
    set: function set(fileN) {
      this._fileName = fileN;
    },
    get: function get() {
      return this._fileName;
    }
  }, {
    key: "userName",
    set: function set(userN) {
      this._userName = userN;
    },
    get: function get() {
      return this._userName;
    }
  }]);

  return OCR;
}();

exports["default"] = OCR;
//# sourceMappingURL=ocr.js.map