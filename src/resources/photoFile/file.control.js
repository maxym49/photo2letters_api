import {
  create,
  canCreate,
  remove,
  getByUserID,
  getById
} from '../../services/file.service';
import OCR from '../../tools/ocr/ocr';
import Dropbox from '../../tools/drop-box/dropbox';

const saveFile = async (req, res, next) => {
  try {
    const cc = await canCreate(req.user, req.body.file);
    if (!cc) res.status(409).end();
    else {
      res.status(201).end();
      const ocr = new OCR();
      ocr.fileName = req.body.file.name;
      ocr.userName = req.user.email;
      await ocr.startRecognize();
      await create(req.user, req.body.file, ocr.text);
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
    const { _id } = req.params;
    const dropbox = new Dropbox();
    const file = await getById(_id);
    if (!file) {
      res.status(404).end();
    } else {
      await dropbox.removeFile(req.user._id, file.name);
      await remove(_id);
      res.status(201).end();
    }
  } catch (error) {
    next(error);
    res.status(500).end();
  }
};

export { saveFile, removeAllFiles, removeSpecificFile };
