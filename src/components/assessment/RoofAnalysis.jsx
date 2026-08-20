import React from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';
import MapViewport from '../MapViewport';

const latitude = 28.5562;
const longitude = 77.2001;
const defaultPolygon = [
  [28.55625, 77.20005],
  [28.55635, 77.20008],
  [28.55632, 77.20025],
  [28.55622, 77.20022]
];

export default function RoofAnalysis() {
  const { setView } = useApp();

  return (
    <AppShell
      sidebar={<Sidebar variant="avatar" />}
      header={<TopAppBar mobileOnly={true} />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 relative h-full w-full"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <MapViewport latitude={latitude} longitude={longitude} polygon={defaultPolygon} zoom={18} />
      </div>

      <div className="absolute top-[48%] left-[53%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
        <div className="bg-primary-container text-on-primary font-headline-sm text-xs px-4 py-1.5 rounded-full opacity-90 shadow-md" style={{ backgroundColor: '#1c1b1a', color: '#ffffff' }}>
          91% Confidence
        </div>
      </div>

      <div className="absolute top-container-padding-mobile left-1/2 -translate-x-1/2 right-auto w-[calc(100%-40px)] max-w-[320px] md:top-container-padding-desktop md:right-container-padding-desktop md:left-auto md:translate-x-0 md:w-[320px] glass rounded-xl border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 z-20 flex flex-col gap-6">
        <div className="flex items-start justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary">Rooftop Detected</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Area: ~1,250 sq ft</p>
          </div>
          <div className="bg-tertiary-fixed text-on-tertiary-fixed p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-outline">location_on</span>
            <div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Property Address</p>
              <p className="font-body-md text-body-md text-primary font-medium">14B, Safdarjung Enclave<br />New Delhi, 110029</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-outline">my_location</span>
            <div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Coordinates</p>
              <p className="font-data-mono text-data-mono text-primary text-sm">28.5562° N, 77.2001° E</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-outline">architecture</span>
            <div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Surface Type</p>
              <p className="font-body-md text-body-md text-primary font-medium">Concrete Flat Roof</p>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <button onClick={() => setView('propertyForm')} className="w-full bg-secondary text-on-secondary py-3 px-4 rounded-lg font-headline-sm text-headline-sm text-base flex items-center justify-center gap-2 hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-sm cursor-pointer">
            Looks right <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button onClick={() => setView('polygonEditor')} className="w-full mt-3 text-primary font-label-sm text-label-sm font-bold py-2 px-4 rounded-lg hover:bg-surface-variant transition-colors border border-transparent hover:border-outline-variant/30 cursor-pointer">
            Adjust Polygon
          </button>
        </div>
      </div>
    </AppShell>
  );
}
