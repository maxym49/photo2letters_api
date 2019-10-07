import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './config/database/db';
import registerRouter from './resources/register/register.route';
import loginRouter from './resources/login/login.route';
import logoutRouter from './resources/logout/logout.route';
import photoFilesRouter from './resources/photoFile/file.route';
import { useAllStrategies } from './config/authentication/passportStrategies';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();
const app = express();

// App middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Passport middlewares
useAllStrategies();

// Database connection
connect();

// App routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/photoFiles', photoFilesRouter);
app.use(errorHandler);

module.exports = app;
