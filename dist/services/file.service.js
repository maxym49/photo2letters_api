"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openFile = exports.remove = exports.create = exports.canCreate = exports.getById = exports.getByUserID = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _file = _interopRequireDefault(require("../common-models/file"));

var _logger = _interopRequireDefault(require("../tools/console/logger"));

var _pdf = _interopRequireDefault(require("../tools/pdf-maker/pdf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getByUserID =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(user_id) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _file["default"].find({
              user_id: user_id
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getByUserID(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getByUserID = getByUserID;

var getById =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _file["default"].findById(id);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getById = getById;

var canCreate =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3, name) {
    var _id, email, userFiles, nameExists;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = _ref3._id, email = _ref3.email;
            _context3.next = 3;
            return getByUserID(_id);

          case 3:
            userFiles = _context3.sent;
            nameExists = userFiles.find(function (file) {
              return file.name === name;
            });

            if (!nameExists) {
              _context3.next = 8;
              break;
            }

            _logger["default"].warn("User with email ".concat(email, " is trying to create same file name - ").concat(name));

            return _context3.abrupt("return", false);

          case 8:
            return _context3.abrupt("return", true);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function canCreate(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.canCreate = canCreate;

var create =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref5, name, text) {
    var _id,
        fileType,
        maker,
        newFile,
        _args4 = arguments;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = _ref5._id;
            fileType = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : 1;
            _context4.prev = 2;
            maker = new _pdf["default"](name, _id);
            maker.writeLine(text);
            _context4.next = 7;
            return maker.save();

          case 7:
            newFile = new _file["default"]({
              user_id: _id,
              name: name,
              fileType: fileType // fileBuffer: maker.pdfBuffer

            });
            _context4.next = 10;
            return newFile.save();

          case 10:
            return _context4.abrupt("return", _context4.sent);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](2);

            _logger["default"].error(_context4.t0);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 13]]);
  }));

  return function create(_x5, _x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();

exports.create = create;

var remove =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(id) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _file["default"].findByIdAndRemove(id);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function remove(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

exports.remove = remove;

var openFile =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref8) {
    var _id, files;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _id = _ref8._id;
            _context6.next = 3;
            return getByUserID(_id);

          case 3:
            files = _context6.sent;
            files.forEach(function (file) {
              _fs["default"].writeFileSync("".concat(__dirname, "/").concat(file.name, ".pdf"), file.fileBuffer);

              _logger["default"].info("File [".concat(file.name, "] has been saved as pdf"));
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function openFile(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

exports.openFile = openFile;
//# sourceMappingURL=file.service.js.map