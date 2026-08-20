import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// SRS Architecture container components
import DashboardView from './components/DashboardView';
import PolygonEditor from './components/PolygonEditor';
import SchematicViewer from './components/SchematicViewer';
import ChatDrawer from './components/ChatDrawer';

// Assessment flow components
// MinistryDashboard is intentionally NOT imported here.
// It is a separate analyst/government entry point and must not be
// reachable from the citizen-facing app shell. (Step 12 / SRS isolation)
import CostBreakdown from './components/assessment/CostBreakdown';
import ContractorChecklist from './components/assessment/ContractorChecklist';
import AssessmentHistory from './components/assessment/AssessmentHistory';
import RoofAnalysis from './components/assessment/RoofAnalysis';
import PropertyDetailsForm from './components/assessment/PropertyDetailsForm';
import AssessmentResults from './components/assessment/AssessmentResults';

// Shared flow components
import ServiceDegradedState from './components/shared/ServiceDegradedState';
import LowConfidenceFallback from './components/shared/LowConfidenceFallback';
import CalculatingResults from './components/shared/CalculatingResults';
import LocationPermissionDenied from './components/shared/LocationPermissionDenied';

function AppContent() {
  const { currentView, setView } = useApp();
  const [isDemoNavOpen, setIsDemoNavOpen] = React.useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <DashboardView />;
      case 'costBreakdown':
        return <CostBreakdown />;
      case 'polygonEditor':
        return <PolygonEditor />;
      // 'ministryDashboard' is intentionally absent — not a citizen-facing view
      case 'contractorChecklist':
        return <ContractorChecklist />;
      case 'systemSchematic':
        return <SchematicViewer />;
      case 'assessmentHistory':
        return <AssessmentHistory />;
      case 'roofAnalysis':
        return <RoofAnalysis />;
      case 'propertyForm':
        return <PropertyDetailsForm />;
      case 'assessmentResults':
        return <AssessmentResults />;
      case 'chatDefault':
      case 'chatActive':
        return <ChatDrawer />;
      case 'serviceDegraded':
        return <ServiceDegradedState />;
      case 'lowConfidence':
        return <LowConfidenceFallback />;
      case 'calculating':
        return <CalculatingResults />;
      case 'locationDenied':
        return <LocationPermissionDenied />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-on-background flex flex-col">
      {renderView()}

      {/* ── Floating Dev Screen Navigator — for manual QA only ────────────────
          The real user flow does NOT depend on this. A citizen can complete
          the full assessment journey without ever touching this panel.
          (Steps 9, 12) ── */}
      {import.meta.env.DEV && (
        isDemoNavOpen ? (
          <div className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-50 bg-white/95 backdrop-blur-sm border border-outline-variant/50 shadow-xl rounded-xl p-3 max-h-64 overflow-y-auto w-64 text-left flex flex-col gap-2">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-secondary select-none">Screen Navigator</h4>
              <button
                onClick={() => setIsDemoNavOpen(false)}
                className="text-on-surface-variant hover:text-secondary rounded-full p-0.5 hover:bg-surface-container-low transition-colors"
                title="Collapse Navigator"
              >
                <span className="material-symbols-outlined text-[16px] block">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1 text-[11px] font-medium">
              {[
                { key: 'home',              label: '1. Home Dashboard'         },
                { key: 'propertyForm',      label: '2. Property Form'          },
                { key: 'calculating',       label: '3. Calculating Loader'     },
                { key: 'assessmentResults', label: '4. Assessment Results'     },
                { key: 'costBreakdown',     label: '5. Detailed BoQ'           },
                { key: 'systemSchematic',   label: '6. System Schematic'       },
                { key: 'contractorChecklist',label:'7. Contractor Checklist'   },
                { key: 'assessmentHistory', label: '8. Assessment History'     },
                { key: 'roofAnalysis',      label: '9. Roof Analysis'          },
                { key: 'polygonEditor',     label: '10. Polygon Editor'        },
                { key: 'chatDefault',       label: '11. Expert Chat (Home)'    },
                { key: 'chatActive',        label: '12. Active Chat'           },
                { key: 'locationDenied',    label: '13. Location Denied Error' },
                { key: 'serviceDegraded',   label: '14. Service Degraded Error'},
                { key: 'lowConfidence',     label: '15. Low Confidence Warning'},
                // ministryDashboard (16) intentionally removed — analyst-only
              ].map((view) => (
                <button
                  key={view.key}
                  onClick={() => setView(view.key)}
                  className={`text-left px-2 py-1.5 rounded transition-colors ${
                    currentView === view.key
                      ? 'bg-secondary text-on-secondary font-bold'
                      : 'hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-50">
            <button
              onClick={() => setIsDemoNavOpen(true)}
              className="bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-lg rounded-full px-3 py-2 text-xs font-bold flex items-center gap-1.5 border border-outline-variant/30"
              title="Expand Navigator"
            >
              <span className="material-symbols-outlined text-[16px] block">menu_open</span>
              <span>Navigator</span>
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
