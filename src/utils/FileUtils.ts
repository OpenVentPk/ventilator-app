import * as RNFS from 'react-native-fs';
import {
  PermissionsAndroid,
  Rationale,
  Permission,
  PermissionStatus,
} from 'react-native';

const appDirectoryCreationPromise = createAppDirectory();

function createAppDirectory(): Promise<string> {
  return requestExternalStorageAccess().then((permissionGranted: boolean) => {
    const appDirectoryPath: string = permissionGranted
      ? `${RNFS.ExternalStorageDirectoryPath}/OpenVentPk`
      : RNFS.DocumentDirectoryPath;
    return RNFS.mkdir(appDirectoryPath).then(() => {
      return appDirectoryPath;
    });
  });
}

function requestExternalStorageAccess(): Promise<boolean> {
  const externalStoragePermission: Permission =
    'android.permission.WRITE_EXTERNAL_STORAGE';
  const requestRationale: Rationale = {
    title: 'Access External Storage for persistent logging',
    message:
      'Access to External Storage ensures all session app log data persists even after app deletion. If not granted, data will be stored in internal app folder and be removed on app deletion.',
    buttonPositive: 'OK',
    buttonNegative: 'No',
    buttonNeutral: 'Ask Me Later',
  };
  return PermissionsAndroid.request(
    externalStoragePermission,
    requestRationale,
  ).then((result: PermissionStatus) => {
    console.log(result);
    return result === 'granted';
  });
}

const nowTimeStamp: string = new Date().toISOString().replace(/\.|:/g, '-');

export function createDirectory(directoryName: string): Promise<string> {
  return appDirectoryCreationPromise.then((appDirectoryPath) => {
    const newDirectoryPath = `${appDirectoryPath}/${directoryName}`;
    return RNFS.mkdir(newDirectoryPath).then(() => {
      return newDirectoryPath;
    });
  });
}

export function getTimestampedFileName(prefix = '', extension = ''): string {
  return `${prefix}${nowTimeStamp}${extension}`;
}
