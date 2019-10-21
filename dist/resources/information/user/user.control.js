"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailModuleData = exports.changePassword = void 0;

var _user = require("../../../services/user.service");

var _email = require("../../../services/email.service");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var changePassword =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _id, password;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _id = req.user._id;
            password = req.body.password;
            _context.next = 5;
            return (0, _user.updatePassword)(password, _id);

          case 5:
            res.status(201).end();
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function changePassword(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.changePassword = changePassword;

var emailModuleData =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var email;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _email.getByUserId)(req.user._id);

          case 3:
            email = _context2.sent;
            if (email) res.status(200).json({
              email: email
            });else res.status(404).end();
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function emailModuleData(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.emailModuleData = emailModuleData;
//# sourceMappingURL=user.control.js.map