"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dropboxV2Api = _interopRequireDefault(require("dropbox-v2-api"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _logger = _interopRequireDefault(require("../console/logger"));

var _spliter = require("../spliter/spliter");

var _dropbox = require("../../security/dropbox/dropbox.security");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dropbox =
/*#__PURE__*/
function () {
  function Dropbox() {
    _classCallCheck(this, Dropbox);

    this.initToken();
    this.initStore();
  }

  _createClass(Dropbox, [{
    key: "upload",
    value: function () {
      var _upload = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(file, name) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._store({
                  resource: 'files/upload',
                  parameters: {
                    path: "/pdf/".concat(name)
                  },
                  readStream: file
                }, function (error) {
                  if (error) _logger["default"].error(error);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function upload(_x, _x2) {
        return _upload.apply(this, arguments);
      }

      return upload;
    }()
  }, {
    key: "download",
    value: function download(rFileName) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._store({
          resource: 'files/download',
          parameters: {
            path: "/pdf/".concat(rFileName)
          }
        }, function (error) {
          if (error) {
            console.error(error);
            reject(error);
          } else resolve();
        }).pipe(_fs["default"].createWriteStream(_path["default"].join(__dirname, '../../../static/temporary-files', rFileName)));
      });
    }
  }, {
    key: "removeFile",
    value: function () {
      var _removeFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(userID, fileName) {
        var rFileName;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rFileName = (0, _spliter.getRemoteFileName)(userID, fileName);
                _context2.next = 3;
                return this._store({
                  resource: 'files/delete',
                  parameters: {
                    path: "/pdf/".concat(rFileName)
                  }
                }, function (error) {
                  if (error) console.error(error);
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeFile(_x3, _x4) {
        return _removeFile.apply(this, arguments);
      }

      return removeFile;
    }()
  }, {
    key: "initToken",
    value: function initToken() {
      this.token = (0, _dropbox.decryptToken)();
    }
  }, {
    key: "initStore",
    value: function initStore() {
      this.store = _dropboxV2Api["default"].authenticate({
        token: this.token
      });
    }
  }, {
    key: "store",
    set: function set(store) {
      this._store = store;
    },
    get: function get() {
      return this._store;
    }
  }, {
    key: "token",
    set: function set(token) {
      this._token = token;
    },
    get: function get() {
      return this._token;
    }
  }]);

  return Dropbox;
}();

exports["default"] = Dropbox;
//# sourceMappingURL=dropbox.js.map