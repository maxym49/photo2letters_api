import Kit from 'pdfkit';
import fs from 'fs';
import path from 'path';
import log from '../console/logger';
import Dropbox from '../drop-box/dropbox';
import { getRemoteFileName } from '../spliter/spliter';

export default class PdfMaker {
  constructor(name, _id) {
    this.userID = _id;
    this.fileName = getRemoteFileName(_id, name);
    this._doc = new Kit();
    this._filePath = path.join(
      __dirname,
      '/temporary-files',
      `${this.fileName}`
    );
    this._file = fs.createWriteStream(this._filePath);
    this._doc.pipe(this._file);
    this.fontFamily = path.join(__dirname, '/fonts', 'Lato-Regular.ttf');
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
          const dropbox = new Dropbox();
          const fileToUpload = fs.createReadStream(this._filePath.toString());
          dropbox
            .upload(fileToUpload, `${this.fileName}`)
            .then(() => {
              this.pdfBuffer = Buffer.concat(buffers);
              fs.unlink(this._filePath.toString(), err => {
                reject(err);
              });
              resolve(this.pdfBuffer);
            })
            .catch(error => {
              log.error(error);
              reject(error);
            });
        });
      });
    } catch (e) {
      log.error(e);
    }
  }

  set fontFamily(fontF) {
    this._fontFamily = fontF;
    this._doc.font(fontF);
  }

  set fontSize(fontS) {
    this._fontSize = fontS;
    this._doc.fontSize(fontS);
  }

  set backgroudColor(backgroundC) {
    this._backgroundColor = backgroundC;
  }

  set pdfBuffer(pdfBuffer) {
    this._pdfBuffer = pdfBuffer;
  }

  set userID(userID) {
    this._userID = userID;
  }

  set fileName(fileN) {
    this._fileName = fileN;
  }

  get fontFamily() {
    return this._fontFamily;
  }

  get fontSize() {
    return this._fontSize;
  }

  get backgroudColor() {
    return this._backgroundColor;
  }

  get pdfBuffer() {
    return this._pdfBuffer;
  }

  get userID() {
    return this._userID;
  }

  get fileName() {
    return this._fileName;
  }
}
