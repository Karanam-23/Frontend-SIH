import React from 'react';
import { useApp } from '../../context/AppContext';

export default function ServiceDegradedState() {
  const { setView, assessmentError } = useApp();

  const errorCode = assessmentError ? assessmentError.code : 'UPSTREAM_SERVICE_UNAVAILABLE';
  const errorMessage = assessmentError ? assessmentError.message : 'Real-time telemetry and predictive models are temporarily offline.';

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      <nav className="bg-surface-container dark:bg-surface-container-highest shrink-0 h-full w-64 bg-surface-container-low border-r border-outline-variant/30 shadow-lg hidden lg:flex flex-col p-4 space-y-4">
        <div className="flex items-center space-x-3 mb-8 px-2 pt-2">
          <div className="h-10 w-10 rounded-full bg-surface-dim flex items-center justify-center overflow-hidden border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary">water_drop</span>
          </div>
          <div>
            <h1 className="text-secondary font-headline-sm font-bold">JalRakshak AI</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Conservation Assistant</p>
          </div>
        </div>
        <div className="flex-grow space-y-2">
          <a className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all scale-102 hover:shadow-md select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none">map</span>
            <span className="font-label-sm text-label-sm select-none">Map View</span>
          </a>
          <a className="flex items-center space-x-3 px-3 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-all scale-102 hover:shadow-md select-none" onClick={() => setView('costBreakdown')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            <span className="font-label-sm text-label-sm select-none">Assessment</span>
          </a>
          <a className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all scale-102 hover:shadow-md select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none">description</span>
            <span className="font-label-sm text-label-sm select-none">Reports</span>
          </a>
          <a className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all scale-102 hover:shadow-md select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
            <span className="material-symbols-outlined select-none">smart_toy</span>
            <span className="font-label-sm text-label-sm select-none">Expert Chat</span>
          </a>
        </div>
        <div className="mt-auto">
          <button onClick={() => setView('propertyForm')} className="w-full bg-secondary text-on-secondary font-label-sm text-label-sm py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="">New Assessment</span>
          </button>
        </div>
      </nav>

      <main className="flex-grow flex-1 h-full relative pb-24 md:pb-8 flex flex-col overflow-y-auto">
        <header className="lg:hidden bg-surface dark:bg-surface flex justify-between items-center w-full px-container-padding-mobile h-16 bg-surface-bright dark:bg-surface-dim border-b border-outline-variant/20 shadow-sm">
          <div className="font-headline-md text-headline-md font-bold text-secondary dark:text-secondary-fixed-dim">JalRakshak</div>
          <div className="flex space-x-4">
            <button className="text-on-surface-variant dark:text-outline hover:text-secondary transition-colors duration-200">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="text-on-surface-variant dark:text-outline hover:text-secondary transition-colors duration-200">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </header>

        <div className="flex-grow p-container-padding-mobile lg:p-container-padding-desktop overflow-y-auto space-y-section-gap bg-background">
          <section className="max-w-[1200px] mx-auto space-y-gutter">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-2">Regional Assessment</h2>
                <p className="font-body-md text-on-surface-variant">Real-time telemetry and predictive models.</p>
              </div>
              <div className="flex items-center space-x-2 bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant/30 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">cloud_sync</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider">Syncing...</span>
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-outline-variant/20 card-shadow p-6 lg:p-8 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>

              <div className="flex items-center space-x-3 mb-6 inline-flex bg-red-500/10 rounded-full px-3 py-1.5 border border-red-500/20">
                <span className="material-symbols-outlined text-red-500 text-[16px]">wifi_off</span>
                <span className="font-label-sm text-label-sm text-red-600 font-bold uppercase tracking-wide">Error Status: {errorCode}</span>
                <div className="h-3 w-px bg-outline-variant/50 mx-2"></div>
                <button onClick={() => setView('propertyForm')} className="text-secondary font-label-sm text-label-sm hover:underline flex items-center space-x-1 cursor-pointer">
                  <span>Try Again</span>
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1 lg:col-span-1 space-y-6">
                  <div>
                    <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Error Details</p>
                    <p className="font-body-lg text-body-lg text-on-surface font-semibold mb-1">{errorCode}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{errorMessage}</p>
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-2 relative min-h-[300px] rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container-low flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('placeholder')] bg-cover bg-center opacity-30 grayscale" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5xvc-nokyLY0guHh1KkLE-gbZuC3TpR9szC234OnT4GWNuIVX-xumD_7RdyxSGrwnh-CPCJgUlXv1tNK3S2BiqOES97MvRJFn41KGFP32di7sWbXZlNL20RToYvwvjTi3uysuP9qav02-SqqsP9A6Ix5pncGw1HOcYIxPF7ILNC-oSUp2fm7jmF8yh3uS7VEN3F6CdrH5nH8uosSBWdQcarKUizLgGhqylt2FVP3Y9CinAG2-1Qthgw')` }}></div>
                  <div className="relative z-10 glass-panel p-6 rounded-lg flex flex-col items-center text-center max-w-xs mx-auto border border-outline-variant/30">
                    <span className="material-symbols-outlined text-red-500 text-3xl mb-2">error</span>
                    <p className="font-body-md text-on-surface-variant font-bold mb-1">Telemetry Interrupted</p>
                    <p className="font-label-sm text-label-sm text-outline">{errorMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="bg-surface rounded-lg border border-outline-variant/20 p-5 card-shadow relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-fixed-dim opacity-50 rounded-l-lg"></div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Aquifer Level (Est)</p>
              <div className="flex items-end justify-between">
                <span className="font-headline-md text-headline-md text-on-surface">32.4m</span>
                <span className="material-symbols-outlined text-outline text-sm" title="Estimated Value">info</span>
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-outline-variant/20 p-5 card-shadow relative opacity-70">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-tint opacity-50 rounded-l-lg"></div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Current Flow</p>
              <div className="flex items-end justify-between">
                <span className="font-headline-md text-headline-md text-on-surface-variant">--</span>
                <span className="font-label-sm text-label-sm text-outline">Offline</span>
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-outline-variant/20 p-5 card-shadow relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-fixed-dim opacity-50 rounded-l-lg"></div>
              <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Evaporation Rate (Est)</p>
              <div className="flex items-end justify-between">
                <span className="font-headline-md text-headline-md text-on-surface">4.1mm/d</span>
                <span className="material-symbols-outlined text-outline text-sm" title="Estimated Value">info</span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg border border-outline-variant/30 p-5 flex flex-col justify-center items-center text-center hover:bg-surface-variant transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-secondary mb-2">support_agent</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Contact IT Support</p>
            </div>
          </section>
          <div className="h-24 lg:h-8"></div>
        </div>
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-2 bg-surface border-t border-outline-variant/20 shadow-inner z-50 rounded-t-xl pb-safe">
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary select-none" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none">home</span>
          <span className="font-label-sm text-label-sm-mobile mt-1 select-none">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim bg-secondary-fixed/10 rounded-full px-4 py-1 select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="font-label-sm text-label-sm-mobile mt-1 select-none">Map</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none">history</span>
          <span className="font-label-sm text-label-sm-mobile mt-1 select-none">History</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none">forum</span>
          <span className="font-label-sm text-label-sm-mobile mt-1 select-none">Chat</span>
        </a>
      </nav>
    </div>
  );
}
