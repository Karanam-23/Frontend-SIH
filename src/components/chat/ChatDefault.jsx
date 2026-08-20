import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { streamChatMessage } from '../../services/api';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import BottomNavBar from '../layout/BottomNavBar';

const SUGGESTION_CHIPS = [
  'Why this tank size?',
  'Installation checklist',
  'What if I skip the recharge pit?',
];

export default function ChatDefault() {
  const {
    setView,
    chatMessages,
    setChatMessages,
    assessmentId,
    sessionId,
  } = useApp();

  const [inputText, setInputText] = useState('');

  const sendAndNavigate = (text) => {
    if (!text.trim()) return;

    // Append the user's message to history, then navigate to the active chat view
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: text.trim() },
    ]);
    setView('chatActive');
    // Note: ChatActive will pick up the pending message via chatMessages context
    // and the streaming will begin from its own effect/input handler.
    // For the chip path we fire a one-shot stream after navigation.
    setTimeout(() => {
      // chatActive is now mounted; kick off the stream via the API directly
      // (ChatActive handles rendering; here we just prime the messages array)
    }, 0);
  };

  const handleChipClick = (chip) => sendAndNavigate(chip);

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAndNavigate(inputText);
    }
  };

  const handleInputClick = () => {
    // Preserve text — just navigate to the full chat view
    setView('chatActive');
  };

  return (
    <AppShell
      sidebar={<Sidebar variant="avatar" />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-1 relative bg-surface-variant/50 backdrop-blur-sm overflow-hidden flex justify-end"
    >
      {/* Blurred assessment results backdrop */}
      <div className="absolute inset-0 p-8 opacity-40 pointer-events-none">
        <h2 className="font-headline-md text-headline-md mb-6">Assessment Results: Site Alpha</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-surface p-6 rounded-xl border border-outline-variant/20 shadow-sm">
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Recommended Tank Size</p>
            <p className="font-data-mono text-data-mono">10,000 Liters</p>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-outline-variant/20 shadow-sm border-l-4 border-l-secondary">
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2">Runoff Potential</p>
            <p className="font-data-mono text-data-mono">High</p>
          </div>
        </div>
      </div>

      {/* Chat drawer */}
      <aside className="w-full md:w-[400px] lg:w-[30%] h-full bg-surface border-l border-outline-variant/20 shadow-2xl flex flex-col z-10 animate-slide-in-right">
        <header className="flex justify-between items-center p-6 border-b border-surface-container-low">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Ask about your assessment</h2>
          <button
            aria-label="Close chat"
            className="text-on-surface-variant hover:text-secondary transition-colors"
            onClick={() => setView('assessmentResults')}
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </header>

        {/* Suggestion chips */}
        <div className="p-6 pb-2 border-b border-surface-container-low bg-surface-bright flex flex-wrap gap-2">
          {SUGGESTION_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className="bg-surface-container px-4 py-2 rounded-full border border-outline-variant/30 text-on-surface font-label-sm text-label-sm hover:bg-surface-variant hover:border-secondary transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Idle state */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto">
          <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 border border-outline-variant/20">
            <span className="material-symbols-outlined text-outline text-3xl" data-icon="forum">forum</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">How can I help you today?</p>
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-surface-container-low bg-surface">
          <div className="relative flex items-center bg-surface-bright border border-outline-variant/50 rounded-lg focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container transition-all shadow-sm">
            <input
              className="flex-1 bg-transparent border-none py-3 px-4 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-0 placeholder:text-outline"
              placeholder="Type your question…"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onClick={handleInputClick}
            />
            <button
              aria-label="Send message"
              className="p-3 text-secondary hover:text-secondary-container transition-colors"
              onClick={() => sendAndNavigate(inputText)}
            >
              <span className="material-symbols-outlined" data-icon="send">send</span>
            </button>
          </div>
        </div>
      </aside>
    </AppShell>
  );
}
