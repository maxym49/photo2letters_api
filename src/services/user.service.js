import jwt from 'jsonwebtoken';
import User from '../common-models/user';
import log from '../tools/console/logger';

const getAll = async () => {
  return await User.find({}).select('-hash');
};

const getById = async id => {
  return await User.findById(id).select('-hash');
};

const getByEmail = async ({ email }) => {
  return await User.findOne({ email });
};

const create = async ({ email, password }) => {
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    log.warn(`User with email ${email}, already exists`);
    return false;
  }
  const newUser = new User({
    email
  });
  User.register(newUser, password);
  return true;
};

const update = async user => {
  const { email, _id } = user;
  const currentUser = await User.findById(_id);
  const emailAlreadyExists = await User.find({ email });
  if (emailAlreadyExists) {
    log.warn(`User with email ${email}, already exists`);
    return false;
  }
  Object.assign(currentUser, user);
  await currentUser.save();
};

const remove = async id => {
  await User.findByIdAndRemove(id);
};

const authenticate = async ({ _id }) => {
  return jwt.sign({ _id: _id }, global.gConfig.secret);
};

export { getAll, getById, getByEmail, create, update, remove, authenticate };
