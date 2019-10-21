"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSpecificFile = exports.removeAllFiles = exports.saveFile = void 0;

var _file = require("../../services/file.service");

var _ocr = _interopRequireDefault(require("../../tools/ocr/ocr"));

var _dropbox = _interopRequireDefault(require("../../tools/drop-box/dropbox"));

var _email = require("../email/email.control");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var saveFile =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var fileName, cc, ocr, file;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            fileName = req.body.fileName;
            _context2.next = 4;
            return (0, _file.canCreate)(req.user, fileName);

          case 4:
            cc = _context2.sent;

            if (cc) {
              _context2.next = 9;
              break;
            }

            res.status(409).end();
            _context2.next = 20;
            break;

          case 9:
            res.status(201).end();
            ocr = new _ocr["default"]();
            ocr.fileName = fileName;
            ocr.userName = req.user.email;
            ocr.image = req.body.image.base64;
            _context2.next = 16;
            return ocr.startRecognize();

          case 16:
            _context2.next = 18;
            return (0, _file.create)(req.user, fileName, ocr.text);

          case 18:
            file = _context2.sent;

            if (req.body.emailObj.value.length) {
              Object.assign(req.body.emailObj, {
                selectedFiles: [{
                  _id: file._id.toString()
                }]
              }); //dropbox despite returing resolved promise needs to have a 1s delay to load up files

              setTimeout(
              /*#__PURE__*/
              _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _email.prepareToSend)(req.user, req.body);

                      case 2:
                        return _context.abrupt("return", _context.sent);

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })), 1000);
            }

          case 20:
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 22]]);
  }));

  return function saveFile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.saveFile = saveFile;

var removeAllFiles =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res, next) {
    var files;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _file.getByUserID)(req.user);

          case 3:
            files = _context4.sent;
            files.forEach(
            /*#__PURE__*/
            function () {
              var _ref4 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee3(file) {
                var dropbox;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        dropbox = new _dropbox["default"]();
                        _context3.next = 3;
                        return dropbox.removeFile(req.user._id, file.name);

                      case 3:
                        _context3.next = 5;
                        return (0, _file.remove)(file._id);

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7) {
                return _ref4.apply(this, arguments);
              };
            }());
            res.status(201).end();
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);
            res.status(500).end();

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function removeAllFiles(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.removeAllFiles = removeAllFiles;

var removeSpecificFile =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res, next) {
    var filesToRemove;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            try {
              filesToRemove = req.body.filesToRemove;

              if (!filesToRemove.length) {
                res.status(404).end();
              } else {
                filesToRemove.forEach(
                /*#__PURE__*/
                function () {
                  var _ref6 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee5(file) {
                    var dropbox;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            dropbox = new _dropbox["default"]();
                            _context5.next = 3;
                            return dropbox.removeFile(req.user._id, file.title);

                          case 3:
                            _context5.next = 5;
                            return (0, _file.remove)(file.value);

                          case 5:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x11) {
                    return _ref6.apply(this, arguments);
                  };
                }());
                res.status(201).end();
              }
            } catch (error) {
              next(error);
              res.status(500).end();
            }

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function removeSpecificFile(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.removeSpecificFile = removeSpecificFile;
//# sourceMappingURL=file.control.js.map