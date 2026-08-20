import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { streamChatMessage } from '../../services/api';
import AppShell from '../layout/AppShell';
import Sidebar from '../layout/Sidebar';
import BottomNavBar from '../layout/BottomNavBar';

export default function ChatActive() {
  const {
    chatMessages,
    setChatMessages,
    assessmentId,
    sessionId,
  } = useApp();

  const [inputText,    setInputText]    = useState('');
  const [isStreaming,  setIsStreaming]  = useState(false);
  const [streamingText,setStreamingText]= useState('');
  const messagesEndRef = useRef(null);
  const abortRef       = useRef(null);   // holds the cancel fn returned by streamChatMessage

  // Auto-scroll to bottom on new content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, streamingText]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isStreaming) return;

    // Append user message immediately
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text },
    ]);
    setInputText('');
    setIsStreaming(true);
    setStreamingText('');

    let accumulated = '';

    abortRef.current = streamChatMessage(
      assessmentId,
      sessionId,
      text,
      // onToken
      (token) => {
        accumulated += token;
        setStreamingText(accumulated);
      },
      // onComplete
      () => {
        setChatMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: 'bot', text: accumulated },
        ]);
        setStreamingText('');
        setIsStreaming(false);
        abortRef.current = null;
      },
      // onError
      (err) => {
        console.error('Stream error:', err);
        setChatMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' },
        ]);
        setStreamingText('');
        setIsStreaming(false);
        abortRef.current = null;
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AppShell
      sidebar={<Sidebar variant="avatar" />}
      bottomNav={<BottomNavBar />}
      mainClassName="flex-grow flex-1 h-full bg-surface-bright relative z-0 flex flex-col justify-between"
    >
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-container-padding-desktop pb-32 flex flex-col space-y-8">
        <div className="flex justify-center my-4">
          <span className="text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {chatMessages.map((msg) => (
          msg.sender === 'user' ? (
            <div key={msg.id} className="flex justify-end w-full">
              <div className="max-w-[85%] lg:max-w-[60%] flex space-x-3 items-end justify-end">
                <div className="bg-surface-variant text-on-surface rounded-2xl rounded-br-sm p-4 shadow-sm border border-outline-variant/20">
                  <p className="font-body-md text-body-md">{msg.text}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-start w-full">
              <div className="max-w-[85%] lg:max-w-[70%] flex space-x-3 items-end">
                <div className="w-8 h-8 rounded-full bg-secondary-container border border-outline-variant/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-on-secondary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="bg-surface border border-secondary/20 text-on-surface rounded-2xl rounded-bl-sm p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-secondary-fixed opacity-10 pointer-events-none" />
                  <p className="relative z-10 font-body-md text-body-md leading-relaxed text-on-surface-variant">{msg.text}</p>
                </div>
              </div>
            </div>
          )
        ))}

        {/* Streaming response — growing in real time */}
        {isStreaming && (
          <div className="flex justify-start w-full">
            <div className="max-w-[85%] lg:max-w-[70%] flex space-x-3 items-end">
              <div className="w-8 h-8 rounded-full bg-secondary-container border border-outline-variant/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-secondary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              </div>
              <div className="bg-surface border border-secondary/20 text-on-surface rounded-2xl rounded-bl-sm p-5 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary-fixed opacity-10 pointer-events-none" />
                <div className="relative z-10 flex flex-col space-y-3">
                  {!streamingText && (
                    <div className="flex items-center space-x-2 text-secondary font-label-sm text-label-sm mb-1">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                      <span>Synthesizing…</span>
                    </div>
                  )}
                  <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
                    {streamingText}
                    {streamingText && (
                      <span className="inline-block w-1.5 h-4 bg-secondary ml-1 align-middle blink" />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="absolute bottom-0 left-0 w-full bg-surface border-t border-outline-variant/20 p-4 lg:p-6 pb-20 lg:pb-6 z-20">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <input
            className="w-full bg-surface-container-low border border-outline-variant rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md text-on-surface transition-all shadow-sm"
            placeholder="Ask about materials, dimensions, or costs…"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
          />
          <button
            onClick={handleSend}
            disabled={isStreaming || !inputText.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
