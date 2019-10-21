"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = exports.canCreate = exports.getByUserId = exports.getById = void 0;

var _email = _interopRequireDefault(require("../common-models/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getById =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _email["default"].findById(id);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getById(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getById = getById;

var getByUserId =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(user_id) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _email["default"].find({
              user_id: user_id
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getByUserId(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getByUserId = getByUserId;

var canCreate =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id) {
    var emailDataExists;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getByUserId(id);

          case 2:
            emailDataExists = _context3.sent;

            if (!emailDataExists.length) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", false);

          case 7:
            return _context3.abrupt("return", true);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function canCreate(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.canCreate = canCreate;

var create =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref4, _ref5) {
    var _id, value, selectedFiles, newUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = _ref4._id;
            value = _ref5.value, selectedFiles = _ref5.selectedFiles;
            newUser = new _email["default"]({
              user_id: _id,
              value: value,
              selectedFiles: selectedFiles
            });
            _context4.next = 5;
            return newUser.save();

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function create(_x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.create = create;

var update =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref7, emailObj) {
    var _id, currentEmail;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = _ref7._id;
            _context5.next = 3;
            return getByUserId(_id);

          case 3:
            currentEmail = _context5.sent;
            Object.assign(currentEmail, emailObj);
            _context5.next = 7;
            return _email["default"].updateOne({
              value: currentEmail.value,
              selectedFiles: currentEmail.selectedFiles
            });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function update(_x6, _x7) {
    return _ref8.apply(this, arguments);
  };
}();

exports.update = update;
//# sourceMappingURL=email.service.js.map