import { authenticate } from '../../services/user.service';

const loginUser = async (req, res, next) => {
  req.login(req.user, { session: false }, err => {
    if (err) res.status(500).end();
  });
  const token = await authenticate(req.user).catch(error => next(error));
  token
    ? res.status(200).json({
        token: `Bearer ${token}`
      })
    : res.status(403).end();
};

export { loginUser };
