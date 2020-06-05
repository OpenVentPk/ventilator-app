import * as RNFS from 'react-native-fs';
import Alarms from '../constants/Alarms';
import SetParameter from '../interfaces/SetParameter';
import DataConfig from '../constants/DataConfig';

export default function dataLogger() {
  const nowTimeStamp: string = new Date().toISOString().replace(/\.|:/g, '-');
  const logDirectory: string = `${RNFS.ExternalDirectoryPath}/readings`;
  const logFile: string = `${nowTimeStamp}-readings.csv`;
  const folderCreationPromise = RNFS.mkdir(logDirectory);
  let readingsCsv: string[] = [];
  const logFrequency: number =
    (DataConfig.graphLength / DataConfig.dataFrequency) * 1000; // log every time the graph clears
  let intervalFunction: number = setInterval(() => {
    if (readingsCsv.length > 0) {
      writeToLogFile();
    }
  }, logFrequency);

  function onDataReading(reading: any) {
    const readingInCsv = getCsvFormat(reading);
    readingsCsv.push(readingInCsv);
  }

  function writeToLogFile() {
    const readingsToAdd: string = readingsCsv.join('\n');
    folderCreationPromise.then(() => {
      RNFS.write(`${logDirectory}/${logFile}`, readingsToAdd)
        .then(() => {
          console.log(`written to ${logFile}`);
          readingsCsv = [];
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  }

  function getCsvFormat(reading: any): string {
    const {
      peep,
      measuredPressure,
      plateauPressure,
      respiratoryRate,
      tidalVolume,
      ieRatio,
      vti,
      vte,
      minuteVentilation,
      inspiratoryTime,
      expiratoryTime,
      fiO2,
      flowRate,
      pip,
      mode,
      alarms,
      breathingPhase,
    } = reading;
    let readingsString: string = [
      new Date().toISOString(),
      peep,
      measuredPressure,
      plateauPressure,
      respiratoryRate,
      tidalVolume,
      ieRatio,
      vti,
      vte,
      minuteVentilation,
      inspiratoryTime,
      expiratoryTime,
      fiO2,
      flowRate,
      pip,
      mode,
      breathingPhase,
      getAlarmsInCsvFormat(alarms),
    ].join(',');
    return readingsString;
  }

  function getAlarmsInCsvFormat(alarms: string[]): string {
    let alarmPresenceArray: boolean[] = [];
    var allAlarms = Alarms;
    for (const alarm in allAlarms) {
      if (alarms.includes(alarm)) {
        alarmPresenceArray.push(true);
      } else {
        alarmPresenceArray.push(false);
      }
    }
    return alarmPresenceArray.join(',');
  }

  return {
    onDataReading,
  };
}
