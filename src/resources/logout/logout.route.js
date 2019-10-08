import express from 'express';
import { logout } from './logout.control';

const router = express.Router();

router.route('/').post(logout);

export default router;
