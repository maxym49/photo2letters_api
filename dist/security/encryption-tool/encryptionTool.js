"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EncryptionTool =
/*#__PURE__*/
function () {
  function EncryptionTool() {
    _classCallCheck(this, EncryptionTool);

    this.init();
  }

  _createClass(EncryptionTool, [{
    key: "init",
    value: function init() {
      this.algorithm = 'aes-256-cbc';
      this.initKey();
      this.initIv();
      this.initIv();
    }
  }, {
    key: "initKey",
    value: function initKey() {
      this.key = Buffer.alloc(32);
    }
  }, {
    key: "initIv",
    value: function initIv() {
      this.iv = Buffer.alloc(16);
    }
  }, {
    key: "encrypt",
    value: function encrypt(itemToEncrypt) {
      var cipher = _crypto["default"].createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);

      var encrypted = cipher.update(itemToEncrypt);
      encrypted = Buffer.concat([encrypted, cipher["final"]()]);
      return {
        iv: this.iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
      };
    }
  }, {
    key: "decrypt",
    value: function decrypt(itemToDecrypt) {
      var iv_item = Buffer.from(itemToDecrypt.iv, 'hex');
      var encryptedText = Buffer.from(itemToDecrypt.encryptedData.toString(), 'hex');

      var decipher = _crypto["default"].createDecipheriv(this.algorithm, Buffer.from(this.key), iv_item);

      var decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher["final"]()]);
      return decrypted.toString();
    }
  }, {
    key: "algorithm",
    set: function set(algorithm) {
      this._algorithm = algorithm;
    },
    get: function get() {
      return this._algorithm;
    }
  }, {
    key: "key",
    set: function set(key) {
      this._key = key;
    },
    get: function get() {
      return this._key;
    }
  }, {
    key: "iv",
    set: function set(iv) {
      this._iv = iv;
    },
    get: function get() {
      return this._iv;
    }
  }]);

  return EncryptionTool;
}();

exports["default"] = EncryptionTool;
//# sourceMappingURL=encryptionTool.js.map