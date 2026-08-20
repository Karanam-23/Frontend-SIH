import React from 'react';
import { useApp } from '../../context/AppContext';

export default function MinistryDashboard() {
  const { setView, chatMessages, addChatMessage } = useApp();

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      <nav className="hidden lg:flex flex-col p-4 space-y-4 bg-surface-container text-secondary font-label-sm text-label-sm h-full w-64 border-r border-outline-variant/30 shadow-lg shrink-0 z-40">
<div className="mb-8 px-2 flex items-center space-x-3">
<span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
<div>
<div className="text-secondary font-headline-sm font-bold">JalRakshak</div>
<div className="text-on-surface-variant font-label-sm text-label-sm">Ministry Portal</div>
</div>
</div>
<div className="space-y-2 flex-grow">

<a className="flex items-center space-x-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold hover:shadow-md transition-all scale-102 select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined select-none">description</span>
<span>Reports</span>
</a>
<a className="flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:shadow-md select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined select-none">map</span>
<span>Map View</span>
</a>
<a className="flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:shadow-md select-none" onClick={() => setView('costBreakdown')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined select-none">analytics</span>
<span>Assessment</span>
</a>
<a className="flex items-center space-x-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all hover:shadow-md select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined select-none">smart_toy</span>
<span>Expert Chat</span>
</a>
</div>
<div className="mt-auto">
<button className="w-full bg-secondary text-on-secondary py-3 px-4 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
<span className="material-symbols-outlined">add</span>
<span>New Report</span>
</button>
</div>
</nav>

      <main className="flex-grow flex-1 h-full overflow-y-auto relative pb-20 lg:pb-0">

<header className="bg-surface border-b border-outline-variant/20 shadow-sm flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop h-16 sticky top-0 z-30">
<div className="flex items-center space-x-4 lg:hidden">
<span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
<span className="font-headline-sm text-headline-sm font-bold text-secondary">JalRakshak</span>
</div>
<div className="hidden lg:flex items-center space-x-6 text-on-surface-variant font-label-sm text-label-sm">
<span className="text-secondary border-b-2 border-secondary pb-1">District Overview</span>
<span className="hover:text-secondary cursor-pointer transition-colors duration-200">State Analytics</span>
<span className="hover:text-secondary cursor-pointer transition-colors duration-200">Policy Interventions</span>
</div>
<div className="flex items-center space-x-4 text-primary">
<button aria-label="Export PDF" className="hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200">
<span className="material-symbols-outlined">picture_as_pdf</span>
</button>
<button aria-label="Export CSV" className="hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200">
<span className="material-symbols-outlined">download</span>
</button>
<button aria-label="User Profile" className="hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>

<div className="p-container-padding-mobile md:p-container-padding-desktop max-w-[1200px] mx-auto space-y-gutter">

<div className="flex flex-col md:flex-row md:justify-between md:items-end mb-section-gap pt-4">
<div>
<p className="font-label-sm text-label-sm text-outline tracking-wider uppercase mb-2">District Aggregation</p>
<h1 className="font-display-lg-mobile md:font-display-lg text-on-surface">Pune Urban & Rural</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Analysis of groundwater recharge potential, compliance metrics, and active infrastructure assessments for Q3 2024.</p>
</div>
<div className="mt-4 md:mt-0 flex space-x-3">
<button className="px-4 py-2 border-[1.5px] border-primary-container text-primary-container font-label-sm text-label-sm rounded hover:bg-surface-container-low transition-colors">
                        Filter Parameters
                    </button>
<button className="px-4 py-2 bg-secondary text-on-secondary font-label-sm text-label-sm rounded hover:opacity-90 transition-opacity shadow-sm">
                        Generate Brief
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="data-card status-bar-clay rounded-xl p-6 flex flex-col justify-between h-32">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Est. Recharge Potential</p>
<div className="flex items-end justify-between">
<span className="font-data-mono text-[32px] font-bold text-on-surface">45.2M</span>
<span className="font-body-sm text-on-surface-variant pb-1">Liters/Yr</span>
</div>
</div>

<div className="data-card status-bar-teal rounded-xl p-6 flex flex-col justify-between h-32">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Active Assessments</p>
<div className="flex items-end justify-between">
<span className="font-data-mono text-[32px] font-bold text-on-surface">1,204</span>
<div className="flex items-center text-tertiary-fixed-dim pb-1 space-x-1">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span className="font-label-sm text-label-sm">+12%</span>
</div>
</div>
</div>

<div className="data-card status-bar-grey rounded-xl p-6 flex flex-col justify-between h-32">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Mandate Compliance</p>
<div className="flex items-end justify-between">
<span className="font-data-mono text-[32px] font-bold text-on-surface">78.5%</span>
<span className="font-body-sm text-on-surface-variant pb-1">Across 4 zones</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-8">

<div className="lg:col-span-8 data-card rounded-xl overflow-hidden flex flex-col h-[600px] relative">
<div className="p-4 border-b border-outline-variant/20 bg-surface-container-lowest flex justify-between items-center z-10">
<h2 className="font-headline-sm text-headline-sm text-on-surface">Choropleth: Recharge Density</h2>
<div className="flex space-x-2">
<button className="p-1 rounded hover:bg-surface-container"><span className="material-symbols-outlined text-outline">layers</span></button>
<button className="p-1 rounded hover:bg-surface-container"><span className="material-symbols-outlined text-outline">filter_list</span></button>
</div>
</div>

<div className="flex-grow relative bg-surface-container-high map-bg">

<div className="absolute inset-0 bg-cover bg-center w-full h-full opacity-60 mix-blend-multiply" data-alt="A highly detailed, professional top-down digital map of a district showing choropleth data visualization. The map uses varying shades of terracotta, rust, and clay colors to indicate density on a pale, bone-colored background grid. Clean lines, minimalist UI overlays, light mode aesthetic, institutional feel." style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL65ANGWM6avPZWXlcZ2WROFq0kEIdl2c3iUQcYdzaKc2gF0SKXHcN-2QwzMp-9qno6tKgFSESBHruhUbrrVAMxHn8jLdwGSf-Gwkjw-5p15fKGPv5sZXciUStStEpInd7kLF1bVlzXSgWzL5Jz54TGmvKZZpxte09JCNV78qqZcvXBYHXJNKqEsNGsPY5qt_Cx8xHI3TbTKSsTP34z-ci670yHrttUiRwuqGCdjdOVsrETeFftQ87Lw')` }}></div>

<div className="absolute bottom-6 right-6 flex flex-col space-y-2">
<button className="glass-panel p-2 rounded shadow-sm text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">add</span></button>
<button className="glass-panel p-2 rounded shadow-sm text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">remove</span></button>
<button className="glass-panel p-2 rounded shadow-sm text-on-surface hover:bg-surface-container transition-colors mt-4"><span className="material-symbols-outlined">my_location</span></button>
</div>

<div className="absolute bottom-6 left-6 glass-panel p-4 rounded-lg shadow-sm">
<p className="font-label-sm text-label-sm text-on-surface mb-2 font-bold">Potential (L/m²)</p>
<div className="flex items-center space-x-1 mb-1">
<div className="w-4 h-4 bg-secondary-fixed"></div><span className="font-label-sm text-[10px] text-on-surface-variant">Low (&lt; 50)</span>
</div>
<div className="flex items-center space-x-1 mb-1">
<div className="w-4 h-4 bg-secondary-container"></div><span className="font-label-sm text-[10px] text-on-surface-variant">Medium (50-150)</span>
</div>
<div className="flex items-center space-x-1">
<div className="w-4 h-4 bg-secondary"></div><span className="font-label-sm text-[10px] text-on-surface-variant">High (&gt; 150)</span>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col space-y-gutter">

<div className="data-card rounded-xl p-6 flex-grow flex flex-col">
<div className="flex justify-between items-start mb-4">
<h3 className="font-headline-sm text-[16px] text-on-surface">Zonal Distribution</h3>
<span className="material-symbols-outlined text-outline text-sm">more_vert</span>
</div>

<div className="flex-grow flex items-end space-x-2 h-40 mt-4 border-b border-l border-outline-variant/30 pb-2 pl-2">
<div className="w-1/4 bg-secondary-fixed-dim hover:bg-secondary-container transition-colors relative group h-[40%] rounded-t-sm">
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface px-1 rounded">North</span>
</div>
<div className="w-1/4 bg-secondary hover:bg-on-secondary-fixed-variant transition-colors relative group h-[85%] rounded-t-sm">
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface px-1 rounded">South</span>
</div>
<div className="w-1/4 bg-secondary-fixed hover:bg-secondary-fixed-dim transition-colors relative group h-[30%] rounded-t-sm">
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface px-1 rounded">East</span>
</div>
<div className="w-1/4 bg-secondary-container hover:bg-secondary transition-colors relative group h-[65%] rounded-t-sm">
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-inverse-on-surface px-1 rounded">West</span>
</div>
</div>
<div className="flex justify-between text-[10px] text-outline mt-2 px-2">
<span>N</span><span>S</span><span>E</span><span>W</span>
</div>
</div>

<div className="data-card rounded-xl p-6 flex-grow flex flex-col">
<div className="flex justify-between items-start mb-4">
<h3 className="font-headline-sm text-[16px] text-on-surface">Priority Intervention Areas</h3>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
<div>
<p className="font-body-md text-sm font-semibold text-on-surface">Wagholi Industrial</p>
<p className="font-label-sm text-[10px] text-outline">Deficit: High</p>
</div>
<span className="font-data-mono text-sm text-error">12.4%</span>
</div>
<div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
<div>
<p className="font-body-md text-sm font-semibold text-on-surface">Hinjawadi Phase 3</p>
<p className="font-label-sm text-[10px] text-outline">Deficit: Moderate</p>
</div>
<span className="font-data-mono text-sm text-secondary-container">28.1%</span>
</div>
<div className="flex justify-between items-center">
<div>
<p className="font-body-md text-sm font-semibold text-on-surface">Kalyani Nagar</p>
<p className="font-label-sm text-[10px] text-outline">Deficit: Improving</p>
</div>
<span className="font-data-mono text-sm text-tertiary-fixed-dim">45.0%</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-2 bg-surface text-secondary border-t border-outline-variant/20 shadow-inner rounded-t-xl z-50">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary select-none" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined mb-1 select-none">home</span>
<span className="font-label-sm text-label-sm select-none">Home</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary select-none" onClick={() => setView('roofAnalysis')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined mb-1 select-none">explore</span>
<span className="font-label-sm text-label-sm select-none">Map</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary bg-secondary-fixed/10 rounded-full px-4 py-1 scale-90 transition-transform select-none" onClick={() => setView('assessmentHistory')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined mb-1 text-secondary select-none" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
<span className="font-label-sm text-label-sm font-bold select-none">Reports</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary select-none" onClick={() => setView('chatDefault')} style={{ cursor: 'pointer' }}>
<span className="material-symbols-outlined mb-1 select-none">forum</span>
<span className="font-label-sm text-label-sm select-none">Chat</span>
</a>
      </nav>
    </div>
  );
}
