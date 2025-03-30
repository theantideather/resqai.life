import React, { useState } from 'react';
import { X, Heart, AlertCircle, Activity, Phone, Info } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-accent/20 bg-secondary/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 pulse-medical">
            <Heart className="text-red-400" size={20} />
          </div>
          <div>
            <h1 className="text-accent font-bold text-xl">ResQ AI Assistant</h1>
            <p className="text-xs text-gray-400">Your emergency medical guide</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="text-accent hover:text-accent/80 transition-colors hover-glow p-2 rounded-full"
            title="Emergency Information"
          >
            <Info size={20} />
          </button>
          <button 
            onClick={onClose}
            className="text-accent hover:text-accent/80 transition-colors hover-glow p-2 rounded-full"
            title="Close Assistant"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="p-4 bg-secondary/70 border-b border-accent/20 backdrop-blur-md">
          <h2 className="text-accent font-bold mb-2">How to use the ResQ AI Emergency Assistant:</h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
              <span>Speak clearly about the emergency situation you're facing</span>
            </li>
            <li className="flex items-start gap-2">
              <Activity className="text-accent shrink-0 mt-0.5" size={16} />
              <span>Follow the AI's instructions for emergency first aid</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="text-blue-400 shrink-0 mt-0.5" size={16} />
              <span>Allow the AI to connect you with emergency services if needed</span>
            </li>
          </ul>
        </div>
      )}

      <div className="flex-1 relative">
        <div className="absolute top-5 left-5 w-20 h-20 bg-red-500/5 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute bottom-5 right-5 w-24 h-24 bg-accent/5 rounded-full animate-pulse blur-xl"></div>
        
        <iframe
          src="https://vapi.ai?demo=true&shareKey=2b8b8ff0-de39-4be4-aa24-f3b8dc5ea1e8&assistantId=ee2f762e-b4ee-4d9f-8724-1108196cc3a3"
          className="w-full h-full border-0 relative z-10"
          allow="camera;microphone"
          title="AI Assistant"
        />
      </div>
      
      <div className="p-3 bg-secondary/80 border-t border-accent/20 text-xs text-center text-gray-400 backdrop-blur-md">
        In case of severe emergency, please call <a href="tel:102" className="text-accent font-bold">102</a> (Ambulance) or <a href="tel:108" className="text-accent font-bold">108</a> (Emergency)
      </div>
    </div>
  );
};