"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerNewUser = void 0;

var _user = require("../../services/user.service");

var registerNewUser = function registerNewUser(req, res, next) {
  (0, _user.create)(req.body).then(function (createdUser) {
    if (createdUser) res.status(201).json({
      statusMessage: 'User added'
    });else {
      res.status(409).end();
    }
  })["catch"](function (error) {
    return next(error);
  });
};

exports.registerNewUser = registerNewUser;
//# sourceMappingURL=register.control.js.map