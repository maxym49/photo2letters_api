import { createWorker } from 'tesseract.js';
import log from '../console/logger';
import ProgressBar from 'progress';

export default class OCR {
  constructor() {
    this.initProperties();
  }

  createWorker() {
    const pb = new ProgressBar('[:bar] :percent :etas', { total: 100 });
    this._worker = createWorker({
      logger: m => {
        pb.tick(m.progress, 1);
      }
    });
  }

  async startRecognize() {
    log.configInfo(
      `User [${this._userName}] has started converting file [${this._fileName}]`
    );
    await this._worker.load();
    await this._worker.loadLanguage(this._language);
    await this._worker.initialize(this._language);
    const {
      data: { text }
    } = await this._worker.recognize(Buffer.from(this.image, 'base64'));
    this.text = text;
    await this._worker.terminate();
    console.info();
    log.configInfo(
      `User [${this._userName}] has ended converting file [${this._fileName}]`
    );
  }

  initProperties() {
    this.language = 'pol';
    this.text = '';
    this.userName = '';
    this.fileName = '';
    this.image = '';
    this.createWorker();
  }

  set language(language) {
    this._language = language;
  }

  set text(text) {
    this._text = text;
  }

  set image(image) {
    this._image = image;
  }

  set fileName(fileN) {
    this._fileName = fileN;
  }

  set userName(userN) {
    this._userName = userN;
  }

  get language() {
    return this._language;
  }

  get text() {
    return this._text;
  }

  get image() {
    return this._image;
  }

  get fileName() {
    return this._fileName;
  }

  get userName() {
    return this._userName;
  }
}
