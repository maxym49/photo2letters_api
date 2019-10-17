import { getByUserID } from '../../../services/file.service';

const savedFiles = async (req, res, next) => {
  try {
    const files = await getByUserID(req.user._id);
    if (!files) res.status(404).end();
    else {
      res.status(200).json({
        files
      });
    }
  } catch (error) {
    next(error);
  }
};

export { savedFiles };
