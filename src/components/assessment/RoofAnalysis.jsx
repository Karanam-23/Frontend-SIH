import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';
import MapViewport from '../MapViewport';

// Fallback dev coordinates (Safdarjung Enclave, New Delhi)
const DEV_LATITUDE  = 28.5562;
const DEV_LONGITUDE = 77.2001;
const DEV_POLYGON   = [
  [28.55625, 77.20005],
  [28.55635, 77.20008],
  [28.55632, 77.20025],
  [28.55622, 77.20022],
];

export default function RoofAnalysis() {
  const {
    setView,
    selectedLocation,
    activeAssessment,
    polygonCoords,
  } = useApp();

  // ── Derive display values from real state or fall back to dev defaults ────
  const latitude  = selectedLocation?.latitude  ?? DEV_LATITUDE;
  const longitude = selectedLocation?.longitude ?? DEV_LONGITUDE;
  const address   = selectedLocation?.address   ?? '14B, Safdarjung Enclave, New Delhi, 110029';

  const rooftop         = activeAssessment?.rooftop;
  const confidenceScore = rooftop?.confidence_score ?? 0.91;   // default for dev preview
  const confidencePct   = Math.round(confidenceScore * 100);
  const areaSqm         = rooftop?.area_sqm ?? 116.1;
  const areaSqFt        = Math.round(areaSqm * 10.764);

  // Use the polygon from context (may have been edited in PolygonEditor)
  const displayPolygon = polygonCoords?.length ? polygonCoords : DEV_POLYGON;

  // ── Step 5: FR-04 — Auto-transition if confidence < 0.65 ─────────────────
  // Only fires when there is a real assessment result (not just dev preview).
  useEffect(() => {
    if (activeAssessment && confidenceScore < 0.65) {
      setView('lowConfidence');
    }
  }, [activeAssessment, confidenceScore, setView]);

  return (
    <AppShell
      sidebar={<Sidebar variant="avatar" />}
      header={<TopAppBar mobileOnly={true} />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 relative h-full w-full"
    >
      {/* Map */}
      <div className="absolute inset-0 w-full h-full z-0">
        <MapViewport latitude={latitude} longitude={longitude} polygon={displayPolygon} zoom={18} />
      </div>

      {/* Confidence badge */}
      <div className="absolute top-[48%] left-[53%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
        <div
          className="bg-primary-container text-on-primary font-headline-sm text-xs px-4 py-1.5 rounded-full opacity-90 shadow-md"
          style={{ backgroundColor: '#1c1b1a', color: '#ffffff' }}
        >
          {confidencePct}% Confidence
        </div>
      </div>

      {/* Property info panel */}
      <div className="absolute top-container-padding-mobile left-1/2 -translate-x-1/2 right-auto w-[calc(100%-40px)] max-w-[320px] md:top-container-padding-desktop md:right-container-padding-desktop md:left-auto md:translate-x-0 md:w-[320px] glass rounded-xl border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 z-20 flex flex-col gap-6">
        <div className="flex items-start justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary">Rooftop Detected</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Area: ~{areaSqFt.toLocaleString()} sq ft</p>
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
              <p className="font-body-md text-body-md text-primary font-medium">{address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-outline">my_location</span>
            <div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Coordinates</p>
              <p className="font-data-mono text-data-mono text-primary text-sm">
                {latitude.toFixed(4)}° N, {longitude.toFixed(4)}° E
              </p>
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
          <button
            onClick={() => setView('propertyForm')}
            className="w-full bg-secondary text-on-secondary py-3 px-4 rounded-lg font-headline-sm text-headline-sm text-base flex items-center justify-center gap-2 hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-sm cursor-pointer"
          >
            Looks right <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button
            onClick={() => setView('polygonEditor')}
            className="w-full mt-3 text-primary font-label-sm text-label-sm font-bold py-2 px-4 rounded-lg hover:bg-surface-variant transition-colors border border-transparent hover:border-outline-variant/30 cursor-pointer"
          >
            Adjust Polygon
          </button>
        </div>
      </div>
    </AppShell>
  );
}
