import React from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';

export default function ContractorChecklist() {
  const { setView } = useApp();

  return (
    <AppShell
      sidebar={<Sidebar />}
      header={<TopAppBar showNavLinks={true} title="Contractor Checklist" />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-grow flex-1 h-full overflow-y-auto relative pb-24 md:pb-8 p-container-padding-mobile md:p-container-padding-desktop bg-background"
    >
      <div className="max-w-4xl mx-auto bg-surface-container-lowest print-canvas border border-outline-variant/20 shadow-sm rounded-xl p-6 md:p-12 mb-24 lg:mb-8">
        {/* Card Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 pb-6 border-b border-outline-variant/30">
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Installation Checklist</h1>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">home_pin</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Property ID #JR-244</span>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto no-print">
            <button className="flex-1 md:flex-none px-5 py-2.5 rounded border border-outline text-on-surface font-label-sm text-label-sm uppercase hover:bg-surface-container-low hover:border-secondary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-base">download</span>
              Download PDF
            </button>
            <button className="flex-1 md:flex-none px-5 py-2.5 rounded border border-outline text-on-surface font-label-sm text-label-sm uppercase hover:bg-surface-container-low hover:border-secondary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-base">share</span>
              Share
            </button>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="print-item flex items-start gap-4 p-4 -mx-4 rounded-lg hover:bg-surface-container-lowest hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all border border-transparent hover:border-outline-variant/20 group cursor-pointer">
            <button className="mt-1 text-outline group-hover:text-secondary transition-colors focus:outline-none">
              <span className="material-symbols-outlined">check_box_outline_blank</span>
            </button>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-data-mono text-data-mono text-secondary opacity-80">01</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Install First-Flush Diverter at downspout</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 max-w-2xl">Ensure diverter is positioned vertically to capture the initial, most contaminated runoff before it reaches the main storage unit.</p>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30 flex flex-wrap items-center gap-x-6 gap-y-2 w-fit">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">straighten</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Material: 4-inch PVC</span>
                </div>
                <div className="w-px h-4 bg-outline-variant/50 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">height</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Clearance: 2m min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="print-item flex items-start gap-4 p-4 -mx-4 rounded-lg hover:bg-surface-container-lowest hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all border border-transparent hover:border-outline-variant/20 group cursor-pointer">
            <button className="mt-1 text-outline group-hover:text-secondary transition-colors focus:outline-none">
              <span className="material-symbols-outlined">check_box_outline_blank</span>
            </button>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-data-mono text-data-mono text-secondary opacity-80">02</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Prepare base for 5,000L Tank</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 max-w-2xl">Excavate and level the designated area. The base must be structurally sound to support the full weight of the filled tank without subsidence.</p>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30 flex flex-wrap items-center gap-x-6 gap-y-2 w-fit">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">layers</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Pad: 150mm Reinforced Concrete</span>
                </div>
                <div className="w-px h-4 bg-outline-variant/50 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">balance</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Tolerance: Level within 2°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="print-item flex items-start gap-4 p-4 -mx-4 rounded-lg hover:bg-surface-container-lowest hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all border border-transparent hover:border-outline-variant/20 group cursor-pointer">
            <button className="mt-1 text-outline group-hover:text-secondary transition-colors focus:outline-none">
              <span className="material-symbols-outlined">check_box_outline_blank</span>
            </button>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-data-mono text-data-mono text-secondary opacity-80">03</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Connect filter layers</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 max-w-2xl">Assemble the multi-stage filtration unit. Ensure materials are washed before installation to prevent initial silting of the storage tank.</p>
              
              <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-2 w-fit">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-outline"></div>
                  <span className="font-label-sm text-label-sm text-on-surface">Bottom: 20mm Gravel</span>
                </div>
                <div className="w-px h-4 bg-outline-variant/50 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
                  <span className="font-label-sm text-label-sm text-on-surface">Middle: Coarse Sand</span>
                </div>
                <div className="w-px h-4 bg-outline-variant/50 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                  <span className="font-label-sm text-label-sm text-on-surface">Top: Activated Carbon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block mt-12 pt-6 border-t border-outline-variant/30">
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center">JalRakshak AI - Official Contractor Document - Generated automatically.</p>
        </div>
      </div>
    </AppShell>
  );
}
