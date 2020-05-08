// import {} from SerialDataHandler
import { processSerialData } from './SerialParser';
export default function dummyDataGenerator(
  updateReadingStateFunction: (value: any) => void,
  intervalFrequency: number,
) {
  let intervalFunction: number;
  let data: string = '';
  let Counter = 0;

  function getRandomValue(range: number, valueToSubtract = 0) {
    return Math.round(Math.random() * range - valueToSubtract);
  }

  function generateDummyReadings() {
    let Data = new Array(49);
    for (let i = 0; i < 49; i++) {
      Data[i] = data.substring(Counter, Counter + 1).charCodeAt(0);
      Counter++;
    }
    // console.log('processing serial data');
    processSerialData(Data, updateReadingStateFunction);
    // return {
    //   peep: getRandomValue(10),
    //   peakPressure: getRandomValue(100, 100),
    //   // patientRate: getRandomValue(220),
    //   plateauPressure: getRandomValue(20),
    //   patientRate: 80,
    //   vte: getRandomValue(700),
    //   inspiratoryTime: getRandomValue(3),
    //   expiratoryTime: getRandomValue(5).toFixed(1),
    //   oxygen: getRandomValue(100),
    //   flow: getRandomValue(30, 10),
    // };
  }

  function startGenerating() {
    var RNFS = require('react-native-fs');
    RNFS.readFileAssets('sample_data.txt', 'ascii').then((result) => {
      // console.log('GOT RESULT', result);
      data = result;
      // console.log()
      // stat the first file
    });
    intervalFunction = setInterval(() => {
      generateDummyReadings();
      // const newReadings = generateDummyReadings();
      // updateReadingStateFunction(newReadings);
    }, intervalFrequency);
  }

  function stopGenerating() {
    clearInterval(intervalFunction);
  }

  return {
    startGenerating,
    stopGenerating,
  };
}
