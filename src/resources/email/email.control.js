import fs from 'fs';
import path from 'path';
import { getByUserID } from '../../services/file.service';
import { canCreate, create, update } from '../../services/email.service';
import Dropbox from '../../tools/drop-box/dropbox';
import { getRemoteFileName } from '../../tools/spliter/spliter';
import Sender from '../../tools/email-sender/sender';
import { SUBJECT_TEXT } from '../../tools/constatns/email';
import log from '../../tools/console/logger';

const send = async (req, res, next) => {
  try {
    await prepareToSend(req.user, req.body);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const prepareToSend = async (user, body) => {
  try {
    const cc = await canCreate(user._id);
    const _id = user._id;
    if (cc) await create(user, body.emailObj);
    else await update(user, body.emailObj);

    const files = await getByUserID(_id);
    const { selectedFiles } = body.emailObj;
    const sFiles = [];
    files.forEach(file => {
      selectedFiles.forEach(sFile => {
        if (sFile._id === file._id.toString()) {
          sFiles.push(file);
        }
      });
    });

    connectDropbox(sFiles, _id).then(async () => {
      const attachments = fillAttachments(sFiles, _id);
      await setAndSend(body.emailObj, attachments, sFiles, _id);
    });
  } catch (error) {
    log.error(error);
  }
};

const removeFiles = async (files, _id) => {
  await files.forEach(async file => {
    const rFileName = getRemoteFileName(_id, file.name);
    fs.unlink(
      path
        .join(__dirname, '../../tools/drop-box/temporary-files', rFileName)
        .toString(),
      error => {
        if (error) {
          log.error(error);
        }
      }
    );
  });
};

const connectDropbox = async (files, _id) => {
  return new Promise(resolve => {
    const dropbox = new Dropbox();
    downloadFiles(files, _id, dropbox)
      .then(df => {
        df.forEach((file, index) => {
          if (index === df.length - 1) {
            file.then(() => resolve());
          }
        });
      })
      .catch(error => {
        log.error(error);
      });
  });
};

const downloadFiles = async (files, _id, dropbox) => {
  return await files.map(async (file, index) => {
    try {
      const rFileName = getRemoteFileName(_id, file.name);
      await dropbox.download(rFileName);
      return index;
    } catch (error) {
      log.error(error);
    }
  });
};

const fillAttachments = (files, _id) => {
  const attachments = [];
  files.forEach(file => {
    const rFileName = getRemoteFileName(_id, file.name);
    const filePath = path.join(
      __dirname,
      '../../tools/drop-box/temporary-files',
      rFileName
    );
    const fileToAdd = {
      filename: `${file.name}.pdf`,
      path: filePath
    };
    attachments.push(fileToAdd);
  });
  return attachments;
};

const setAndSend = async ({ value }, attachments, files, _id) => {
  return new Promise(resolve => {
    const sender = new Sender();
    sender.subject = SUBJECT_TEXT;
    sender.userEmail = value;
    sender.attachments = attachments;
    sender
      .init()
      .then(() => {
        sender.sendMail().then(async () => {
          await removeFiles(files, _id);
        });
      })
      .catch(error => log.error(error));
    resolve();
  });
};

export { send, prepareToSend };
