import React from 'react';
import { Heart, Shield, Activity, Twitter, Linkedin, Mail, Phone, MapPin, FileText, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#000913] border-t border-[#c7af8c]/20 backdrop-blur-md relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 bg-[#c7af8c]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c7af8c]/10 flex items-center justify-center border border-[#c7af8c]/30 pulse-medical">
                <Heart className="text-red-400" size={20} />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#c7af8c] to-blue-400 text-transparent bg-clip-text">ResQ.ai</span>
                <div className="text-xs text-gray-400">Saving Lives Smarter</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered emergency response platform designed to save lives during the critical "golden period" of medical and dental emergencies.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a href="https://resqai.life" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-[#c7af8c]/10 border border-[#c7af8c]/20 text-xs text-[#c7af8c] hover:bg-[#c7af8c]/20 transition-all">
                Website
              </a>
              <a href="https://calendly.com/omgurram14" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-[#c7af8c]/10 border border-[#c7af8c]/20 text-xs text-[#c7af8c] hover:bg-[#c7af8c]/20 transition-all">
                Book a Demo
              </a>
              <a href="https://resq.gitbook.io/resq-whitepaper" target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-[#c7af8c]/10 border border-[#c7af8c]/20 text-xs text-[#c7af8c] hover:bg-[#c7af8c]/20 transition-all">
                Whitepaper
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[#c7af8c] font-bold mb-4">Resources</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="https://resq.gitbook.io/resq-whitepaper" target="_blank" rel="noopener noreferrer" className="hover:text-[#c7af8c] transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c7af8c]/50"></div>
                  <span>Whitepaper</span>
                </a>
              </li>
              <li>
                <a href="https://resq-ai-powered-emergenc-xex3v3b.gamma.site/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c7af8c] transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c7af8c]/50"></div>
                  <span>Pitch Deck</span>
                </a>
              </li>
              <li>
                <a href="https://youtu.be/W8I0IFj6fjA" target="_blank" rel="noopener noreferrer" className="hover:text-[#c7af8c] transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c7af8c]/50"></div>
                  <span>AI Demo Video</span>
                </a>
              </li>
              <li>
                <a href="https://resqagent.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c7af8c] transition-colors flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c7af8c]/50"></div>
                  <span>ResQ Agent</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-[#c7af8c] font-bold mb-4">Key Metrics</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                  <Heart size={16} className="text-red-400" />
                </div>
                <div>
                  <div className="font-bold text-gray-300">5M+</div>
                  <span className="text-sm">Annual trauma cases</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-8 h-8 rounded-md bg-[#c7af8c]/10 flex items-center justify-center border border-[#c7af8c]/20 group-hover:bg-[#c7af8c]/20 transition-colors">
                  <Activity size={16} className="text-[#c7af8c]" />
                </div>
                <div>
                  <div className="font-bold text-gray-300">20%</div>
                  <span className="text-sm">Faster response time</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Shield size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-gray-300">30,045</div>
                  <span className="text-sm">PHCs integrated</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#c7af8c] font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 hover:text-[#c7af8c] transition-colors">
                <Mail size={16} className="text-[#c7af8c]" />
                <a href="mailto:omgurram14@gmail.com">omgurram14@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-[#c7af8c] transition-colors">
                <Phone size={16} className="text-[#c7af8c]" />
                <a href="tel:+919405659924">+91 9405659924</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-[#c7af8c] transition-colors">
                <MapPin size={16} className="text-[#c7af8c]" />
                <span>India & Global</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 pt-3">
                <a href="https://twitter.com/omg14doteth" target="_blank" rel="noopener noreferrer" 
                   className="w-8 h-8 rounded-full bg-[#c7af8c]/10 flex items-center justify-center border border-[#c7af8c]/20 hover:bg-[#c7af8c]/20 transition-colors">
                  <Twitter size={16} className="text-[#c7af8c]" />
                </a>
                <a href="https://www.linkedin.com/in/sameer-patil-b5a19a2b/" target="_blank" rel="noopener noreferrer" 
                   className="w-8 h-8 rounded-full bg-[#c7af8c]/10 flex items-center justify-center border border-[#c7af8c]/20 hover:bg-[#c7af8c]/20 transition-colors">
                  <Linkedin size={16} className="text-[#c7af8c]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#c7af8c]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ResQ.ai – Redefining Emergency Healthcare, Saving Lives Smarter. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#c7af8c] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#c7af8c] transition-colors">Terms of Service</a>
              <a href="mailto:omgurram14@gmail.com" className="hover:text-[#c7af8c] transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};