import { create } from '../../services/user.service';

const registerNewUser = (req, res, next) => {
  create(req.body)
    .then(createdUser => {
      if (createdUser)
        res.status(201).json({
          statusMessage: 'User added'
        });
      else {
        res.status(409).end();
      }
    })
    .catch(error => next(error));
};

export { registerNewUser };
