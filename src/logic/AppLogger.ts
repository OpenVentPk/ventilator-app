//config.js
import { logger, configLoggerType } from 'react-native-logs';
import { rnFsFileAsync } from 'react-native-logs/dist/transports/rnFsFileAsync';
import { ansiColorConsoleSync } from 'react-native-logs/dist/transports/ansiColorConsoleSync';
import * as RNFS from 'react-native-fs';
import { getDirectoryPath, getTimestampedFileName } from '../utils/FileUtils';

console.log('starting global logger');
const directorySubfolder: string = 'app-logs';
const logDirectory: string = getDirectoryPath(directorySubfolder);
const logFile: string = getTimestampedFileName();
RNFS.mkdir(logDirectory);

const config: configLoggerType = {
  transport: (msg, level, options) => {
    ansiColorConsoleSync(msg, level, options);
    rnFsFileAsync(msg, level, {
      loggerName: logFile,
      loggerPath: logDirectory,
    });
  },
};

var log = logger.createLogger(config);

if (__DEV__) {
  log.setSeverity('debug');
} else {
  log.setSeverity('info');
}

export { log };
