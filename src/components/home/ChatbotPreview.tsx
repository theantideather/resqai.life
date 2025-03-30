import React, { useState, useEffect, useCallback } from 'react';
import { Bot, Send, Loader, Shield, Heart, Cpu } from 'lucide-react';
import { RobotCard } from '../ui/fixed/robot-card';

const demoConversation = [
  {
    type: 'system',
    message: 'Emergency Medical AI Assistant activated. How can I help you?'
  },
  {
    type: 'user',
    message: 'Someone is having chest pain and difficulty breathing'
  },
  {
    type: 'assistant',
    message: 'Emergency Protocol Activated:\n1. Call emergency services immediately (911)\n2. Have the person sit or lie in a comfortable position\n3. Loosen any tight clothing\n4. Check if they have heart medication\n\nVital signs monitoring initiated. Continuing emergency assessment...'
  }
];

const RobotAvatar = () => (
  <div className="absolute -top-16 -right-6 z-10 w-[120px] h-[120px] bg-[#000913] rounded-full border border-[#c7af8c]/30 flex items-center justify-center overflow-hidden animate-float">
    <div className="flex flex-col items-center justify-center h-full">
      <Cpu className="text-[#c7af8c] mb-2" size={24} />
      <div className="text-xs text-[#c7af8c] font-bold">ResQ AI</div>
    </div>
  </div>
);

export const ChatbotPreview = () => {
  const [messages, setMessages] = useState(demoConversation.slice(0, 1));
  const [isTyping, setIsTyping] = useState(false);
  const [robotVisible, setRobotVisible] = useState(true);

  // Function to show the next message in sequence
  const showNextMessage = useCallback(async (index: number) => {
    if (index < demoConversation.length) {
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsTyping(false);
      setMessages(prev => [...prev, demoConversation[index]]);
    }
  }, []);

  // Automatically show the next message after a delay
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    if (messages.length < demoConversation.length) {
      timeoutId = setTimeout(() => {
        if (mounted) {
          showNextMessage(messages.length);
        }
      }, 2000);
    }

    return () => {
      mounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [messages.length, showNextMessage]);

  // Handle robot visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if the component is in viewport
      const element = document.querySelector('.robot-scene-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        setRobotVisible(isInViewport);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="terminal-card w-full max-w-md mx-auto relative">
      <RobotAvatar />
      
      {/* Chat Header */}
      <div className="flex items-center gap-2 p-4 border-b border-[#c7af8c]/20 bg-[#000913]">
        <div className="w-3 h-3 rounded-full bg-[#c7af8c] animate-pulse"></div>
        <Bot className="text-[#c7af8c]" size={20} />
        <span className="text-[#c7af8c] font-bold">ResQ Emergency AI</span>
      </div>

      {/* About ResQ */}
      <div className="p-3 bg-[#000913] border-b border-[#c7af8c]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-[#c7af8c]" size={16} />
            <span className="text-xs text-[#c7af8c]">ResQ Medical AI</span>
          </div>
          <Heart className="text-red-400" size={16} />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          AI-powered emergency response platform designed to save lives during the critical "golden period" of medical emergencies.
        </p>
      </div>

      {/* Static Robot Card */}
      <div className="robot-scene-container bg-[#000913] p-0 border-b border-[#c7af8c]/20 relative">
        <RobotCard />
      </div>

      {/* Chat Messages */}
      <div className="h-[180px] overflow-y-auto p-4 space-y-4 bg-[#000913]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-[#c7af8c] text-[#000913] ml-auto'
                  : 'bg-[#101520] border border-[#c7af8c]/20'
              }`}
            >
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {msg.message}
              </pre>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-[#c7af8c]">
            <Loader className="animate-spin" size={16} />
            <span className="text-sm">AI Assistant is responding...</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-[#c7af8c]/20 bg-[#000913]">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Describe the emergency situation..."
            className="flex-1 bg-[#101520] border border-[#c7af8c]/20 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:border-[#c7af8c] focus:outline-none transition-colors"
            disabled
          />
          <button className="btn btn-primary p-2">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};