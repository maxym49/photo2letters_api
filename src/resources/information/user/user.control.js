import { updatePassword } from '../../../services/user.service';
import { getByUserId } from '../../../services/email.service';

const changePassword = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { password } = req.body;

    await updatePassword(password, _id);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const emailModuleData = async (req, res, next) => {
  try {
    const email = await getByUserId(req.user._id);
    if (email)
      res.status(200).json({
        email
      });
    else res.status(404).end();
  } catch (error) {
    next(error);
  }
};

export { changePassword, emailModuleData };
