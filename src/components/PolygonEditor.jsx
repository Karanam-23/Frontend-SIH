import React from 'react';
import PolygonEditorScreen from './assessment/PolygonEditor';

export default function PolygonEditor() {
  // This represents the GeoJSON rooftop polygon editing and vertex interaction component.
  // In the future, this will utilize @turf/turf to calculate the area based on edited vertices.
  return (
    <div className="polygon-editor-container w-full h-full">
      <PolygonEditorScreen />
    </div>
  );
}
