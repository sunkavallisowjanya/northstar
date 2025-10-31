'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';
import Snowflakes from './components/Snowflakes';
import AuroraBackground from './components/AuroraBackground';
import NorthStarIcon from './components/NorthStarIcon';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  return (
    <>
      <AuroraBackground />
      <Snowflakes />
      <div className="flex flex-col w-full max-w-3xl py-8 px-4 mx-auto min-h-screen relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 pt-4">
          <div className="flex items-center gap-3 animate-float">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center animate-glow shadow-2xl">
                <NorthStarIcon className="w-12 h-12" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-60 animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                NorthStar
              </h1>
              <p className="text-sm text-cyan-100/90 font-medium">Your Cozy Holiday Travel Companion ✨</p>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        {showWelcome && messages.length === 0 && (
          <div className="mb-6 flex items-start gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
              <NorthStarIcon className="w-7 h-7" />
            </div>
            <div className="flex-1 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-5 border border-cyan-400/40 shadow-2xl">
              <p className="text-cyan-50 leading-relaxed text-base">
                ❄️ Hi, I'm <span className="font-bold text-cyan-200">NorthStar</span> — your cozy holiday travel companion! 
                Let's plan your perfect winter getaway together. ✨🌟
              </p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-24">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600'
                }`}
                aria-label={message.role === 'user' ? 'User' : 'NorthStar'}
              >
                {message.role === 'user' ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                ) : (
                  <NorthStarIcon className="w-7 h-7" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 max-w-[80%] rounded-2xl p-4 shadow-xl backdrop-blur-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-purple-900/60 to-pink-900/60 border border-purple-400/40 text-purple-50'
                    : 'bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-400/40 text-cyan-50'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return <div key={`${message.id}-${i}`}>{part.text}</div>;
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput('');
          }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/98 to-transparent backdrop-blur-md border-t border-cyan-500/20"
        >
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                className="w-full p-4 pr-12 bg-slate-800/90 backdrop-blur-md border border-cyan-400/50 rounded-2xl shadow-2xl text-cyan-50 placeholder-cyan-200/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:border-cyan-300/60 transition-all"
                value={input}
                placeholder="Ask about your winter adventure... ❄️"
                onChange={e => setInput(e.currentTarget.value)}
                aria-label="Chat input"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}