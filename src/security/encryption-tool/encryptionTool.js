import crypto from 'crypto';

export default class EncryptionTool {
  constructor() {
    this.init();
  }

  init() {
    this.algorithm = 'aes-256-cbc';
    this.initKey();
    this.initIv();
    this.initIv();
  }

  initKey() {
    this.key = Buffer.alloc(32);
  }

  initIv() {
    this.iv = Buffer.alloc(16);
  }

  encrypt(itemToEncrypt) {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      this.iv
    );
    let encrypted = cipher.update(itemToEncrypt);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: this.iv.toString('hex'),
      encryptedData: encrypted.toString('hex')
    };
  }

  decrypt(itemToDecrypt) {
    const iv_item = Buffer.from(itemToDecrypt.iv, 'hex');
    const encryptedText = Buffer.from(
      itemToDecrypt.encryptedData.toString(),
      'hex'
    );

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.key),
      iv_item
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  set algorithm(algorithm) {
    this._algorithm = algorithm;
  }

  set key(key) {
    this._key = key;
  }

  set iv(iv) {
    this._iv = iv;
  }

  get iv() {
    return this._iv;
  }

  get algorithm() {
    return this._algorithm;
  }

  get key() {
    return this._key;
  }
}
