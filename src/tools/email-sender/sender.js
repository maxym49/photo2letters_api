import nm from 'nodemailer';
import fs from 'fs';
import path from 'path';
import log from '../console/logger';
import { decryptEmailData } from '../../../security/email-sender/email.security';

export default class Sender {
  constructor() {
    this.subject = '';
    this.userEmail = '';
  }

  async init() {
    await this.readHtmlFile();
    this.initTransport();
    this.initMessage();
  }

  initTransport() {
    this.transport = nm.createTransport({
      host: decryptEmailData('host'),
      port: decryptEmailData('port'),
      secure: true,
      auth: {
        user: decryptEmailData('user'),
        pass: decryptEmailData('pass')
      }
    });
  }

  initMessage() {
    this.message = {
      from: decryptEmailData('user'),
      to: this.userEmail,
      subject: this.subject,
      html: this.htmlFile,
      attachments: this.attachments
    };
  }

  readHtmlFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '/templates', 'eng_template.html'),
        (err, data) => {
          if (err) {
            log.error(err);
            reject(err);
          } else {
            this.htmlFile = data.toString();
            resolve(data);
          }
        }
      );
    });
  }

  sendMail() {
    return new Promise((resolve, reject) => {
      this.transport.sendMail(this.message, err => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          log.info(`Mail has been sent to ${this.userEmail}`);
          resolve();
        }
      });
    });
  }

  set transport(transport) {
    this._transport = transport;
  }

  set message(message) {
    this._message = message;
  }

  set userEmail(userEmail) {
    this._userEmail = userEmail;
  }

  set subject(subject) {
    this._subject = subject;
  }

  set htmlFile(htmlFile) {
    this._htmlFile = htmlFile;
  }

  set attachments(attachments) {
    this._attachments = attachments;
  }

  get transport() {
    return this._transport;
  }

  get message() {
    return this._message;
  }

  get subject() {
    return this._subject;
  }

  get htmlFile() {
    return this._htmlFile;
  }

  get userEmail() {
    return this._userEmail;
  }

  get attachments() {
    return this._attachments;
  }
}
