import dropboxV2Api from 'dropbox-v2-api';
import fs from 'fs';
import path from 'path';
import log from '../console/logger';
import { getRemoteFileName } from '../spliter/spliter';
import { decryptToken } from '../../security/dropbox/dropbox.security';

export default class Dropbox {
  constructor() {
    this.initToken();
    this.initStore();
  }

  async upload(file, name) {
    await this._store(
      {
        resource: 'files/upload',
        parameters: {
          path: `/pdf/${name}`
        },
        readStream: file
      },
      error => {
        if (error) log.error(error);
      }
    );
  }

  download(rFileName) {
    return new Promise((resolve, reject) => {
      this._store(
        {
          resource: 'files/download',
          parameters: {
            path: `/pdf/${rFileName}`
          }
        },
        error => {
          if (error) {
            console.error(error);
            reject(error);
          } else resolve();
        }
      ).pipe(
        fs.createWriteStream(
          path.join(__dirname, '../../../../static/temporary-files', rFileName)
        )
      );
    });
  }

  async removeFile(userID, fileName) {
    const rFileName = getRemoteFileName(userID, fileName);
    await this._store(
      {
        resource: 'files/delete',
        parameters: {
          path: `/pdf/${rFileName}`
        }
      },
      error => {
        if (error) console.error(error);
      }
    );
  }

  initToken() {
    this.token = decryptToken();
  }

  initStore() {
    this.store = dropboxV2Api.authenticate({
      token: this.token
    });
  }

  set store(store) {
    this._store = store;
  }

  set token(token) {
    this._token = token;
  }

  get store() {
    return this._store;
  }

  get token() {
    return this._token;
  }
}
