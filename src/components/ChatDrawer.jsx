import React from 'react';
import { useApp } from '../context/AppContext';
import ChatDefault from './chat/ChatDefault';
import ChatActive from './chat/ChatActive';

export default function ChatDrawer() {
  const { currentView } = useApp();
  
  // This represents the ChatDrawer responsibility defined in the SRS (AI chatbot drawer interface).
  // Dynamically selects the visual representation based on current active chat state.
  return (
    <div className="chat-drawer-container flex w-full h-screen overflow-hidden bg-background">
      {currentView === 'chatActive' ? <ChatActive /> : <ChatDefault />}
    </div>
  );
}
