
export default function dataOrchestrator() {


  function onPacketReceived(reading : any) {
    addValueToGraph(measuredTidalVolume, volumeGraph, counterForGraphs);
  }

}


