import * as React from 'react';
import MetricDisplay from './MetricDisplay';

export default function TidalVolumeMetricDisplay(props: any) {
  const { ventilationMode, parameter } = props;
  let parameterValueToShow = parameter.setValue;
  if (ventilationMode === 'PCV' || ventilationMode === 'AC-PCV') {
    parameterValueToShow = null;
  }

  return (
    <MetricDisplay
      title={parameter.name}
      value={parameterValueToShow}
      unit={parameter.unit}
    />
  );
}
