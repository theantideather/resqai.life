import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { Stats } from './components/home/Stats';
import { SocialProof } from './components/home/SocialProof';
import { Pricing } from './components/home/Pricing';
import { Footer } from './components/layout/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
import { AIAssistant } from './components/dashboard/AIAssistant';
import { WhitePaper } from './components/home/WhitePaper';
import { SplashCursorWrapper } from './components/layout/SplashCursorWrapper';

// Landing page component
const Landing = () => (
  <div className="min-h-screen bg-black text-white">
    <Navbar />
    <Hero />
    <Features />
    <Stats />
    <WhitePaper />
    <SocialProof />
    <Pricing />
    <Footer />
  </div>
);

export default function App() {
  return (
    <SplashCursorWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assistant" element={<AIAssistant onClose={() => window.location.href = '/'} />} />
          <Route path="/dashboard" element={<Dashboard onClose={() => window.location.href = '/'} />} />
        </Routes>
      </BrowserRouter>
    </SplashCursorWrapper>
  );
}