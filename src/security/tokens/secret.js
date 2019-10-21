import fs from 'fs';
import path from 'path';
import EncryptionTool from '../encryption-tool/encryptionTool';

const decryptSecret = () => {
  const data = fs.readFileSync(
    path.join(__dirname, '../../../tokens/secret-token', 'secret.json')
  );
  const jsonFile = JSON.parse(data);
  const et = new EncryptionTool();
  return et.decrypt(jsonFile.secret);
};

const encryptSecret = secret => {
  const et = new EncryptionTool();
  return et.encrypt(secret);
};

export { decryptSecret, encryptSecret };
