import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import BottomNavBar from '../layout/BottomNavBar';

const STATUS_MESSAGES = [
  'Analyzing topographical data...',
  'Sizing your system...',
  'Calculating catchment capacity...',
  'Evaluating soil permeability...',
  'Optimizing placement logic...',
  'Finalizing assessment...',
];

export default function CalculatingResults() {
  const { setView } = useApp();
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 12000;
    const updateInterval = 50;
    const steps = totalDuration / updateInterval;
    const progressIncrement = 100 / steps;
    let currentProgress = 0;
    let msgChangeCounter = 0;

    const timer = setInterval(() => {
      currentProgress = Math.min(currentProgress + progressIncrement, 100);
      setProgress(currentProgress);

      msgChangeCounter += updateInterval;
      if (msgChangeCounter >= totalDuration / STATUS_MESSAGES.length) {
        msgChangeCounter = 0;
        setStatusIndex(prev => Math.min(prev + 1, STATUS_MESSAGES.length - 1));
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
      }
    }, updateInterval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AppShell
      sidebar={<Sidebar />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 h-full w-full relative bg-background overflow-hidden"
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-transparent pointer-events-none" />

      {/* Centered loader card */}
      <div className="relative h-full w-full flex items-center justify-center p-container-padding-mobile lg:p-container-padding-desktop">
        <div className="w-full max-w-md glass-card rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-outline-variant/20 p-8 lg:p-10 flex flex-col items-center text-center">

          {/* Animated icon */}
          <div className="w-16 h-16 rounded-2xl bg-secondary-fixed/20 flex items-center justify-center mb-6 relative">
            <span className="material-symbols-outlined text-secondary text-3xl animate-pulse">memory</span>
            <div className="absolute inset-0 rounded-2xl border border-secondary/30 animate-ping" style={{ animationDuration: '3s' }} />
          </div>

          {/* Headline */}
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Running AI Analysis</h2>

          {/* Animated status text */}
          <div className="h-6 mb-8 flex items-center justify-center w-full relative overflow-hidden">
            <p
              key={statusIndex}
              className="font-body-md text-body-md text-on-surface-variant absolute w-full text-center transition-all duration-500"
            >
              {STATUS_MESSAGES[statusIndex]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <div className="w-full flex justify-end mt-2">
            <span className="font-data-mono text-label-sm text-outline">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Demo bypass button (dev only) */}
      {import.meta.env.DEV && (
        <div className="absolute bottom-20 lg:bottom-4 right-4 z-50">
          <button
            onClick={() => setView('assessmentResults')}
            className="bg-secondary text-on-secondary px-4 py-2 rounded-lg font-bold text-xs shadow-lg cursor-pointer"
          >
            View Results (Demo Bypass)
          </button>
        </div>
      )}
    </AppShell>
  );
}
