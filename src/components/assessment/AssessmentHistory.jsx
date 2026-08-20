import React from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';

export default function AssessmentHistory() {
  const { setView, chatMessages, addChatMessage } = useApp();

  return (
    <AppShell
      sidebar={<Sidebar />}
      header={<TopAppBar title="Assessment History" mobileOnly={true} />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-grow flex-1 h-full overflow-y-auto relative pb-24 md:pb-8 p-container-padding-mobile md:p-container-padding-desktop bg-background flex flex-col items-center"
    >
      <div className="w-full max-w-4xl text-left mb-gutter">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Reports</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Access your past rainwater harvesting calculations and system designs.</p>
      </div>

      <div className="w-full max-w-4xl space-y-4">
        {/* Record 1 */}
        <div onClick={() => setView('assessmentResults')} className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-secondary transition-all flex justify-between items-center group cursor-pointer">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/10 pb-4 mb-4">
              <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors font-semibold truncate">Primary Residence (Assessed)</span>
              <span className="font-data-mono text-data-mono text-secondary text-sm">Site ID: JR-244</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2">
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Date</p>
                <p className="font-body-md text-body-md font-medium text-on-surface text-sm">Aug 19, 2026</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Est. Yield</p>
                <p className="font-data-mono text-data-mono text-secondary text-sm">18,217 L/yr</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Roof Area</p>
                <p className="font-body-md text-body-md font-medium text-on-surface text-sm">120 sq.m</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-1.5 text-secondary">
                  <span className="material-symbols-outlined text-[16px] filled">check_circle</span>
                  <span className="font-body-md text-body-md font-semibold text-sm">Completed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center rounded-full bg-surface-container-low group-hover:bg-surface-variant transition-colors text-on-surface-variant group-hover:text-secondary">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </div>

        {/* Record 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-secondary transition-all flex justify-between items-center group cursor-pointer opacity-70">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/10 pb-4 mb-4">
              <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors font-semibold truncate">Backyard Shed (Draft)</span>
              <span className="font-data-mono text-data-mono text-outline text-sm">Site ID: JR-243</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2">
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Date</p>
                <p className="font-body-md text-body-md font-medium text-on-surface text-sm">Aug 18, 2026</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Est. Yield</p>
                <p className="font-data-mono text-data-mono text-on-surface text-sm">--</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Roof Area</p>
                <p className="font-body-md text-body-md font-medium text-on-surface text-sm">45 sq.m</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-1.5 text-outline">
                  <span className="w-2 h-2 rounded-full bg-outline-variant border border-outline"></span>
                  <span className="font-body-md text-body-md font-medium text-sm">Draft</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex self-center shrink-0 w-10 h-10 items-center justify-center rounded-full bg-surface-container-low group-hover:bg-surface-variant transition-colors text-on-surface-variant group-hover:text-secondary">
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </div>
      </div>
      <div className="mt-12 flex justify-center w-full max-w-4xl">
        <button className="px-6 py-2.5 rounded-lg border-2 border-outline-variant text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm tracking-wide">
          Load Older Records
        </button>
      </div>
    </AppShell>
  );
}
