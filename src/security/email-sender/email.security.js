import fs from 'fs';
import path from 'path';
import EncryptionTool from '../encryption-tool/encryptionTool';

const decryptEmailData = type => {
  const data = fs.readFileSync(
    path.join(__dirname, '../../../tokens/email-token', 'email.json')
  );
  const jsonFile = JSON.parse(data);
  const et = new EncryptionTool();
  switch (type) {
    case 'host':
      return et.decrypt(jsonFile.host);
    case 'port':
      return et.decrypt(jsonFile.port);
    case 'user':
      return et.decrypt(jsonFile.user);
    case 'pass':
      return et.decrypt(jsonFile.pass);
  }
};

const encryptEmailData = emailData => {
  const et = new EncryptionTool();
  return et.encrypt(emailData);
};

export { decryptEmailData, encryptEmailData };
