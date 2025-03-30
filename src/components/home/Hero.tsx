import React from 'react';
import { Activity, AlertCircle, Heart, Phone, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChatbotPreview } from './ChatbotPreview';
import { BackgroundPaths } from '@/components/ui/background-paths';

export const Hero = () => {
  const navigate = useNavigate();

  const handleAssistantAccess = () => {
    navigate('/assistant');
  };

  return (
    <>
      {/* Background Paths Component */}
      <div className="w-full">
        <BackgroundPaths 
          title="ResQ.ai" 
          subtitle="AI-powered emergency response system for critical medical situations"
          showButton={true}
          buttonText="Access ResQ Now"
          onButtonClick={handleAssistantAccess}
        />
      </div>
      
      <div className="pt-12 pb-16 relative overflow-hidden bg-black">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-accent/5 rounded-full animate-pulse blur-3xl"></div>
          <div className="absolute w-64 h-64 bg-red-500/5 rounded-full animate-pulse blur-3xl -top-20 right-20"></div>
          <div className="absolute w-72 h-72 bg-blue-500/5 rounded-full animate-pulse blur-3xl bottom-10 left-20"></div>
        </div>

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-sm">
                <AlertCircle className="text-red-400" size={16} />
                <span className="text-accent font-mono text-sm">MEDICAL & DENTAL EMERGENCY RESPONSE</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="glow-text">ResQ.ai</span>
                <span className="block mt-2 bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text">
                  Saving Lives Smarter
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                AI-powered emergency response platform designed to save lives during the critical "golden period" of medical and dental emergencies with multimodal assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => navigate('/assistant')} 
                  className="btn btn-primary group relative"
                >
                  <span className="relative z-10">Access ResQ Now</span>
                  <span className="absolute right-4 group-hover:right-2 transition-all duration-300 z-10">→</span>
                </button>
                <button 
                  onClick={() => window.open('https://youtu.be/W8I0IFj6fjA', '_blank')} 
                  className="btn btn-outline group"
                >
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex gap-6 text-sm text-gray-400 mb-8 border-t border-accent/20 pt-6">
                <div className="flex items-center gap-2">
                  <Heart className="text-red-400" size={18} />
                  <span>5M+ Annual Cases</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="text-accent" size={18} />
                  <span>20% Faster Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-blue-400" size={18} />
                  <span>24/7 Availability</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Decorative emergency symbols */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-500/10 rounded-full animate-pulse blur-xl"></div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-accent/10 rounded-full animate-pulse blur-xl"></div>
              
              {/* Enhanced ChatbotPreview with more visual appeal */}
              <div className="relative shadow-2xl shadow-accent/20 rounded-xl border border-accent/30 backdrop-blur-sm">
                <ChatbotPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};