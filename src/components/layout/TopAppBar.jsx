import React from 'react';
import { useApp } from '../../context/AppContext';

export default function TopAppBar({ title, showNavLinks = false, mobileOnly = false }) {
  const { setView } = useApp();

  return (
    <header className={`${mobileOnly ? 'lg:hidden' : ''} bg-surface flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop h-16 shadow-sm bg-surface-bright border-b border-outline-variant/20 z-40 shrink-0`}>
      <div className="flex items-center gap-4 h-full">
        {/* Mobile Menu Toggle button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="lg:hidden text-on-surface-variant hover:text-secondary p-2 -ml-2 rounded-full hover:bg-surface-container-low transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        {/* Mobile App Title */}
        <div className="font-headline-md text-headline-md font-bold text-secondary lg:hidden select-none cursor-pointer" onClick={() => setView('home')}>
          JalRakshak
        </div>

        {/* Desktop View Title */}
        {title && (
          <div className="hidden lg:block text-headline-sm font-headline-sm select-none">
            {title}
          </div>
        )}

        {/* Sub Navigation Links for ContractorChecklist */}
        {showNavLinks && (
          <nav className="hidden md:flex gap-6 ml-8 h-full items-end">
            <a 
              className="font-label-sm text-label-sm uppercase pb-4 text-secondary border-b-2 border-secondary hover:bg-surface-container-low transition-colors duration-200 select-none cursor-pointer" 
              onClick={() => setView('costBreakdown')}
            >
              Assessments
            </a>
            <a 
              className="font-label-sm text-label-sm uppercase pb-4 text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-colors duration-200 select-none cursor-pointer" 
              onClick={() => setView('home')}
            >
              Resources
            </a>
            <a 
              className="font-label-sm text-label-sm uppercase pb-4 text-on-surface-variant hover:text-secondary hover:bg-surface-container-low transition-colors duration-200 select-none cursor-pointer" 
              onClick={() => setView('assessmentHistory')}
            >
              History
            </a>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="View assessment history"
          onClick={() => setView('assessmentHistory')}
          className="p-2 text-on-surface-variant hover:text-secondary rounded-full hover:bg-surface-container-low transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined">history</span>
        </button>
        <button
          type="button"
          aria-label="Open profile"
          className="p-2 text-on-surface-variant hover:text-secondary rounded-full hover:bg-surface-container-low transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
