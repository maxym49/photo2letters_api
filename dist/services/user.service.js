"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = exports.remove = exports.updatePassword = exports.update = exports.create = exports.getByEmail = exports.getById = exports.getAll = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../common-models/user"));

var _logger = _interopRequireDefault(require("../tools/console/logger"));

var _secret = require("../security/tokens/secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAll =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find({}).select('-hash');

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAll() {
    return _ref.apply(this, arguments);
  };
}();

exports.getAll = getAll;

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
            return _user["default"].findById(id).select('-hash');

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getById(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getById = getById;

var getByEmail =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var email;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = _ref3.email;
            _context3.next = 3;
            return _user["default"].findOne({
              email: email
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getByEmail(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getByEmail = getByEmail;

var create =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref5) {
    var email, password, userAlreadyExists, newUser;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            email = _ref5.email, password = _ref5.password;
            _context4.next = 3;
            return _user["default"].findOne({
              email: email
            });

          case 3:
            userAlreadyExists = _context4.sent;

            if (!userAlreadyExists) {
              _context4.next = 7;
              break;
            }

            _logger["default"].warn("User with email ".concat(email, ", already exists"));

            return _context4.abrupt("return", false);

          case 7:
            newUser = new _user["default"]({
              email: email
            });

            _user["default"].register(newUser, password);

            return _context4.abrupt("return", true);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function create(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.create = create;

var update =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(user) {
    var email, _id, currentUser, emailAlreadyExists;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            email = user.email, _id = user._id;
            _context5.next = 3;
            return _user["default"].findById(_id);

          case 3:
            currentUser = _context5.sent;
            _context5.next = 6;
            return _user["default"].find({
              email: email
            });

          case 6:
            emailAlreadyExists = _context5.sent;

            if (!emailAlreadyExists) {
              _context5.next = 10;
              break;
            }

            _logger["default"].warn("User with email ".concat(email, ", already exists"));

            return _context5.abrupt("return", false);

          case 10:
            Object.assign(currentUser, user);
            _context5.next = 13;
            return currentUser.save();

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function update(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

exports.update = update;

var updatePassword =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(password, _id) {
    var currentUser;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _user["default"].findById(_id);

          case 2:
            currentUser = _context7.sent;
            if (currentUser) currentUser.setPassword(password,
            /*#__PURE__*/
            function () {
              var _ref9 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee6(error) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        if (!error) {
                          _context6.next = 4;
                          break;
                        }

                        _logger["default"].error(error);

                        _context6.next = 6;
                        break;

                      case 4:
                        _context6.next = 6;
                        return currentUser.save();

                      case 6:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x7) {
                return _ref9.apply(this, arguments);
              };
            }());

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function updatePassword(_x5, _x6) {
    return _ref8.apply(this, arguments);
  };
}();

exports.updatePassword = updatePassword;

var remove =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(id) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _user["default"].findByIdAndRemove(id);

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function remove(_x8) {
    return _ref10.apply(this, arguments);
  };
}();

exports.remove = remove;

var authenticate =
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(_ref11) {
    var _id;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _id = _ref11._id;
            return _context9.abrupt("return", _jsonwebtoken["default"].sign({
              _id: _id
            }, (0, _secret.decryptSecret)()));

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function authenticate(_x9) {
    return _ref12.apply(this, arguments);
  };
}();

exports.authenticate = authenticate;
//# sourceMappingURL=user.service.js.map