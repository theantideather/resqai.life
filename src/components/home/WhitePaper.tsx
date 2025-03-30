import React from 'react';
import { ContainerScroll } from '../ui/container-scroll-animation';
import { Bot, Ambulance, Pill, Video, Building2, Globe, Clock, Brain, Heart, CheckCircle, Star, Shield, Stethoscope, Activity, Smartphone, Zap, Users, FileText, Cpu } from 'lucide-react';
import { SplineScene } from '../ui/spline';
import { Spotlight } from '../ui/spotlight';

export const WhitePaper = () => {
  return (
    <div id="whitepaper" className="relative overflow-hidden pb-20 bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#c7af8c]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <ContainerScroll
        titleComponent={
          <div className="space-y-6 pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c7af8c]/10 border border-[#c7af8c]/20 mb-4 backdrop-blur-sm">
              <Stethoscope className="text-[#c7af8c]" size={16} />
              <span className="text-[#c7af8c] font-mono text-sm">WHITEPAPER</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-[#c7af8c] to-blue-400 text-transparent bg-clip-text text-center">
              Revolutionizing Emergency Healthcare
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-center">
              Learn how ResQ.ai is transforming the emergency response landscape through AI-powered solutions.
            </p>
          </div>
        }
      >
        <div className="h-full flex flex-col bg-black">
          {/* Robot Spline Scene in iPad with enhanced content */}
          <div className="relative h-full bg-black">
            <div className="absolute top-0 left-0 w-full">
              <div className="flex items-center justify-between bg-zinc-800/70 backdrop-blur-md py-3 px-6 rounded-t-xl border-b border-[#c7af8c]/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[#c7af8c] font-mono text-sm">ResQ.ai Medical Interface</div>
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-[#c7af8c]/70" />
                </div>
              </div>
            </div>
            
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="gold"
              size={500}
            />
            
            <div className="flex flex-col h-full pt-12">
              <div className="flex flex-col md:flex-row h-full">
                {/* Left content - Detailed information */}
                <div className="flex-1 p-8 relative z-10 flex flex-col">
                  <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#c7af8c] to-[#8a7653] mb-4">
                      ResQ.ai Assistant
                    </h1>
                    <p className="mt-4 text-gray-300 max-w-lg">
                      Our AI-powered emergency response system features a robotic interface
                      designed to provide critical assistance during medical emergencies.
                    </p>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3 bg-zinc-800/30 p-4 rounded-xl border border-[#c7af8c]/10 hover:border-[#c7af8c]/30 transition-colors">
                      <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
                        <Heart className="text-red-400" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Life-Saving Guidance</h3>
                        <p className="text-sm text-gray-400 mt-1">Real-time instructions for medical emergencies with step-by-step protocols</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-zinc-800/30 p-4 rounded-xl border border-[#c7af8c]/10 hover:border-[#c7af8c]/30 transition-colors">
                      <div className="w-10 h-10 rounded-md bg-[#c7af8c]/10 flex items-center justify-center border border-[#c7af8c]/20 shrink-0">
                        <Bot className="text-[#c7af8c]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">AI Assistant</h3>
                        <p className="text-sm text-gray-400 mt-1">Intelligent support in critical situations using advanced machine learning</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-zinc-800/30 p-4 rounded-xl border border-[#c7af8c]/10 hover:border-[#c7af8c]/30 transition-colors">
                      <div className="w-10 h-10 rounded-md bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                        <Activity className="text-blue-400" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Vital Monitoring</h3>
                        <p className="text-sm text-gray-400 mt-1">Track patient vitals and automatically alert emergency contacts</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-zinc-800/30 p-4 rounded-xl border border-[#c7af8c]/10 hover:border-[#c7af8c]/30 transition-colors">
                      <div className="w-10 h-10 rounded-md bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                        <Smartphone className="text-purple-400" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Multimodal Interface</h3>
                        <p className="text-sm text-gray-400 mt-1">Voice, text, and visual guidance for all emergency situations</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#c7af8c]/10">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-gray-400">System Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-[#c7af8c]" size={14} />
                        <span className="text-xs text-gray-400">Response time: &lt;1s</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right content - Robot 3D Scene */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10 md:hidden"></div>
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full transform scale-110"
                  />
                </div>
              </div>

              {/* Bottom stats */}
              <div className="hidden md:flex gap-6 p-6 mx-auto border-t border-[#c7af8c]/10 mt-auto">
                <div className="flex items-center gap-2">
                  <Shield className="text-[#c7af8c]" size={16} />
                  <span className="text-sm text-gray-400">99.9% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-[#c7af8c]" size={16} />
                  <span className="text-sm text-gray-400">5M+ Annual Cases</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-[#c7af8c]" size={16} />
                  <span className="text-sm text-gray-400">20% Faster Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="text-[#c7af8c]" size={16} />
                  <span className="text-sm text-gray-400">24/7 Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}; 