import express from 'express';
import { logout } from './logout.control';
import { addJwtToBlackList } from '../../middlewares/auth';

const router = express.Router();

router.route('/').post(addJwtToBlackList, logout);

export default router;
