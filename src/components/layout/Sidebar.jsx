import React from 'react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ variant = 'placeholder' }) {
  const { currentView, setView, startNewAssessment } = useApp();

  const isMapActive = currentView === 'roofAnalysis' || currentView === 'polygonEditor';
  const isAssessmentActive = currentView === 'costBreakdown' || currentView === 'assessmentResults' || currentView === 'systemSchematic' || currentView === 'contractorChecklist' || currentView === 'propertyForm' || currentView === 'calculating';
  const isReportsActive = currentView === 'assessmentHistory';
  const isChatActive = currentView === 'chatDefault' || currentView === 'chatActive';

  return (
    <nav aria-label="Main navigation" className="hidden lg:flex flex-col p-4 space-y-4 bg-surface-container text-secondary font-label-sm text-label-sm docked left-0 h-full w-64 border-r border-outline-variant/30 shadow-lg scale-102 hover:shadow-md transition-all shrink-0 z-40">
      <div className="mb-8 px-4 py-2 flex items-center gap-3">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
        <div>
          <h1 className="text-secondary font-headline-sm font-bold">JalRakshak AI</h1>
          <p className="text-on-surface-variant mt-1 font-label-sm text-label-sm uppercase tracking-wider">Conservation Assistant</p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Start a new assessment"
        onClick={startNewAssessment}
        className="w-full bg-secondary text-on-secondary font-label-sm text-label-sm py-3 px-4 rounded-lg font-bold mb-6 hover:bg-secondary-container hover:text-on-secondary-container transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        <span className="material-symbols-outlined">add</span> New Assessment
      </button>

      <ul className="space-y-2 flex-grow">
        <li>
          <a 
            onClick={() => setView('roofAnalysis')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer select-none ${
              isMapActive 
                ? 'bg-secondary-container text-on-secondary-container font-bold scale-102 shadow-md' 
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isMapActive ? "'FILL' 1" : "'FILL' 0" }}>map</span>
            <span>Map View</span>
          </a>
        </li>

        <li>
          <a 
            onClick={() => setView('costBreakdown')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer select-none ${
              isAssessmentActive 
                ? 'bg-secondary-container text-on-secondary-container font-bold scale-102 shadow-md' 
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isAssessmentActive ? "'FILL' 1" : "'FILL' 0" }}>analytics</span>
            <span>Assessment</span>
          </a>
        </li>

        <li>
          <a 
            onClick={() => setView('assessmentHistory')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer select-none ${
              isReportsActive 
                ? 'bg-secondary-container text-on-secondary-container font-bold scale-102 shadow-md' 
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isReportsActive ? "'FILL' 1" : "'FILL' 0" }}>description</span>
            <span>Reports</span>
          </a>
        </li>

        <li>
          <a 
            onClick={() => setView('chatDefault')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer select-none ${
              isChatActive 
                ? 'bg-secondary-container text-on-secondary-container font-bold scale-102 shadow-md' 
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isChatActive ? "'FILL' 1" : "'FILL' 0" }}>smart_toy</span>
            <span>Expert Chat</span>
          </a>
        </li>
      </ul>

      {variant === 'avatar' ? (
        <div className="mt-auto pt-4 border-t border-outline-variant/30 px-2">
          <div className="flex items-center gap-3">
            <img className="w-10 h-10 rounded-full object-cover" alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXh_lo2HO4-Yrwv8RgB72lTbJC88gAstyZMTO-wfK2JlN45399ns-k8DbPtoh8O34NUA5UXFI1j_ZsW_kjAevoeGNfIRFfqtjNddFfTFLlKRASiewlSayzzBbeJ6nDWASK_DH86KJ7hd1TrBok_Bu_msOGI6-QWXmOM1mfYKda_DKbWZSKNp9wa500kBK24ewlGfsFoVGbd-n1lXCZL0EwjpqPVhtov_1nBZw0q-H2aYz21BeBjXydSQ" />
            <div>
              <p className="font-label-sm text-label-sm font-bold">User Profile</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Admin</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-auto border-t border-outline-variant/30 pt-4 flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant border border-outline-variant/50">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-bold text-on-surface">User Profile</span>
            <span className="text-[10px] text-on-surface-variant">Admin</span>
          </div>
        </div>
      )}
    </nav>
  );
}
