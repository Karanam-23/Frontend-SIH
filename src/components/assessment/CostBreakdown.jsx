import React from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import TopAppBar from '../layout/TopAppBar';
import BottomNavBar from '../layout/BottomNavBar';

export default function CostBreakdown() {
  const { setView, activeAssessment } = useApp();

  const defaultCostItems = [
    { category: 'Filtration', description: 'Filter Unit (Dual Stage)', qty: '2 Nos', amount: 45000, colorClass: 'bg-secondary' },
    { category: 'Collection', description: 'First Flush Diverter (PVC)', qty: '4 Nos', amount: 12500, colorClass: 'bg-tertiary-container' },
    { category: 'Storage', description: 'Storage Tank (10,000L RCC)', qty: '1 Unit', amount: 120000, colorClass: 'bg-outline' },
    { category: 'Conveyance', description: 'Piping & Fittings (HDPE)', qty: '150 Rmt', amount: 35000, colorClass: 'bg-on-surface-variant' }
  ];

  const COLOR_CLASSES = ['bg-secondary','bg-tertiary-container','bg-outline','bg-on-surface-variant'];

  // SRS §6.3.1 financial_boq schema
  const boq       = activeAssessment?.financial_boq;
  const lineItems = boq?.line_items ?? defaultCostItems;
  const costItems = lineItems.map((item, i) => ({
    ...item,
    // new schema uses total_cost_inr; old mock used amount — support both
    amount:     item.total_cost_inr ?? item.amount ?? 0,
    colorClass: item.colorClass ?? COLOR_CLASSES[i % COLOR_CLASSES.length],
  }));
  const totalCost = boq?.total_estimated_cost_range?.midpoint ?? (activeAssessment?.total_cost ?? 212500);
  const payback   = boq?.estimated_payback_years
    ? `${boq.estimated_payback_years} years`
    : '4.5 years';

  return (
    <AppShell
      sidebar={<Sidebar />}
      header={<TopAppBar title="Financial Assessment" mobileOnly={true} />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 overflow-y-auto pt-20 md:pt-8 px-container-padding-mobile md:px-container-padding-desktop pb-24 md:pb-8 max-w-[1200px] mx-auto w-full"
    >
      <div className="mb-section-gap">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Financial Assessment</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">Detailed cost breakdown and ROI projection for the proposed rainwater harvesting system at Site A-14.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline/20 overflow-hidden relative group hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
        <div className="p-gutter border-b border-outline-variant/30 bg-surface flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Bill of Quantities</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Itemized implementation cost</p>
          </div>
          <div className="bg-tertiary-fixed-dim/20 border border-tertiary-fixed px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block text-[10px]">Estimated Payback</span>
              <span className="font-data-mono text-data-mono text-on-surface">{payback}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-outline uppercase font-label-sm text-[11px] tracking-wider bg-surface-container-low/40">
                <th className="p-4 pl-6">Category</th>
                <th className="p-4">Description</th>
                <th className="p-4">Quantity</th>
                <th className="p-4 text-right pr-6">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-md text-body-md text-on-surface">
              {costItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="p-4 pl-6 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.colorClass || 'bg-secondary'}`}></span>
                    <span className="font-semibold">{item.category}</span>
                  </td>
                  <td className="p-4 text-on-surface-variant text-sm">{item.description}</td>
                  <td className="p-4 font-data-mono text-sm">{item.qty}</td>
                  <td className="p-4 text-right pr-6 font-data-mono font-semibold">₹ {item.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
              <tr className="bg-surface border-t border-outline-variant/40">
                <td colSpan="3" className="p-4 pl-6 font-headline-sm text-headline-sm text-primary font-bold">Total Estimated Budget</td>
                <td className="p-4 text-right pr-6 font-display-lg text-headline-md text-secondary font-bold">₹ {totalCost.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm flex items-start gap-2 border-t border-outline-variant/30">
          <span className="material-symbols-outlined text-[16px] mt-0.5">info</span>
          <p>Estimates are based on current market rates and standard site conditions. Excludes civil excavation costs.</p>
        </div>
      </div>
    </AppShell>
  );
}
