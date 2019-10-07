import { red, green, yellow, cyan } from './colors';

export default class Logger {
  constructor() {}

  static info(message) {
    console.info(green, `[information] ${message}`);
  }

  static configInfo(message) {
    console.info(cyan, `[app-config] ${message}`);
  }

  static error(error) {
    const { stack, message } = error;
    console.error(
      red,
      `[error] \nStack:\n${stack}\nMessage:
        ${message}`
    );
  }

  static warn(message) {
    console.warn(yellow, `[warning] ${message}`);
  }
}
