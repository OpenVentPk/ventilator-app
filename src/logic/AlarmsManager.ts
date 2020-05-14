import { showMessage, hideMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

function AlarmsManager() {
  let currentAlarms: Array<string> = [];
  let alarmSound = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error: any) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + alarmSound.getDuration() + ' number of channels: ' + alarmSound.getNumberOfChannels());
  });

  function onNewReading(reading: any) {
    const newAlarms: any = reading.alarms;
    if (newAlarms === undefined) {
      return;
    }
    if (changeInAlarms(newAlarms)) {
      currentAlarms = newAlarms;
      handleCurrentAlarms(currentAlarms);
    }
  }

  function handleCurrentAlarms(alarms: Array<string>): void {
    if (alarms.length === 0) {
      hideMessage();
      alarmSound.stop();
    } else {
      displayAlarmsBanner();
    }
  }

  function displayAlarmsBanner(): void {
    const alarmsText = currentAlarms.join('\n');
    alarmSound.play((success) => {
      console.log('hello');
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  alarmSound.setNumberOfLoops(-1);

    showMessage({
      message: 'Alarm(s) active',
      description: alarmsText,
      type: 'danger',
      autoHide: false,
      hideOnPress: true,
      onPress: () => {
        alarmSound.stop();
      },
    });
  }

  function changeInAlarms(newAlarms: Array<string>): boolean {
    if (currentAlarms.length !== newAlarms.length) {
      return true;
    } else {
      return !currentAlarms.every((value, index) => {
        return value === newAlarms[index];
      });
    }
  }

  return {
    onNewReading,
  };
}

export default AlarmsManager();
