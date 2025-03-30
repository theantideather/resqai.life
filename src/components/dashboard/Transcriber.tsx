import React, { useState, useEffect } from 'react';
import { Mic, Volume2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const Transcriber = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Simulated messages for demo
  useEffect(() => {
    const demoMessages: Message[] = [
      {
        role: 'user',
        content: 'My friend is experiencing chest pain and shortness of breath.',
        timestamp: '14:22'
      },
      {
        role: 'assistant',
        content: 'I understand this is a serious situation. First, call emergency services immediately. While waiting, have your friend sit in a comfortable position and loosen any tight clothing.',
        timestamp: '14:22'
      },
      {
        role: 'user',
        content: "They are also sweating a lot and feeling nauseous.",
        timestamp: '14:23'
      },
      {
        role: 'assistant',
        content: 'These could be signs of a heart attack. Keep them calm and still. Do not let them eat or drink anything. Emergency services have been notified of your location.',
        timestamp: '14:23'
      }
    ];

    setMessages(demoMessages);
  }, []);

  return (
    <div className="terminal-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-accent font-bold">Live Transcript</h2>
        <div className="flex gap-2">
          <Mic className="text-accent animate-pulse" size={20} />
          <Volume2 className="text-accent" size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-2 ${
              message.role === 'assistant' ? 'text-accent' : 'text-gray-300'
            }`}
          >
            <span className="text-xs text-gray-500">{message.timestamp}</span>
            <span className="text-xs font-bold">
              {message.role === 'assistant' ? 'AI' : 'You'}:
            </span>
            <p className="text-sm flex-1">{message.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 border border-accent/20 rounded-lg bg-secondary/50">
        <p className="text-xs text-gray-400">
          Transcript is automatically saved and can be accessed in your notes.
          Voice recognition active.
        </p>
      </div>
    </div>
  );
};