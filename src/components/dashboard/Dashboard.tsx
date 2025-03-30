import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Bot, ShoppingBag, AlertCircle, User, Activity, Heart, Bell } from 'lucide-react';
import { Notes } from './Notes';
import { Transcriber } from './Transcriber';
import { EmergencyKit } from './EmergencyKit';
import { EmergencyButton } from './EmergencyButton';
import { useAuthStore } from '../../store/authStore';

interface DashboardProps {
  onClose: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'notes' | 'shop'>('ai');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState(2); // Example notification count

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      onClose();
    }
  }, [user, onClose]);

  return (
    <div className="fixed inset-0 bg-[#000913] flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="bg-secondary/80 backdrop-blur-md border-b border-accent/20 p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 pulse-medical">
                <Heart className="text-red-400" size={20} />
              </div>
              <h1 className="text-accent font-bold text-xl">ResQ Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3 md:hidden">
              <button className="text-accent hover:text-accent/80 relative">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <EmergencyButton />
              <button
                onClick={onClose}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
                activeTab === 'ai'
                  ? 'text-accent bg-accent/10 border border-accent/30 shadow-glow'
                  : 'text-gray-400 hover:text-accent hover:bg-accent/5 border border-transparent'
              }`}
            >
              <Bot size={18} />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'text-accent bg-accent/10 border border-accent/30 shadow-glow'
                  : 'text-gray-400 hover:text-accent hover:bg-accent/5 border border-transparent'
              }`}
            >
              <MessageSquare size={18} />
              <span>Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 whitespace-nowrap ${
                activeTab === 'shop'
                  ? 'text-accent bg-accent/10 border border-accent/30 shadow-glow'
                  : 'text-gray-400 hover:text-accent hover:bg-accent/5 border border-transparent'
              }`}
            >
              <ShoppingBag size={18} />
              <span>Emergency Kit</span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <button className="text-accent hover:text-accent/80 relative">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <EmergencyButton />
            <div className="h-8 border-l border-accent/20"></div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                <User size={14} className="text-accent" />
              </div>
              <span className="text-accent text-sm">Medical Pro</span>
            </div>
            <button
              onClick={onClose}
              className="text-accent hover:text-accent/80 transition-colors hover-glow p-2 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 relative z-10">
        {activeTab === 'ai' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 h-[70vh] lg:h-full rounded-xl overflow-hidden border border-accent/20 relative terminal-card hover-glow">
              {!iframeLoaded && (
                <div className="absolute inset-0 bg-secondary flex flex-col items-center justify-center gap-3">
                  <Activity className="text-accent animate-pulse" size={32} />
                  <div className="text-accent">Loading AI Assistant...</div>
                </div>
              )}
              <iframe
                src="https://vapi.ai?demo=true&shareKey=2b8b8ff0-de39-4be4-aa24-f3b8dc5ea1e8&assistantId=ee2f762e-b4ee-4d9f-8724-1108196cc3a3"
                className="w-full h-full border-0"
                allow="camera;microphone"
                title="AI Assistant"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
            <div className="h-[50vh] lg:h-full">
              <Transcriber />
            </div>
          </div>
        ) : activeTab === 'notes' ? (
          <Notes />
        ) : (
          <EmergencyKit />
        )}
      </div>
      
      {/* Footer */}
      <div className="p-3 bg-secondary/80 border-t border-accent/20 text-xs text-center text-gray-400 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© 2024 ResQ.ai - Redefining Emergency Healthcare</div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-accent hover:text-accent/80">Privacy Policy</a>
            <a href="#" className="text-accent hover:text-accent/80">Terms of Service</a>
            <a href="#" className="text-accent hover:text-accent/80">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};