import express from 'express';
import { jwtAuth } from '../../middlewares/auth';
import { changePassword, emailModuleData } from './user/user.control';
import { savedFiles } from './files/files.control';

const router = express.Router();

router.route('/user/password').post(jwtAuth, changePassword);

router.route('/user/email').get(jwtAuth, emailModuleData);

router.route('/files/saved').get(jwtAuth, savedFiles);

export default router;
