import {
  create,
  canCreate,
  remove,
  getByUserID
} from '../../services/file.service';
import OCR from '../../tools/ocr/ocr';
import Dropbox from '../../tools/drop-box/dropbox';

const saveFile = async (req, res, next) => {
  try {
    const { fileName } = req.body;
    const cc = await canCreate(req.user, fileName);
    if (!cc) res.status(409).end();
    else {
      res.status(201).end();
      const ocr = new OCR();
      ocr.fileName = fileName;
      ocr.userName = req.user.email;
      ocr.image = req.body.image.base64;
      console.info(req.body.image.base64);
      await ocr.startRecognize();
      await create(req.user, fileName, ocr.text);
    }
  } catch (error) {
    next(error);
  }
};

const removeAllFiles = async (req, res, next) => {
  try {
    const files = await getByUserID(req.user);
    files.forEach(async file => {
      const dropbox = new Dropbox();
      await dropbox.removeFile(req.user._id, file.name);
      await remove(file._id);
    });
    res.status(201).end();
  } catch (error) {
    next(error);
    res.status(500).end();
  }
};

const removeSpecificFile = async (req, res, next) => {
  try {
    const { filesToRemove } = req.body;
    if (!filesToRemove.length) {
      res.status(404).end();
    } else {
      filesToRemove.forEach(async file => {
        const dropbox = new Dropbox();
        await dropbox.removeFile(req.user._id, file.title);
        await remove(file.value);
      });
      res.status(201).end();
    }
  } catch (error) {
    next(error);
    res.status(500).end();
  }
};

export { saveFile, removeAllFiles, removeSpecificFile };
