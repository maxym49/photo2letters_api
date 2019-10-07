import mongoose from 'mongoose';
import log from '../../tools/console/logger';

export const connect = () => {
  mongoose.set('useFindAndModify', false);

  mongoose
    .connect(global.gConfig.database, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => {
      log.info(`The database is running on ${process.env.DEV_DATABASE_URL}`);
    })
    .catch(error => console.error(error));

  mongoose.connection.on('error', err => {
    log.error(err);
  });
};
