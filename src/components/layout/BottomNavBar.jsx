import React from 'react';
import { useApp } from '../../context/AppContext';

export default function BottomNavBar() {
  const { currentView, setView } = useApp();

  const isHomeActive = currentView === 'home';
  const isMapActive = currentView === 'roofAnalysis' || currentView === 'polygonEditor';
  const isHistoryActive = currentView === 'assessmentHistory';
  const isChatActive = currentView === 'chatDefault' || currentView === 'chatActive';

  return (
    <nav aria-label="Mobile bottom navigation" className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-2 bg-surface text-secondary border-t border-outline-variant/20 shadow-inner rounded-t-xl z-50 pb-safe">
      <button
        type="button"
        aria-label="Go to home"
        onClick={() => setView('home')}
        className={`flex flex-col items-center justify-center select-none cursor-pointer ${
          isHomeActive 
            ? 'text-secondary bg-secondary-fixed/10 rounded-full px-4 py-1 font-bold scale-95 transition-transform' 
            : 'text-on-surface-variant hover:text-secondary'
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2`}
      >
        <span className={`material-symbols-outlined mb-1 select-none`} style={{ fontVariationSettings: isHomeActive ? "'FILL' 1" : "'FILL' 0" }}>home</span>
        <span className="font-label-sm text-[10px] sm:text-xs">Home</span>
      </button>

      <a 
        onClick={() => setView('roofAnalysis')} 
        className={`flex flex-col items-center justify-center select-none cursor-pointer ${
          isMapActive 
            ? 'text-secondary bg-secondary-fixed/10 rounded-full px-4 py-1 font-bold scale-95 transition-transform' 
            : 'text-on-surface-variant hover:text-secondary'
        }`}
      >
        <span className={`material-symbols-outlined mb-1 select-none`} style={{ fontVariationSettings: isMapActive ? "'FILL' 1" : "'FILL' 0" }}>explore</span>
        <span className="font-label-sm text-[10px] sm:text-xs">Map</span>
      </a>

      <a 
        onClick={() => setView('assessmentHistory')} 
        className={`flex flex-col items-center justify-center select-none cursor-pointer ${
          isHistoryActive 
            ? 'text-secondary bg-secondary-fixed/10 rounded-full px-4 py-1 font-bold scale-95 transition-transform' 
            : 'text-on-surface-variant hover:text-secondary'
        }`}
      >
        <span className={`material-symbols-outlined mb-1 select-none`} style={{ fontVariationSettings: isHistoryActive ? "'FILL' 1" : "'FILL' 0" }}>history</span>
        <span className="font-label-sm text-[10px] sm:text-xs">History</span>
      </a>

      <a 
        onClick={() => setView('chatDefault')} 
        className={`flex flex-col items-center justify-center select-none cursor-pointer ${
          isChatActive 
            ? 'text-secondary bg-secondary-fixed/10 rounded-full px-4 py-1 font-bold scale-95 transition-transform' 
            : 'text-on-surface-variant hover:text-secondary'
        }`}
      >
        <span className={`material-symbols-outlined mb-1 select-none`} style={{ fontVariationSettings: isChatActive ? "'FILL' 1" : "'FILL' 0" }}>forum</span>
        <span className="font-label-sm text-[10px] sm:text-xs">Chat</span>
      </a>
    </nav>
  );
}
