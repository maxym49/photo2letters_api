import express from 'express';
import { jwtAuth } from '../../middlewares/auth';
import { saveFile, removeAllFiles, removeSpecificFile } from './file.control';

const router = express.Router();

router
  .route('/')
  .post(jwtAuth, saveFile)
  .delete(jwtAuth, removeAllFiles);

router.route('/:_id').delete(jwtAuth, removeSpecificFile);

export default router;
