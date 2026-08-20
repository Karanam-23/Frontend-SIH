import React from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';

export default function AssessmentResults() {
  const { setView, activeAssessment } = useApp();

  // SRS §6.3.1 schema fields
  const yieldVal    = activeAssessment
    ? (activeAssessment.hydrology?.annual_harvestable_yield_litres ?? 0).toLocaleString('en-IN')
    : '83,935';
  const areaVal     = activeAssessment ? (activeAssessment.rooftop?.area_sqm ?? 116.1) : 116.1;
  const rainfallVal = activeAssessment ? (activeAssessment.hydrology?.annual_precipitation_mm ?? 850) : 850;
  const strategy    = activeAssessment?.recommendations?.primary_strategy;
  const recommendationTitle = strategy?.type
    ? strategy.type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Dual-Recharge Hybrid System';
  const recommendationText  = strategy?.description
    ?? 'Combining rooftop collection with surface runoff infiltration provides the optimal ROI for your terrain.';

  return (
    <AppShell
      sidebar={<Sidebar />}
      header={<TopAppBar title="Assessment Results" />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 overflow-y-auto p-container-padding-mobile md:p-container-padding-desktop pb-24 lg:pb-8"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-gutter">
          <div className="mb-section-gap">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Assessment Summary</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Your property exhibits high potential for rainwater harvesting.</p>
          </div>

          <div className="bg-surface card-elevation rounded-xl overflow-hidden flex flex-col md:flex-row relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary md:w-1 md:h-full"></div>
            <div className="p-8 flex-1 flex flex-col justify-center">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-4">Estimated Yield</span>
              <div className="flex items-baseline mb-2">
                <span className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary" id="animated-yield">{yieldVal}</span>
                <span className="font-headline-sm text-headline-sm text-on-surface-variant ml-2">Litres/year</span>
              </div>
              <p className="font-body-lg text-body-lg text-primary mb-6">~{(activeAssessment ? Math.round((activeAssessment.hydrology?.annual_harvestable_yield_litres ?? 83935) / 13) : 6456)} household water drums saved annually.</p>
              <div className="flex items-center space-x-2 text-tertiary-fixed-dim bg-tertiary-container/10 w-fit px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined fill text-[18px]">verified</span>
                <span className="font-label-sm text-label-sm font-semibold">High confidence based on regional rainfall.</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 flex-1 flex flex-col justify-between border-l border-outline-variant/20">
              <div>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-4">Primary Recommendation</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">{recommendationTitle}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{recommendationText}</p>
              </div>
              <div className="mt-8">
                <button onClick={() => setView('costBreakdown')} className="w-full sm:w-auto bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-inverse-surface transition-colors cursor-pointer">
                  Review System Design
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-gutter">
            <div className="bg-surface card-elevation rounded-xl p-6 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-fixed rounded-l-xl"></div>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-2">Catchment Area</span>
              <div className="font-data-mono text-data-mono text-primary">{areaVal} sq.m</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Rooftop and paved surfaces.</p>
            </div>

            <div className="bg-surface card-elevation rounded-xl p-6 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-fixed rounded-l-xl"></div>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest block mb-2">Avg. Rainfall</span>
              <div className="font-data-mono text-data-mono text-primary">{rainfallVal} mm/yr</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Historical 10-year average.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-gutter">
          <div className="bg-surface card-elevation rounded-xl p-6 border border-outline-variant/30">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-4 border-b border-outline-variant/20 pb-4">Property Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="font-body-md text-body-md text-on-surface-variant">Type</span>
                <span className="font-data-mono text-data-mono text-primary text-sm">Residential</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-body-md text-body-md text-on-surface-variant">Soil Type</span>
                <span className="font-data-mono text-data-mono text-primary text-sm">Clay Loam</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-body-md text-body-md text-on-surface-variant">Slope</span>
                <span className="font-data-mono text-data-mono text-primary text-sm">Moderate (5%)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-body-md text-body-md text-on-surface-variant">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-fixed/20 text-on-tertiary-fixed-variant">
                  Assessed
                </span>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-outline-variant/20">
              <button className="w-full flex justify-center items-center space-x-2 border border-primary text-primary bg-transparent font-label-sm text-label-sm px-4 py-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
                <span>View Detailed Report</span>
              </button>
            </div>
          </div>

          <div onClick={() => setView('roofAnalysis')} className="bg-surface card-elevation rounded-xl overflow-hidden border border-outline-variant/30 relative h-48 group cursor-pointer">
            <div className="bg-cover bg-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300" data-alt="Satellite preview property map." style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoFcmvA5CPdZjcyE5Ui4Kv_HTmINpQoLWgXzLh3K-dxEKMxWaDgB2Z1ST3wUqm3yQrvM9VW2TOKvcfg_-gPsdumtEWArhBG_Vuab6j0otp0MwtACoouc_eITn8dralLcfmN3iLwtiSvpH2UhvNuQVr88z9uEcIk9V2Bm_1SGnd2Lc5q3OcmBO5jNJIsBax2xEALE7-SQWJUie7k2KYBdJS8Z3cChZdyWDkBV2PTo26UoLAfBgqYAL3gA')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <span className="font-label-sm text-label-sm text-on-primary opacity-80">Location</span>
                <div className="font-headline-sm text-headline-sm text-on-primary">Site Map</div>
              </div>
              <div className="bg-surface/20 backdrop-blur-md p-2 rounded-full border border-surface/30">
                <span className="material-symbols-outlined text-on-primary">open_in_full</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
