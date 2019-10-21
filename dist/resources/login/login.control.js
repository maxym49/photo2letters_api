"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = void 0;

var _user = require("../../services/user.service");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loginUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.login(req.user, {
              session: false
            }, function (err) {
              if (err) res.status(500).end();
            });
            _context.next = 3;
            return (0, _user.authenticate)(req.user)["catch"](function (error) {
              return next(error);
            });

          case 3:
            token = _context.sent;
            token ? res.status(200).json({
              token: "Bearer ".concat(token)
            }) : res.status(403).end();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loginUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.loginUser = loginUser;
//# sourceMappingURL=login.control.js.map