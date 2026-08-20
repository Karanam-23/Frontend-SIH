import React from 'react';

export default function AppShell({ 
  sidebar, 
  header, 
  bottomNav, 
  children,
  mainClassName = "flex-1 overflow-y-auto p-container-padding-mobile md:p-container-padding-desktop pb-24 lg:pb-8"
}) {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      {/* Sidebar Slot */}
      {sidebar}

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative h-full w-full">
        {/* Header Slot */}
        {header}

        {/* Dynamic Main Body Content */}
        <main className={mainClassName}>
          {children}
        </main>

        {/* Bottom Navigation Slot */}
        {bottomNav}
      </div>
    </div>
  );
}
