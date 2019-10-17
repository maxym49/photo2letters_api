import fs from 'fs';
import File from '../common-models/file';
import log from '../tools/console/logger';
import PdfMaker from '../tools/pdf-maker/pdf';

const getByUserID = async user_id => await File.find({ user_id });

const getById = async id => {
  return await File.findById(id);
};

const canCreate = async ({ _id, email }, name) => {
  const userFiles = await getByUserID(_id);
  const nameExists = userFiles.find(file => file.name === name);

  if (nameExists) {
    log.warn(
      `User with email ${email} is trying to create same file name - ${name}`
    );
    return false;
  }
  return true;
};

const create = async ({ _id }, name, text, fileType = 1) => {
  const maker = new PdfMaker(name, _id);
  maker.writeLine(text);
  await maker.save();

  const newFile = new File({
    user_id: _id,
    name,
    fileType
    // fileBuffer: maker.pdfBuffer
  });

  await newFile.save().catch(error => log.error(error));
};

const remove = async id => {
  await File.findByIdAndRemove(id);
};

const openFile = async ({ _id }) => {
  const files = await getByUserID(_id);
  files.forEach(file => {
    fs.writeFileSync(`${__dirname}/${file.name}.pdf`, file.fileBuffer);
    log.info(`File [${file.name}] has been saved as pdf`);
  });
};

export { getByUserID, getById, canCreate, create, remove, openFile };
