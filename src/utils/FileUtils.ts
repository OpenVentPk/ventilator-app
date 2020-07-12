import * as RNFS from 'react-native-fs';

const appDirectory: string = RNFS.DownloadDirectoryPath.replace(
  'Download',
  'OpenVentPk',
);
const nowTimeStamp: string = new Date().toISOString().replace(/\.|:/g, '-');

export function createDirectory(directoryName: string): Promise<void> {
  return RNFS.mkdir(getDirectoryPath(directoryName));
}

export function getDirectoryPath(directoryName: string): string {
  return `${appDirectory}/${directoryName}`;
}

export function getTimestampedFileName(prefix = '', extension = ''): string {
  return `${prefix}${nowTimeStamp}${extension}`;
}
