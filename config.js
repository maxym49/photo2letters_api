import lodash from 'lodash';
import config from './config.json';
import log from './src/tools/console/logger';
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = lodash.merge(defaultConfig, environmentConfig);

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;

log.configInfo(
  `global.gConfig: ${JSON.stringify(
    global.gConfig,
    undefined,
    global.gConfig.json_indentation
  )}`
);
