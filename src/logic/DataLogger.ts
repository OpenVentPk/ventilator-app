import * as RNFS from 'react-native-fs';
import Alarms from '../constants/Alarms';

export default function dataLogger() {
  const nowTimeStamp: string = new Date().toISOString().replace(':','-');
  const logFile: string = `${RNFS.DocumentDirectoryPath}/${nowTimeStamp}_readings.csv`;

  function onDataReading(reading: any) {
    var readingInCsv = getCsvFormat(reading);
    RNFS.write(logFile, readingInCsv)
      .then(() => {
        console.log(`written to ${logFile}`);
      })
      .catch((err) => {
        console.log(err.message);
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
