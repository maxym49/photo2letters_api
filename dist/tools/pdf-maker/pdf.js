"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pdfkit = _interopRequireDefault(require("pdfkit"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("../console/logger"));

var _dropbox = _interopRequireDefault(require("../drop-box/dropbox"));

var _spliter = require("../spliter/spliter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PdfMaker =
/*#__PURE__*/
function () {
  function PdfMaker(name, _id) {
    _classCallCheck(this, PdfMaker);

    this.userID = _id;
    this.fileName = (0, _spliter.getRemoteFileName)(_id, name);
    this._doc = new _pdfkit["default"]();
    this._filePath = _path["default"].join(__dirname, '../../../static/temporary-files', "".concat(this.fileName));
    this._file = _fs["default"].createWriteStream(this._filePath);

    this._doc.pipe(this._file);

    this.fontFamily = _path["default"].join(__dirname, '../../../static/fonts', 'Lato-Regular.ttf');
    this.fontSize = 12;
  }

  _createClass(PdfMaker, [{
    key: "writeLine",
    value: function writeLine(text) {
      this._doc.text(text);
    }
  }, {
    key: "addPage",
    value: function addPage() {
      this._doc.addPage();
    }
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this._doc.save();

                  _this._doc.end();

                  var buffers = [];

                  _this._doc.on('data', function (chunk) {
                    return buffers.push(chunk);
                  });

                  _this._doc.on('end', function () {
                    var dropbox = new _dropbox["default"]();

                    var fileToUpload = _fs["default"].createReadStream(_this._filePath.toString());

                    dropbox.upload(fileToUpload, "".concat(_this.fileName)).then(function () {
                      _this.pdfBuffer = Buffer.concat(buffers);

                      _fs["default"].unlink(_this._filePath.toString(), function (err) {
                        reject(err);
                      });

                      resolve(_this.pdfBuffer);
                    })["catch"](function (error) {
                      _logger["default"].error(error);

                      reject(error);
                    });
                  });
                }));

              case 4:
                _context.prev = 4;
                _context.t0 = _context["catch"](0);

                _logger["default"].error(_context.t0);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 4]]);
      }));

      function save() {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "fontFamily",
    set: function set(fontF) {
      this._fontFamily = fontF;

      this._doc.font(fontF);
    },
    get: function get() {
      return this._fontFamily;
    }
  }, {
    key: "fontSize",
    set: function set(fontS) {
      this._fontSize = fontS;

      this._doc.fontSize(fontS);
    },
    get: function get() {
      return this._fontSize;
    }
  }, {
    key: "backgroudColor",
    set: function set(backgroundC) {
      this._backgroundColor = backgroundC;
    },
    get: function get() {
      return this._backgroundColor;
    }
  }, {
    key: "pdfBuffer",
    set: function set(pdfBuffer) {
      this._pdfBuffer = pdfBuffer;
    },
    get: function get() {
      return this._pdfBuffer;
    }
  }, {
    key: "userID",
    set: function set(userID) {
      this._userID = userID;
    },
    get: function get() {
      return this._userID;
    }
  }, {
    key: "fileName",
    set: function set(fileN) {
      this._fileName = fileN;
    },
    get: function get() {
      return this._fileName;
    }
  }]);

  return PdfMaker;
}();

exports["default"] = PdfMaker;
//# sourceMappingURL=pdf.js.map