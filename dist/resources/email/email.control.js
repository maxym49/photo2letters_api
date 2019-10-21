"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareToSend = exports.send = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _file = require("../../services/file.service");

var _email = require("../../services/email.service");

var _dropbox = _interopRequireDefault(require("../../tools/drop-box/dropbox"));

var _spliter = require("../../tools/spliter/spliter");

var _sender = _interopRequireDefault(require("../../tools/email-sender/sender"));

var _email2 = require("../../tools/constatns/email");

var _logger = _interopRequireDefault(require("../../tools/console/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var send =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return prepareToSend(req.user, req.body);

          case 3:
            res.status(201).end();
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function send(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.send = send;

var prepareToSend =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(user, body) {
    var cc, _id, files, selectedFiles, sFiles;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _email.canCreate)(user._id);

          case 3:
            cc = _context3.sent;
            _id = user._id;

            if (!cc) {
              _context3.next = 10;
              break;
            }

            _context3.next = 8;
            return (0, _email.create)(user, body.emailObj);

          case 8:
            _context3.next = 12;
            break;

          case 10:
            _context3.next = 12;
            return (0, _email.update)(user, body.emailObj);

          case 12:
            _context3.next = 14;
            return (0, _file.getByUserID)(_id);

          case 14:
            files = _context3.sent;
            selectedFiles = body.emailObj.selectedFiles;
            sFiles = [];
            files.forEach(function (file) {
              selectedFiles.forEach(function (sFile) {
                if (sFile._id === file._id.toString()) {
                  sFiles.push(file);
                }
              });
            });
            connectDropbox(sFiles, _id).then(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee2() {
              var attachments;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      attachments = fillAttachments(sFiles, _id);
                      _context2.next = 3;
                      return setAndSend(body.emailObj, attachments, sFiles, _id);

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            })));
            _context3.next = 24;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](0);

            _logger["default"].error(_context3.t0);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 21]]);
  }));

  return function prepareToSend(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.prepareToSend = prepareToSend;

var removeFiles =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(files, _id) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return files.forEach(
            /*#__PURE__*/
            function () {
              var _ref5 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4(file) {
                var rFileName;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        rFileName = (0, _spliter.getRemoteFileName)(_id, file.name);

                        _fs["default"].unlink(_path["default"].join(__dirname, '../../tools/drop-box/temporary-files', rFileName).toString(), function (error) {
                          if (error) {
                            _logger["default"].error(error);
                          }
                        });

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x8) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function removeFiles(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var connectDropbox =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(files, _id) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise(function (resolve) {
              var dropbox = new _dropbox["default"]();
              downloadFiles(files, _id, dropbox).then(function (df) {
                df.forEach(function (file, index) {
                  if (index === df.length - 1) {
                    file.then(function () {
                      return resolve();
                    });
                  }
                });
              })["catch"](function (error) {
                _logger["default"].error(error);
              });
            }));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function connectDropbox(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

var downloadFiles =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(files, _id, dropbox) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return files.map(
            /*#__PURE__*/
            function () {
              var _ref8 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee7(file, index) {
                var rFileName;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        rFileName = (0, _spliter.getRemoteFileName)(_id, file.name);
                        _context7.next = 4;
                        return dropbox.download(rFileName);

                      case 4:
                        return _context7.abrupt("return", index);

                      case 7:
                        _context7.prev = 7;
                        _context7.t0 = _context7["catch"](0);

                        _logger["default"].error(_context7.t0);

                      case 10:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, null, [[0, 7]]);
              }));

              return function (_x14, _x15) {
                return _ref8.apply(this, arguments);
              };
            }());

          case 2:
            return _context8.abrupt("return", _context8.sent);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function downloadFiles(_x11, _x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

var fillAttachments = function fillAttachments(files, _id) {
  var attachments = [];
  files.forEach(function (file) {
    var rFileName = (0, _spliter.getRemoteFileName)(_id, file.name);

    var filePath = _path["default"].join(__dirname, '../../tools/drop-box/temporary-files', rFileName);

    var fileToAdd = {
      filename: "".concat(file.name, ".pdf"),
      path: filePath
    };
    attachments.push(fileToAdd);
  });
  return attachments;
};

var setAndSend =
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(_ref9, attachments, files, _id) {
    var value;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            value = _ref9.value;
            return _context10.abrupt("return", new Promise(function (resolve) {
              var sender = new _sender["default"]();
              sender.subject = _email2.SUBJECT_TEXT;
              sender.userEmail = value;
              sender.attachments = attachments;
              sender.init().then(function () {
                sender.sendMail().then(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee9() {
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return removeFiles(files, _id);

                        case 2:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                })));
              })["catch"](function (error) {
                return _logger["default"].error(error);
              });
              resolve();
            }));

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function setAndSend(_x16, _x17, _x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();
//# sourceMappingURL=email.control.js.map