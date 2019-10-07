import Kit from 'pdfkit';
import fs from 'fs';
import path from 'path';
import log from '../console/logger';

export default class PdfMaker {
  constructor(name) {
    this._doc = new Kit();
    this._filePath = path.join(__dirname, '/temporary-files', `${name}.pdf`);
    this._file = fs.createWriteStream(this._filePath);
    this._doc.pipe(this._file);
    this.fontSize = 12;
  }

  writeLine(text) {
    this._doc.text(text);
  }

  addPage() {
    this._doc.addPage();
  }

  async save() {
    try {
      return new Promise((resolve, reject) => {
        this._doc.save();
        this._doc.end();
        const buffers = [];
        this._doc.on('data', chunk => buffers.push(chunk));
        this._doc.on('end', () => {
          this.bufferString = Buffer.concat(buffers).toString();
          fs.unlink(this._filePath.toString(), err => {
            reject(err);
          });
          resolve(this.bufferString);
        });
      });
    } catch (e) {
      log.error(e);
    }
  }

  set fontFamily(fontF) {
    this._fontFamily = fontF;
  }

  set fontSize(fontS) {
    this._fontSize = fontS;
  }

  set backgroudColor(backgroundC) {
    this._backgroundColor = backgroundC;
  }

  set bufferString(bufferS) {
    this._bufferString = bufferS;
  }

  get fontFamily() {
    return this._fontFamily.value;
  }

  get fontSize() {
    return this._fontSize;
  }

  get backgroudColor() {
    return this._backgroundColor;
  }

  get bufferString() {
    return this._bufferString;
  }
}
