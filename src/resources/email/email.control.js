import fs from 'fs';
import path from 'path';
import { getByUserID } from '../../services/file.service';
import Dropbox from '../../tools/drop-box/dropbox';
import { getRemoteFileName } from '../../tools/spliter/spliter';

const send = async (req, res, next) => {
  const files = await getByUserID(req.user._id);
  // const files = req.body.files;
  const dropbox = new Dropbox();
  files.forEach(async file => {
    const rFileName = getRemoteFileName(req.user._id, file.name);
    await dropbox.download(rFileName);
    fs.unlink(
      path
        .join(__dirname, '../../tools/drop-box/temporary-files', rFileName)
        .toString(),
      error => {
        if (error) {
          next(error);
        }
      }
    );
  });
  // send email, delete files
  res.status(200).end();
};

export { send };
