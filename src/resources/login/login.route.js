import express from 'express';
import passport from 'passport';
import { loginUser } from './login.control';

const router = express.Router();

router
  .route('/')
  .post(passport.authenticate('local', { session: false }), loginUser);

export default router;
