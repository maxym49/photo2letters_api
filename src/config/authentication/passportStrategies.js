import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../../common-models/user';

const config = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: global.gConfig.secret
};

const validate = (payload, done) => {
  User.findOne({ id: payload.sub }, (err, user) => {
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
