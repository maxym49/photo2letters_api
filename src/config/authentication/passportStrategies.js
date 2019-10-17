import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../../common-models/user';
import { decryptSecret } from '../../../security/tokens/secret';

const config = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: decryptSecret()
};

const validate = (payload, done) => {
  User.findById(payload._id.toString(), (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
};

const useAllStrategies = () => {
  // "passport local mongoose plugin" allows you to use method createStrategy()
  passport.use(User.createStrategy());
  passport.use(new Strategy(config, validate));
};

export { useAllStrategies };
