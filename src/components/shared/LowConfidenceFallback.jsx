import React from 'react';
import { useApp } from '../../context/AppContext';

export default function LowConfidenceFallback() {
  const { setView, chatMessages, addChatMessage } = useApp();

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      <header className="lg:hidden bg-surface flex justify-between items-center w-full px-container-padding-mobile h-16 shadow-sm border-b border-outline-variant/20 relative z-20">
        <div className="font-headline-md text-headline-md font-bold text-secondary">
          JalRakshak
        </div>
        <div className="flex items-center gap-4 text-primary">
          <button onClick={() => setView('propertyForm')} className="hover:bg-surface-container-low transition-colors duration-200 p-2 rounded-full">
            <span className="material-symbols-outlined" data-icon="history">history</span>
          </button>
          <button className="hover:bg-surface-container-low transition-colors duration-200 p-2 rounded-full">
            <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
          </button>
        </div>
      </header>

      <nav className="hidden lg:flex flex-col p-4 space-y-4 bg-surface-container h-full w-64 shrink-0 border-r border-outline-variant/30 shadow-lg z-20">
        <div className="mb-8 px-2">
          <h1 className="text-secondary font-headline-sm font-bold">JalRakshak AI</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Conservation Assistant</p>
        </div>
        <button className="w-full bg-secondary text-on-secondary font-body-md py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-6 hover:bg-secondary/90 transition-colors shadow-sm">
          <span className="material-symbols-outlined text-sm">add</span>
          New Assessment
        </button>
        <ul className="space-y-2 flex-grow">
          <li>
            <a className="flex items-center gap-3 p-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold scale-102 shadow-md transition-all select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined select-none" data-icon="map" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
              <span className="font-body-md select-none">Map View</span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:text-secondary select-none" onClick={() => setView('costBreakdown')} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined select-none" data-icon="analytics">analytics</span>
              <span className="font-body-md select-none">Assessment</span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:text-secondary select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined select-none" data-icon="description">description</span>
              <span className="font-body-md select-none">Reports</span>
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:text-secondary select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined select-none" data-icon="smart_toy">smart_toy</span>
              <span className="font-body-md select-none">Expert Chat</span>
            </a>
          </li>
        </ul>
        <div className="mt-auto flex items-center gap-3 p-2 pt-4 border-t border-outline-variant/30">
          <div className="w-10 h-10 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined" data-icon="person">person</span>
          </div>
          <div>
            <p className="font-body-md font-semibold">Urban Planner</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Profile</p>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex-1 h-full relative bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLur6eU24WX1_Ca4cEAB9JzGRXlYHvreTI8WPqnQOl9lTgxuAiyWYiJG8nvAkgZc0YV96HdfWMQJ9MlkXOL3NdOH7Fxw_b_scdds-A171CnbrDdS97VIt_wa-zbseuuxuiDRHTS0OwPxae3QSryGqQukGTAwRYcVe0bFyI1GpJVW0XlR5ufIRdbiDgwgOxl519QjyTV0QflmPT3p7OuTbX8Gq7zteOD09ZbHTBDDSHa8fu45E6CG4qziSq8')` }}>
          <div className="absolute inset-0 bg-primary-container/10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]">
            <div className="w-32 h-32 border-2 border-dashed border-error/70 rounded-sm relative pointer-events-none">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-error"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-error"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-error"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-error"></div>
            </div>
          </div>
        </div>
        <div className="absolute top-container-padding-mobile lg:top-container-padding-desktop right-container-padding-mobile lg:right-container-padding-desktop flex flex-col gap-2 z-10">
          <div className="glass-overlay rounded-lg shadow-sm flex flex-col overflow-hidden">
            <button aria-label="Zoom In" className="p-3 text-on-surface hover:bg-surface-variant transition-colors border-b border-outline-variant/20">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button aria-label="Zoom Out" className="p-3 text-on-surface hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <button aria-label="My Location" className="glass-overlay p-3 rounded-lg shadow-sm text-on-surface hover:bg-surface-variant transition-colors mt-2">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>
        <div className="absolute top-container-padding-mobile lg:top-container-padding-desktop left-container-padding-mobile lg:left-container-padding-desktop lg:ml-0 z-10">
          <div className="glass-overlay px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-outline-variant/40">
            <span className="material-symbols-outlined text-outline text-sm">warning</span>
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">38% Confidence</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full lg:left-0 lg:w-full lg:px-container-padding-desktop z-30 pointer-events-none flex justify-center pb-0 lg:pb-container-padding-desktop">
          <div className="bottom-sheet pointer-events-auto bg-surface w-full lg:max-w-2xl rounded-t-xl lg:rounded-xl shadow-[0_-8px_32px_rgba(28,27,26,0.12)] border border-outline-variant/20 p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined" data-icon="forest" style={{ fontVariationSettings: "'FILL' 1" }}>forest</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Tree cover is blocking our view</h2>
              </div>
              <p className="font-body-md text-on-surface-variant mt-2 max-w-md">
                Help us trace your roof outline to ensure accuracy. The AI cannot reliably detect the edges of the structure through the canopy.
              </p>
            </div>
            <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
              <button onClick={() => setView('propertyForm')} className="px-6 py-3 rounded-lg font-body-md font-semibold text-primary border-2 border-primary hover:bg-surface-container-low transition-colors w-full sm:w-auto text-center cursor-pointer">
                Cancel
              </button>
              <button onClick={() => setView('polygonEditor')} className="px-6 py-3 rounded-lg font-body-md font-semibold bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors shadow-sm w-full sm:w-auto text-center flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-sm">draw</span>
                Trace Manually
              </button>
            </div>
          </div>
        </div>
      </main>

      <nav className="lg:hidden bg-surface dark:bg-surface-container border-t border-outline-variant/20 shadow-inner fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-2 z-50 rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors select-none" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none" data-icon="home">home</span>
          <span className="font-label-sm text-label-sm mt-1 select-none">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim bg-secondary-fixed/10 rounded-full px-4 py-1 transition-transform scale-90 select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none" data-icon="explore" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="font-label-sm text-label-sm mt-1 select-none">Map</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none" data-icon="history">history</span>
          <span className="font-label-sm text-label-sm mt-1 select-none">History</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
          <span className="material-symbols-outlined select-none" data-icon="forum">forum</span>
          <span className="font-label-sm text-label-sm mt-1 select-none">Chat</span>
        </a>
      </nav>
    </div>
  );
}
