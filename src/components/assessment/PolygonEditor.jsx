import React, { useMemo } from 'react';
import * as turf from '@turf/turf';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';
import MapViewport from '../MapViewport';
import { assessLocation } from '../../services/api';

// Dev fallback coordinates — only used when selectedLocation is unavailable
const DEV_LATITUDE  = 28.5562;
const DEV_LONGITUDE = 77.2001;

export default function PolygonEditor() {
  const {
    setView,
    selectedLocation,
    polygonCoords,
    updatePolygon,
    undoLastEdit,
    resetPolygon,
    selectedMaterial,
    occupants,
    setAssessmentStatus,
    handleAssessmentResponse,
    handleAssessmentError,
  } = useApp();

  // Use real GPS/manual location when available; fall back to dev coordinates only if none exists.
  const latitude  = selectedLocation?.latitude  ?? DEV_LATITUDE;
  const longitude = selectedLocation?.longitude ?? DEV_LONGITUDE;

  // ── Live Turf area calculation ────────────────────────────────────────────
  const calculatedAreaSqM = useMemo(() => {
    if (!polygonCoords || polygonCoords.length < 3) return 0;
    try {
      // GeoJSON expects [lng, lat] and a closed ring (first === last)
      const closedCoords = [...polygonCoords, polygonCoords[0]].map((c) => [c[1], c[0]]);
      const turfPoly = turf.polygon([closedCoords]);
      return turf.area(turfPoly); // square metres
    } catch (e) {
      console.error('Turf area error:', e);
      return 0;
    }
  }, [polygonCoords]);

  const calculatedAreaSqFt = calculatedAreaSqM * 10.7639;

  // ── Confirm boundary → submit assessment ─────────────────────────────────
  const handleConfirmBoundary = async () => {
    setAssessmentStatus('calculating');
    setView('calculating');

    const payload = {
      latitude,
      longitude,
      address:       selectedLocation?.address,
      source:        selectedLocation?.source ?? 'MANUAL',
      roof_material: selectedMaterial,
      occupants,
      override_polygon: {
        type: 'Polygon',
        coordinates: [
          [...polygonCoords, polygonCoords[0]].map((c) => [c[1], c[0]]),
        ],
      },
    };

    try {
      const response = await assessLocation(payload);
      // Centralized handler (sets IDs, activeAssessment, routes view)
      handleAssessmentResponse(response, setView);
    } catch (err) {
      console.error('PolygonEditor API error:', err);
      handleAssessmentError(err, setView);
    }
  };

  return (
    <AppShell
      sidebar={<Sidebar variant="avatar" />}
      header={<TopAppBar mobileOnly={true} />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 relative h-full w-full"
    >
      {/* Map */}
      <div className="absolute inset-0 w-full h-full z-0">
        <MapViewport
          latitude={latitude}
          longitude={longitude}
          polygon={polygonCoords}
          isEditable={true}
          onPolygonChange={updatePolygon}
          zoom={18}
        />
      </div>

      {/* Live area badge */}
      <div className="absolute top-[48%] left-[53%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-secondary border-2 border-white shadow-lg flex items-center justify-center scale-110">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <div className="mt-2 whitespace-nowrap bg-secondary text-on-secondary font-data-mono text-data-mono px-3 py-1.5 rounded shadow-md text-sm">
            Area: {calculatedAreaSqM.toFixed(1)} m² (~{calculatedAreaSqFt.toFixed(0)} sq.ft)
          </div>
        </div>
      </div>

      {/* Reset / Undo controls */}
      <div className="absolute top-container-padding-mobile md:top-container-padding-desktop right-container-padding-mobile md:right-container-padding-desktop z-40 flex flex-col gap-3 pointer-events-auto">
        <button
          onClick={resetPolygon}
          title="Reset Polygon"
          className="glass-overlay w-12 h-12 rounded-full border border-outline-variant/30 shadow-sm flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">restart_alt</span>
        </button>
        <button
          onClick={undoLastEdit}
          title="Undo Last Edit"
          className="glass-overlay w-12 h-12 rounded-full border border-outline-variant/30 shadow-sm flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">undo</span>
        </button>
      </div>

      {/* Bottom confirm panel */}
      <div className="absolute bottom-container-padding-mobile md:bottom-container-padding-desktop left-1/2 -translate-x-1/2 z-40 pointer-events-auto w-full max-w-sm px-container-padding-mobile">
        <div className="glass-overlay p-4 rounded-xl border border-outline-variant/30 shadow-lg flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Roof Boundary</span>
            <span className="font-data-mono text-data-mono text-on-surface text-sm">{polygonCoords ? polygonCoords.length : 0} Vertices</span>
          </div>
          <button
            onClick={handleConfirmBoundary}
            className="w-full bg-secondary text-on-secondary font-headline-sm text-headline-sm py-3 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Confirm Boundary
          </button>
        </div>
      </div>
    </AppShell>
  );
}
