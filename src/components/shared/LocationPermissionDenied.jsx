import React from 'react';
import { useApp } from '../../context/AppContext';

export default function LocationPermissionDenied() {
  const { setView, setFocusManualInput } = useApp();

  const handleEnterManually = () => {
    if (typeof setFocusManualInput === 'function') {
      setFocusManualInput(true);
    }
    setView('home');
  };

  const handleReturnToDashboard = () => {
    if (typeof setFocusManualInput === 'function') {
      setFocusManualInput(false);
    }
    setView('home');
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <nav className="hidden lg:flex flex-col p-4 space-y-4 bg-surface-container dark:bg-surface-container-highest border-r border-outline-variant/30 shadow-lg h-full w-64 z-20 shrink-0">
        <div className="flex items-center space-x-3 mb-section-gap px-2">
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden shrink-0 border border-outline-variant/50">
            <span className="material-symbols-outlined text-outline">account_circle</span>
          </div>
          <div>
            <h2 className="text-secondary font-headline-sm font-bold text-headline-sm">JalRakshak AI</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Conservation Assistant</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2 flex-1">
          <a className="flex items-center space-x-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-all scale-102 shadow-[0_2px_8px_rgba(0,0,0,0.05)] select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
            <span className="font-label-sm text-label-sm select-none">Map View</span>
          </a>
          <a className="flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:text-on-surface select-none" onClick={() => setView('costBreakdown')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none">analytics</span>
            <span className="font-label-sm text-label-sm select-none">Assessment</span>
          </a>
          <a className="flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:text-on-surface select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none">description</span>
            <span className="font-label-sm text-label-sm select-none">Reports</span>
          </a>
          <a className="flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:text-on-surface select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none">smart_toy</span>
            <span className="font-label-sm text-label-sm select-none">Expert Chat</span>
          </a>
        </div>

        <div className="mt-auto pt-4">
          <button onClick={handleEnterManually} className="w-full bg-secondary text-on-secondary py-3 px-4 rounded-lg font-label-sm text-label-sm hover:bg-secondary/90 transition-colors shadow-sm flex items-center justify-center space-x-2 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Assessment</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 h-full relative flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop bg-bone-dots w-full z-10 overflow-y-auto">
        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-xl border border-outline-variant/30 p-10 max-w-lg w-full flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.06)] animate-subtle-rise relative overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-1 bg-outline-variant/50" />

          <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mb-8 border border-outline-variant/20 shadow-sm">
            <span className="material-symbols-outlined text-[40px] text-outline">location_off</span>
          </div>

          <h1 className="font-headline-md text-headline-md text-on-surface mb-4 tracking-tight">No worries — let's find it another way</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-sm">You can manually search for your address or pin your location on the map.</p>

          {/* Primary CTA — returns to Home and focuses manual input */}
          <button
            onClick={handleEnterManually}
            className="bg-secondary text-on-secondary px-8 py-3.5 rounded-lg font-label-sm text-label-sm w-full sm:w-auto hover:bg-secondary-container hover:text-on-secondary-container hover:shadow-md transition-all duration-200 border border-transparent focus:ring-2 focus:ring-secondary/50 outline-none cursor-pointer"
          >
            Enter Address Manually
          </button>

          {/* Secondary — plain return */}
          <button
            onClick={handleReturnToDashboard}
            className="mt-6 font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-2 bg-surface dark:bg-surface-container border-t border-outline-variant/20 shadow-inner z-50 rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors group select-none" onClick={handleReturnToDashboard} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform select-none">home</span>
          <span className="font-label-sm text-[10px] select-none">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim bg-secondary-fixed/10 rounded-full px-5 py-1.5 transition-transform scale-95 select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined mb-1 select-none" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="font-label-sm text-[10px] font-bold select-none">Map</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors group select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform select-none">history</span>
          <span className="font-label-sm text-[10px] select-none">History</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors group select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform select-none">forum</span>
          <span className="font-label-sm text-[10px] select-none">Chat</span>
        </a>
      </nav>
    </div>
  );
}
