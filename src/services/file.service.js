import File from '../common-models/file';
import log from '../tools/console/logger';
import PdfMaker from '../tools/pdf-maker/pdf';

const getByUserID = async user_id => await File.find({ user_id });

const getById = async id => {
  return await File.findById(id).select('-hash');
};

const create = async ({ _id, email }, { name, fileType, text }) => {
  const userFiles = await getByUserID(_id);
  const nameExists = userFiles.find(
    file =>
      file.name === name && file.fileType.toString() === fileType.toString()
  );

  if (nameExists) {
    log.warn(
      `User with email ${email} is trying to create same file name - ${name}`
    );
    return false;
  }

  const maker = new PdfMaker(name);
  maker.writeLine(text);
  await maker.save();

  const newFile = new File({
    user_id: _id,
    name,
    fileType,
    fileBuffer: maker.bufferString
  });

  await newFile.save().catch(error => console.error(error));
  return true;
};

const remove = async id => {
  await File.findByIdAndRemove(id);
};

export { getByUserID, getById, create, remove };
