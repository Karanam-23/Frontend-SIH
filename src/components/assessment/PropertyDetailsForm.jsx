import React from 'react';
import { useApp } from '../../context/AppContext';
import { assessLocation } from '../../services/api';

import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';

export default function PropertyDetailsForm() {
  const {
    setView,
    selectedLocation,
    polygonCoords,
    selectedMaterial,
    setSelectedMaterial,
    occupants,
    setOccupants,
    setAssessmentStatus,
    handleAssessmentResponse,
    handleAssessmentError,
  } = useApp();

  const handleDecrement = () => setOccupants((n) => Math.max(1, n - 1));
  const handleIncrement = () => setOccupants((n) => n + 1);

  const handleSubmit = async () => {
    // Transition to the calculating screen immediately
    setAssessmentStatus('calculating');
    setView('calculating');

    // Build the complete assessment payload
    const payload = {
      latitude:      selectedLocation?.latitude  ?? 28.5562,
      longitude:     selectedLocation?.longitude ?? 77.2001,
      address:       selectedLocation?.address,
      source:        selectedLocation?.source ?? 'MANUAL',
      roof_material: selectedMaterial,
      occupants:     occupants,
      override_polygon: {
        type: 'Polygon',
        coordinates: [
          [...polygonCoords, polygonCoords[0]].map((c) => [c[1], c[0]]),
        ],
      },
    };

    try {
      const response = await assessLocation(payload);
      // Centralized handler sets IDs, activeAssessment, and routes the view
      handleAssessmentResponse(response, setView);
    } catch (err) {
      console.error('Assessment API error:', err);
      handleAssessmentError(err, setView);
    }
  };

  const materials = [
    { key: 'RCC_FLAT',         label: 'RCC',    icon: 'architecture' },
    { key: 'SLOPED_METAL',     label: 'Metal',  icon: 'warehouse'    },
    { key: 'TILED_TERRACOTTA', label: 'Tile',   icon: 'grid_on'      },
    { key: 'UNBAKED_CLAY',     label: 'Clay',   icon: 'roofing'      },
    { key: 'BITUMEN_ASPHALT',  label: 'Asphalt',icon: 'layers'       },
  ];

  return (
    <AppShell
      sidebar={<Sidebar variant="avatar" />}
      header={<TopAppBar mobileOnly={true} />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-grow flex-1 overflow-y-auto relative pb-24 md:pb-8 flex items-center justify-center p-4 md:p-8"
    >
      <div className="glass-card w-full max-w-2xl rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 md:p-10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300 transform -translate-y-1 hover:-translate-y-2">
        <div className="text-center mb-8">
          <span className="inline-block bg-secondary/10 text-secondary font-label-sm text-label-sm px-3 py-1 rounded-full mb-3 tracking-widest uppercase">Step 2 of 4</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">A couple quick details</h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg">Help us estimate your rainwater harvesting potential.</p>
        </div>

        {/* Roof Material */}
        <div className="mb-section-gap">
          <label className="block font-label-sm text-label-sm uppercase text-outline mb-4 tracking-wider">Roof Material</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {materials.map((m) => {
              const isSelected = selectedMaterial === m.key;
              return (
                <button
                  key={m.key}
                  onClick={() => setSelectedMaterial(m.key)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-secondary-fixed/10 border-secondary border-2 shadow-sm'
                      : 'bg-surface border-outline-variant hover:bg-surface-variant'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 text-secondary">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </span>
                  )}
                  <span
                    className={`material-symbols-outlined text-2xl mb-2 ${isSelected ? 'text-secondary' : 'text-outline'}`}
                    style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {m.icon}
                  </span>
                  <span className={`font-label-sm text-label-sm ${isSelected ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Occupants */}
        <div className="mb-section-gap flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface border border-outline-variant rounded-lg">
          <div className="mb-4 md:mb-0">
            <label className="block font-label-sm text-label-sm uppercase text-outline tracking-wider mb-1">Number of Occupants</label>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Used to calculate daily water demand.</p>
          </div>
          <div className="flex items-center gap-4 bg-surface-container rounded-full p-1 border border-outline-variant/50">
            <button
              onClick={handleDecrement}
              disabled={occupants <= 1}
              className="w-10 h-10 flex items-center justify-center bg-surface rounded-full text-on-surface hover:bg-surface-variant border border-outline-variant/50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="font-data-mono text-data-mono text-on-surface w-8 text-center">{occupants}</span>
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center bg-surface rounded-full text-on-surface hover:bg-surface-variant border border-outline-variant/50 transition-colors shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 pt-6 border-t border-outline-variant/30 text-right">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-on-secondary font-headline-sm text-headline-sm py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Calculate My Yield
          </button>
        </div>
      </div>
    </AppShell>
  );
}
