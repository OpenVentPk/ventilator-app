import DataConfig from '../constants/DataConfig';
import { BreathingPhase } from '../enums/BreathingPhase';

export default function userInterfaceUpdate(hookUpdateFunction: any) {
  let pressureGraph = new Array(DataConfig.graphLength).fill(null);
  let volumeGraph = new Array(DataConfig.graphLength).fill(null);
  let flowRateGraph = new Array(DataConfig.graphLength).fill(null);
  let totalPackets = 0;
  let failedPackets = 0;
  let interval = 0;
  let counterForGraphs = 0;
  let breathMarkers: number[] = [];
  let previousBreath: BreathingPhase = BreathingPhase.Wait;

  function onReadingReceived(reading: any) {
    addValueToGraph(reading.measuredTidalVolume, volumeGraph, counterForGraphs);
    addValueToGraph(reading.measuredFlowRate, flowRateGraph, counterForGraphs);
    addValueToGraph(reading.measuredPressure, pressureGraph, counterForGraphs);
  }

  function addValueToGraph(
    value: number,
    graph: number[],
    counter: number,
  ): void {
    graph[counter++ % DataConfig.graphLength] = value;
    if (counter >= DataConfig.graphLength) {
      counter = 0;
    }

    addGapToGraph(graph, counter);
  }

  function addGapToGraph(graph: number[], currentValueIndex: number): void {
    const numberOfNullValues = Math.floor(DataConfig.graphLength * 0.02); // 2 % of values should be null
    for (
      let i = currentValueIndex;
      i < currentValueIndex + numberOfNullValues;
      i++
    ) {
      graph[i % DataConfig.graphLength] = null;
    }
  }

  return {
    onReadingReceived,
  };
}
