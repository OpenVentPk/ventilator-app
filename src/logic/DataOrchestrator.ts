import UserInterfaceUpdater from './UserInterfaceUpdater';
import DataLogger from './DataLogger';
import { processSerialData } from './SerialParser';
import SerialDataHandler from './SerialDataHandler';
import DummyDataGenerator from './DummyDataGenerator';
import SerialDataRetriever from 'src/interfaces/SerialDataRetriever';
import DataConfig from '../constants/DataConfig';

export default function dataOrchestrator(
  hookUpdateFunction: (value: any) => void,
  testMode: boolean = false,
) {
  const userInterfaceUpdater = UserInterfaceUpdater(hookUpdateFunction);
  const dataLogger = DataLogger();
  const serialDataHandler: SerialDataRetriever = SerialDataHandler(
    { baudRate: 115200 },
    onPacketReceived,
  );
  const dummyGenerator: SerialDataRetriever = DummyDataGenerator(
    onPacketReceived,
    DataConfig.dataFrequency,
  );
  const dataPacketRetriever: SerialDataRetriever = testMode
    ? dummyGenerator
    : serialDataHandler;

  function onPacketReceived(dataPacket: any) {
    processSerialData(dataPacket, onDataParsed);
  }

  function onDataParsed(reading: any) {
    userInterfaceUpdater.onReadingReceived(reading);
    dataLogger.onDataReading(reading);
  }

  function startOrchestrating() {
    console.log('starting orchestrator');
    dataPacketRetriever.start();
  }

  function stopOrchestrating() {
    dataPacketRetriever.stop();
  }

  return {
    startOrchestrating,
    stopOrchestrating,
  };
}
