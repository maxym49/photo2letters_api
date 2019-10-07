import passport from 'passport';

const jwtAuth = (req, res, next) => {
  return passport.authenticate('jwt', { session: false })(req, res, next);
};

export { jwtAuth };
