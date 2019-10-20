import mongoose from 'mongoose';
import log from '../../tools/console/logger';
import { decryptToken } from '../../security/database/db.security';

export const connect = () => {
  mongoose.set('useFindAndModify', false);
  mongoose
    .connect(decryptToken(), {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => {
      log.info('The database is running');
    })
    .catch(error => console.error(error));

  mongoose.connection.on('error', err => {
    log.error(err);
  });
};
