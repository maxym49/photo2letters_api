import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import indexRouter from './routes/index';

dotenv.config();
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(`${process.env.DEV_DATABASE_URL}`, { useUnifiedTopology: true })
  .then(() => {
    console.info(`The database is running on ${process.env.DEV_DATABASE_URL}`);
  })
  .catch(error => console.error(error));

mongoose.connection.on('error', err => {
  console.error(err);
});

app.use('/', indexRouter);

module.exports = app;
