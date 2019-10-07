import express from 'express';
import { registerNewUser } from './register.control';

const router = express.Router();

router.route('/').post(registerNewUser);

export default router;
