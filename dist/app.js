"use strict";

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _db = require("./config/database/db");

var _register = _interopRequireDefault(require("./resources/register/register.route"));

var _login = _interopRequireDefault(require("./resources/login/login.route"));

var _logout = _interopRequireDefault(require("./resources/logout/logout.route"));

var _file = _interopRequireDefault(require("./resources/photoFile/file.route"));

var _email = _interopRequireDefault(require("./resources/email/email.route"));

var _information = _interopRequireDefault(require("./resources/information/information.route"));

var _passportStrategies = require("./config/authentication/passportStrategies");

var _errorHandler = require("./middlewares/errorHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // App middlewares

app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])()); // Passport middlewares

(0, _passportStrategies.useAllStrategies)(); // Database connection

(0, _db.connect)(); // App routes

app.use('/register', _register["default"]);
app.use('/login', _login["default"]);
app.use('/logout', _logout["default"]);
app.use('/photoFiles', _file["default"]);
app.use('/email', _email["default"]);
app.use('/information', _information["default"]);
app.use(_errorHandler.errorHandler);
module.exports = app;
//# sourceMappingURL=app.js.map