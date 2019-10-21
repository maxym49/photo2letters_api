import fs from 'fs';
import path from 'path';
import EncryptionTool from '../encryption-tool/encryptionTool';

const decryptToken = () => {
  const data = fs.readFileSync(
    path.join(__dirname, '../../../tokens/database-token', 'token.json')
  );
  const jsonFile = JSON.parse(data);
  const et = new EncryptionTool();
  return et.decrypt(jsonFile.token);
};

const encryptToken = token => {
  const et = new EncryptionTool();
  return et.encrypt(token);
};

export { decryptToken, encryptToken };
