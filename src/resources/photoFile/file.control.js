import { create, remove, getByUserID } from '../../services/file.service';

const saveFile = (req, res, next) => {
  create(req.user, req.body.file)
    .then(isCreated => {
      if (isCreated)
        res.status(201).json({
          statusMessage: 'File added'
        });
      else res.status(409).end();
    })
    .catch(error => next(error));
};

const removeAllFiles = async (req, res, next) => {
  try {
    const files = await getByUserID(req.user);
    files.forEach(async file => await remove(file._id));
    res.status(201).end();
  } catch (error) {
    next(error);
    res.status(500).end();
  }
};

const removeSpecificFile = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await remove(_id);
    res.status(201).end();
  } catch (error) {
    next(error);
    res.status(500).end();
  }
};

export { saveFile, removeAllFiles, removeSpecificFile };
