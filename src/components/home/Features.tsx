import React from 'react';
import { Bot, Ambulance, Pill, Video, Building2, Globe } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Emergency Guidance',
    description: 'Text chat assistant, conversational voice AI, and advanced avatar assistant for life-saving procedures.',
    color: 'from-accent to-blue-400'
  },
  {
    icon: Ambulance,
    title: 'Ambulance Integration',
    description: 'ICATT air ambulances and Ola/Uber ground transport with real-time tracking.',
    color: 'from-red-400 to-red-500'
  },
  {
    icon: Pill,
    title: 'Medical Supply Coordination',
    description: 'Emergency kits, medication delivery, and hospital resource preparation.',
    color: 'from-purple-400 to-purple-500'
  },
  {
    icon: Video,
    title: 'Specialist Video Consultation',
    description: 'On-demand access to doctors for immediate emergency advice.',
    color: 'from-green-400 to-green-500'
  },
  {
    icon: Building2,
    title: 'Hospital & PHC Integration',
    description: 'Pre-admission paperwork and resource allocation with 30,045 PHCs across India.',
    color: 'from-blue-400 to-blue-500'
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Language accessibility for diverse populations with offline functionality for low-connectivity areas.',
    color: 'from-yellow-400 to-yellow-500'
  }
];

export const Features = () => {
  return (
    <div id="features" className="py-20 relative bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 backdrop-blur-sm">
            <Bot className="text-accent" size={16} />
            <span className="text-accent font-mono text-sm">CORE CAPABILITIES</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-blue-400 text-transparent bg-clip-text">Emergency Response Features</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">ResQ.ai creates a comprehensive ecosystem that integrates advanced AI with India's existing healthcare infrastructure</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="terminal-card hover-glow backdrop-blur-sm group"
            >
              <div className={`w-12 h-12 rounded-lg mb-5 flex items-center justify-center bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 border border-accent/30 rounded-full text-accent hover:bg-accent/10 transition-all hover-glow cursor-pointer">
            <span>See our full technical whitepaper</span>
          </div>
        </div>
      </div>
    </div>
  );
};