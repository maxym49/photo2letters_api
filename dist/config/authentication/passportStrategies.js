"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAllStrategies = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../../common-models/user"));

var _secret = require("../../security/tokens/secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: (0, _secret.decryptSecret)()
};

var validate = function validate(payload, done) {
  _user["default"].findById(payload._id.toString(), function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
};

var useAllStrategies = function useAllStrategies() {
  // "passport local mongoose plugin" allows you to use method createStrategy()
  _passport["default"].use(_user["default"].createStrategy());

  _passport["default"].use(new _passportJwt.Strategy(config, validate));
};

exports.useAllStrategies = useAllStrategies;
//# sourceMappingURL=passportStrategies.js.map