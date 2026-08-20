import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

// ---------------------------------------------------------------------------
// Mock geocoding stub — returns sample Delhi coordinates for any address.
// Replace this function body with a real geocoding API call when available.
// The UI component never needs to change — only this stub.
// ---------------------------------------------------------------------------
async function mockGeocode(address) {
  await new Promise((r) => setTimeout(r, 600));
  return {
    latitude: 28.5562,
    longitude: 77.2001,
    address: address || '14B, Safdarjung Enclave, New Delhi, 110029',
  };
}

export default function Home() {
  const { setView, setSelectedLocation, setAssessmentStatus, focusManualInput, setFocusManualInput } = useApp();

  const [locLoading,  setLocLoading]  = useState(false);
  const [locError,    setLocError]    = useState('');
  const [manualAddr,  setManualAddr]  = useState('');
  const [addrLoading, setAddrLoading] = useState(false);

  const inputRef = useRef(null);

  // Auto-focus the manual address field when returning from LocationPermissionDenied
  useEffect(() => {
    if (focusManualInput) {
      setFocusManualInput(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [focusManualInput, setFocusManualInput]);

  // ── Real browser geolocation ─────────────────────────────────────────────
  const handleUseCurrentLocation = () => {
    setLocError('');

    if (!navigator.geolocation) {
      setView('locationDenied');
      return;
    }

    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation({ latitude, longitude, source: 'GPS' });
        setAssessmentStatus('locationSelected');
        setLocLoading(false);
        setView('roofAnalysis');
      },
      (_err) => {
        // Denial, timeout, or position unavailable all land here
        setLocLoading(false);
        setView('locationDenied');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // ── Manual address / pincode entry ───────────────────────────────────────
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const addr = manualAddr.trim();
    if (!addr) {
      inputRef.current?.focus();
      return;
    }

    setAddrLoading(true);
    setLocError('');
    try {
      const geo = await mockGeocode(addr);
      setSelectedLocation({ ...geo, source: 'MANUAL' });
      setAssessmentStatus('locationSelected');
      setView('roofAnalysis');
    } catch {
      setLocError('Could not locate that address. Please try again.');
    } finally {
      setAddrLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col pattern-bg min-h-screen">
      {/* TopAppBar */}
      <header className="bg-surface flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop h-16 bg-surface-bright shadow-sm sticky top-0 z-50 border-b border-outline-variant/10">
        <div className="font-headline-md text-headline-md font-bold text-secondary">
          JalRakshak
        </div>
        <nav className="hidden md:flex space-x-8">
          <a
            className="text-secondary border-b-2 border-secondary pb-1 font-body-md text-body-md hover:bg-surface-container-low transition-colors duration-200 select-none cursor-pointer"
            onClick={() => setView('costBreakdown')}
          >
            Assessments
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary pb-1 font-body-md text-body-md hover:bg-surface-container-low transition-colors duration-200 select-none cursor-pointer"
            onClick={() => setView('home')}
          >
            Resources
          </a>
          <a
            className="text-on-surface-variant hover:text-secondary pb-1 font-body-md text-body-md hover:bg-surface-container-low transition-colors duration-200 select-none cursor-pointer"
            onClick={() => setView('assessmentHistory')}
          >
            History
          </a>
        </nav>
        <div className="flex space-x-4">
          <button
            onClick={() => setView('assessmentHistory')}
            className="text-primary hover:bg-surface-container-low transition-colors duration-200 p-2 rounded-full cursor-pointer"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button className="text-primary hover:bg-surface-container-low transition-colors duration-200 p-2 rounded-full cursor-pointer">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center px-container-padding-mobile md:px-container-padding-desktop py-section-gap">
        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12">

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface">
              Harvest the Heavens.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              AI-powered rainwater harvesting assessment for every Indian home. Ensure a sustainable water future
              with precision insights tailored to your location.
            </p>
          </div>

          {/* Action Area */}
          <div className="w-full max-w-xl bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 flex flex-col space-y-6 relative overflow-hidden group">

            {/* Geolocation error */}
            {locError && (
              <p className="text-red-600 font-label-sm text-label-sm text-center -mb-2">{locError}</p>
            )}

            {/* Primary CTA — geolocation */}
            <button
              onClick={handleUseCurrentLocation}
              disabled={locLoading || addrLoading}
              className="w-full bg-secondary text-on-secondary font-headline-sm text-headline-sm py-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {locLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Detecting Location…</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span>
                  <span>Use My Current Location</span>
                </>
              )}
            </button>

            <div className="flex items-center text-on-surface-variant text-sm">
              <div className="flex-grow border-t border-outline-variant/30" />
              <span className="px-4 font-label-sm text-label-sm uppercase tracking-widest text-outline">Or enter manually</span>
              <div className="flex-grow border-t border-outline-variant/30" />
            </div>

            {/* Manual address entry */}
            <form onSubmit={handleManualSubmit} className="relative flex gap-2">
              <label className="sr-only" htmlFor="address-search">Manual address search</label>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">search</span>
                </div>
                <input
                  ref={inputRef}
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body-md text-body-md placeholder-outline-variant text-on-surface"
                  id="address-search"
                  name="address-search"
                  placeholder="Enter your full address or pin code"
                  type="text"
                  value={manualAddr}
                  onChange={(e) => setManualAddr(e.target.value)}
                  disabled={locLoading || addrLoading}
                />
              </div>
              <button
                type="submit"
                disabled={locLoading || addrLoading || !manualAddr.trim()}
                className="px-4 py-3 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                {addrLoading ? (
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                )}
              </button>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 opacity-70">
            <div className="flex items-center space-x-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined">verified_user</span>
              <span>Government Compliant Data</span>
            </div>
            <div className="flex items-center space-x-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined">satellite_alt</span>
              <span>High-Res Satellite Imagery</span>
            </div>
            <div className="flex items-center space-x-2 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined">security</span>
              <span>Secure &amp; Private</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
