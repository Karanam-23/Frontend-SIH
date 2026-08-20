import React from 'react';
import SystemSchematicDetail from './assessment/SystemSchematicDetail';

export default function SchematicViewer() {
  // This represents the SchematicViewer responsibility defined in the SRS.
  return (
    <div className="schematic-viewer-container w-full h-full">
      <SystemSchematicDetail />
    </div>
  );
}
