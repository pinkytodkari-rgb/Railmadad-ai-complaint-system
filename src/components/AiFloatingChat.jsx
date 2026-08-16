import React, { useState } from 'react';
import { useComplaint } from '../context/ComplaintContext';

export default function AiFloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! How can I help you register your grievance today?' }
  ]);
  const [input, setInput] = useState('');
  const { loadDemoComplaint } = useComplaint();

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInput('');

    // Simulate AI support response
    setTimeout(() => {
      if (text.toLowerCase().includes('water') || text.toLowerCase().includes('leak')) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'I detected a water leakage report. I can automatically pre-fill your PNR details and attach the evidence photo for fast tracking!'
          }
        ]);
        loadDemoComplaint();
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'I have logged your request. You can also upload photos/audio for automated verification.'
          }
        ]);
      }
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          class="fixed bottom-6 right-6 w-14 h-14 bg-ai-accent text-ai-stroke rounded-full shadow-[0_4px_16px_rgba(33,150,243,0.3)] flex items-center justify-center hover:scale-105 transition-all z-40 border border-ai-stroke group"
          title="RailMadad AI Support"
        >
          <span class="material-symbols-outlined text-2xl icon-fill">smart_toy</span>
          <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-status-resolved rounded-full border-2 border-white"></span>
        </button>
      )}

      {/* Floating Chat Box */}
      {isOpen && (
        <aside class="fixed bottom-6 right-4 sm:right-6 z-50 w-[330px] bg-surface rounded-xl shadow-2xl border border-ai-stroke overflow-hidden flex flex-col transition-all">
          {/* Header */}
          <div
            onClick={() => setIsOpen(false)}
            class="bg-primary px-4 py-3 flex justify-between items-center cursor-pointer text-on-primary"
          >
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined icon-fill text-tertiary-fixed">smart_toy</span>
              <span class="font-bold text-sm">RailMadad AI Assistant</span>
            </div>
            <button class="text-on-primary/80 hover:text-on-primary">
              <span class="material-symbols-outlined">expand_more</span>
            </button>
          </div>

          {/* Messages */}
          <div class="p-4 bg-surface-container-lowest h-64 overflow-y-auto flex flex-col gap-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                class={`flex gap-2 items-start ${m.sender === 'user' ? 'justify-end' : ''}`}
              >
                {m.sender === 'ai' && (
                  <div class="w-7 h-7 rounded-full bg-ai-accent flex items-center justify-center flex-shrink-0 border border-ai-stroke text-ai-stroke">
                    <span class="material-symbols-outlined text-[16px]">smart_toy</span>
                  </div>
                )}
                <div
                  class={`px-3 py-2 rounded-2xl max-w-[85%] ${
                    m.sender === 'user'
                      ? 'bg-primary text-on-primary rounded-tr-none'
                      : 'bg-surface-variant text-on-surface rounded-tl-none border border-outline-variant/50'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick action chips */}
            <div class="flex flex-wrap gap-1.5 mt-auto pt-2">
              <button
                onClick={() => {
                  loadDemoComplaint();
                  handleSend('Load Water Leakage Demo');
                }}
                class="bg-ai-accent text-ai-stroke border border-ai-stroke/40 rounded-full px-2.5 py-1 hover:bg-blue-100 font-medium text-[11px]"
              >
                💧 Load Demo Leakage
              </button>
              <button
                onClick={() => handleSend('Find my PNR status')}
                class="border border-outline-variant rounded-full px-2.5 py-1 hover:bg-surface-variant text-on-surface-variant text-[11px]"
              >
                Find PNR
              </button>
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            class="p-2 bg-surface border-t border-outline-variant flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI Support..."
              class="flex-grow text-xs bg-surface-container-lowest border border-outline-variant rounded-full px-3 py-1.5 focus:ring-1 focus:ring-ai-stroke outline-none"
            />
            <button
              type="submit"
              class="w-7 h-7 rounded-full bg-ai-accent text-ai-stroke flex items-center justify-center hover:bg-blue-100 transition-colors"
            >
              <span class="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
