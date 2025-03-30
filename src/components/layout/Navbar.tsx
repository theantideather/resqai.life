import React from 'react';
import { Menu, X, Heart, AlertCircle, Phone, Bot, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-[#c7af8c]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c7af8c]/10 flex items-center justify-center border border-[#c7af8c]/30 pulse-medical">
              <Heart className="text-red-400" size={20} />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#c7af8c] to-blue-400 text-transparent bg-clip-text">ResQ.ai</span>
              <div className="text-xs text-gray-400">Emergency Response</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-[#c7af8c] transition-colors hover-glow px-3 py-2 rounded-md">Features</a>
            <a href="#whitepaper" className="text-gray-300 hover:text-[#c7af8c] transition-colors hover-glow px-3 py-2 rounded-md">Whitepaper</a>
            <a href="#proof" className="text-gray-300 hover:text-[#c7af8c] transition-colors hover-glow px-3 py-2 rounded-md">Impact</a>
            <a href="#pricing" className="text-gray-300 hover:text-[#c7af8c] transition-colors hover-glow px-3 py-2 rounded-md">Pricing</a>
            
            <div className="h-8 border-l border-[#c7af8c]/20 mx-2"></div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn btn-outline group flex items-center gap-2"
              >
                <span>Dashboard</span>
              </button>
              
              <button 
                onClick={() => navigate('/assistant')} 
                className="btn btn-primary group relative flex items-center gap-2"
              >
                <Bot size={18} />
                <span className="relative z-10">Emergency Assistant</span>
                <span className="absolute right-4 group-hover:right-2 transition-all duration-300 z-10">→</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#c7af8c] hover-glow p-2 rounded-full" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-[#c7af8c]/20">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="flex items-center gap-2 py-3 px-4 text-gray-300 hover:text-[#c7af8c] rounded-md hover:bg-black/80 transition-all">
              <Bot className="text-[#c7af8c]" size={18} />
              <span>Features</span>
            </a>
            <a href="#whitepaper" className="flex items-center gap-2 py-3 px-4 text-gray-300 hover:text-[#c7af8c] rounded-md hover:bg-black/80 transition-all">
              <FileText className="text-[#c7af8c]" size={18} />
              <span>Whitepaper</span>
            </a>
            <a href="#proof" className="flex items-center gap-2 py-3 px-4 text-gray-300 hover:text-[#c7af8c] rounded-md hover:bg-black/80 transition-all">
              <AlertCircle className="text-red-400" size={18} />
              <span>Impact</span>
            </a>
            <a href="#pricing" className="flex items-center gap-2 py-3 px-4 text-gray-300 hover:text-[#c7af8c] rounded-md hover:bg-black/80 transition-all">
              <Phone className="text-blue-400" size={18} />
              <span>Pricing</span>
            </a>
            
            <div className="border-t border-[#c7af8c]/10 my-2 pt-2"></div>
            
            <button 
              onClick={() => navigate('/dashboard')} 
              className="w-full py-3 px-4 text-left flex items-center gap-2 text-gray-300 hover:text-[#c7af8c] rounded-md hover:bg-black/80 transition-all"
            >
              <Heart className="text-red-400" size={18} />
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => navigate('/assistant')} 
              className="btn btn-primary w-full justify-center mt-2"
            >
              <span>Emergency Assistant</span>
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c7af8c]/50 to-transparent"></div>
    </nav>
  );
};