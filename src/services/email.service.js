import Email from '../common-models/email';

const getById = async id => {
  return await Email.findById(id);
};

const getByUserId = async user_id => {
  return await Email.find({ user_id });
};

const canCreate = async ({ _id }) => {
  const emailDataExists = await getByUserId(_id);
  if (emailDataExists.length) return false;
  else return true;
};

const create = async ({ _id }, { value, selectedFiles }) => {
  const newUser = new Email({
    user_id: _id,
    value,
    selectedFiles
  });
  await newUser.save();
};

const update = async ({ _id }, emailObj) => {
  const currentEmail = await getByUserId(_id);
  Object.assign(currentEmail, emailObj);
  await Email.updateOne({
    value: currentEmail.value,
    selectedFiles: currentEmail.selectedFiles
  });
};

export { getById, getByUserId, canCreate, create, update };
