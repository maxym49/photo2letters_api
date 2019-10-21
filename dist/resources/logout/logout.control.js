"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = void 0;

var logout = function logout(req, res, next) {
  try {
    req.logout();
    res.status(200).json({
      message: 'logout success'
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = logout;
//# sourceMappingURL=logout.control.js.map