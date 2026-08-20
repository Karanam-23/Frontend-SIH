import React from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';

export default function SystemSchematicDetail() {
  const { setView, chatMessages, addChatMessage } = useApp();

  return (
    <AppShell
      sidebar={<Sidebar />}
      header={<TopAppBar title="System Schematic" mobileOnly={true} />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 h-full overflow-y-auto w-full max-w-[1200px] mx-auto px-container-padding-mobile md:px-container-padding-desktop py-section-gap pb-24 md:pb-section-gap"
    >
      <div className="mb-gutter">
        <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Technical Overview</p>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary-container">Your System Schematic</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl">A detailed breakdown of your rainwater harvesting flow, identifying key infrastructure points and recommended maintenance schedules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 tactile-card rounded-xl p-6 relative overflow-hidden flex flex-col justify-center items-center min-h-[400px]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" ></div>
          <h3 className="font-label-sm text-label-sm text-outline uppercase absolute top-6 left-6 z-10">Flow Diagram</h3>
          <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
            <img alt="Rainwater Harvesting Schematic Diagram" className="w-full h-auto object-contain z-10 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida/AP1WRLttIWV5qtYkEflQ_qF5_zxtaE5IHt9IO7d3jYoyDcWLPYM1vJmCUYY1m7jVbfOEENsAMJEGKo-XHtQQk-k0Qy2MXCH91tIvU6kjJ6pBq32jyt50nhjDjFC1mFUfKSyvRjctTET8hFCpqHOoZRQD_GdPFNsKke6_tptFbpTK1zImuoA07A2sX8A3A-KDNVQDdym3ShwfzJ2xVGGGuk2fASOpX_696weHlcrXMteBb4laaaeGBR72w-GvEDph" />

            <div className="absolute top-[10%] left-[20%] font-label-sm text-label-sm text-primary-container bg-background/80 backdrop-blur px-2 py-1 border border-outline-variant/30 rounded shadow-sm z-20">Rooftop Catchment</div>
            <div className="absolute top-[35%] right-[25%] font-label-sm text-label-sm text-primary-container bg-background/80 backdrop-blur px-2 py-1 border border-outline-variant/30 rounded shadow-sm z-20">First Flush Separator</div>
            <div className="absolute bottom-[35%] left-[25%] font-label-sm text-label-sm text-primary-container bg-background/80 backdrop-blur px-2 py-1 border border-outline-variant/30 rounded shadow-sm z-20">Filtration Unit</div>
            <div className="absolute bottom-[10%] right-[20%] font-label-sm text-label-sm text-primary-container bg-background/80 backdrop-blur px-2 py-1 border border-outline-variant/30 rounded shadow-sm z-20">Storage Tank</div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-4">
          <div className="tactile-card rounded-lg p-5 border-l-4 border-l-outline-variant">
            <h4 className="font-headline-sm text-headline-sm text-primary-container mb-2">1. Catchment</h4>
            <p className="text-on-surface-variant font-body-md text-body-md">Concrete flat roof surface capturing rainfall. Requires leaf screens to block large debris.</p>
          </div>

          <div className="tactile-card rounded-lg p-5 border-l-4 border-l-secondary">
            <h4 className="font-headline-sm text-headline-sm text-primary-container mb-2">2. Flush Diverter</h4>
            <p className="text-on-surface-variant font-body-md text-body-md">Isolates first 10-15 minutes of rainfall. Automatically resets between rainfall events.</p>
          </div>

          <div className="tactile-card rounded-lg p-5 border-l-4 border-l-outline-variant">
            <h4 className="font-headline-sm text-headline-sm text-primary-container mb-2">3. Filter System</h4>
            <p className="text-on-surface-variant font-body-md text-body-md">Dual-stage media filter removes fine sediments. Clean filter cartridges semi-annually.</p>
          </div>

          <div className="tactile-card rounded-lg p-5 border-l-4 border-l-outline-variant">
            <h4 className="font-headline-sm text-headline-sm text-primary-container mb-2">4. Storage</h4>
            <p className="text-on-surface-variant font-body-md text-body-md">10,000L reinforced concrete tank. Features calm inlet structure and overflow siphon.</p>
          </div>
        </div>

        <div className="md:col-span-12 tactile-card rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary-container">Full Installation Manual</h3>
            <p className="text-on-surface-variant font-body-md text-body-md mt-1">Get detailed technical plumbing drawings, installation checklists, and material specs.</p>
          </div>
          <button className="px-6 py-3 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-surface-tint transition-colors">Download Blueprint</button>
        </div>
      </div>
    </AppShell>
  );
}
