import express from 'express';
import { jwtAuth } from '../../middlewares/auth';
import { send } from './email.control';

const router = express.Router();

router.route('/').post(jwtAuth, send);

export default router;
