import React from 'react';
import Home from './assessment/Home';

export default function DashboardView() {
  // This represents the DashboardView responsibility defined in the SRS (navigation, metrics, and home view).
  return (
    <div className="dashboard-view-container flex flex-col w-full h-full overflow-hidden bg-background">
      <Home />
    </div>
  );
}
