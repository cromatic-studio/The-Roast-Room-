import React, { useState } from 'react';
import './App.css';
import './components/CoffeePacket3D.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhoWeAre } from './components/WhoWeAre';
import { WhatWeDo } from './components/WhatWeDo';
import { HowWeWork } from './components/HowWeWork';
import { BrewingGuide } from './components/BrewingGuide';
import { ClientsAndContact } from './components/ClientsAndContact';
import { Footer } from './components/Footer';
import { SampleModal } from './components/SampleModal';
import { CoffeeGrainCanvas } from './components/CoffeeGrainCanvas';
import { useScrollReveal } from './hooks/useScrollReveal';
import { ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const { scrollProgress, isScrolled } = useScrollReveal();

  const handleOpenSampleModal = () => {
    setSampleModalOpen(true);
  };

  const handleCloseSampleModal = () => {
    setSampleModalOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="roast-room-app">
      {/* Top Scroll Reading Progress Bar */}
      <div className="scroll-progress-container" aria-hidden="true">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Interactive Background: Miniature coffee beans & artisanal grains with cursor repel */}
      <CoffeeGrainCanvas />

      {/* Main Navigation */}
      <Navbar onRequestSample={handleOpenSampleModal} />

      {/* Main One-Page Scrolling Content (Core Brand Sections) */}
      <main>
        {/* 1. Hero: Headline, subtext, CTA, 3D Coffee Packet Showcase */}
        <Hero onRequestSample={handleOpenSampleModal} />

        {/* 2. Who We Are: Deep Forest Green block, Roastery craft photo, honest story */}
        <WhoWeAre />

        {/* 3. What We Do: 5 craft tiles (Profiling, White-Label, Whole Beans & Ground, Blends, B2B) */}
        <WhatWeDo onRequestSample={handleOpenSampleModal} />

        {/* 4. How We Work: 4 sequential steps (Consultation, Roasting & Cupping, Barista Testing, Lock) */}
        <HowWeWork onRequestSample={handleOpenSampleModal} />

        {/* 5. How to Brew: 5 brew methods (Pour Over, AeroPress, French Press, Espresso, Cold Brew) */}
        <BrewingGuide onRequestSample={handleOpenSampleModal} />

        {/* 6. Clients and Contact: Partner types, testimonials, and sample enquiry form */}
        <ClientsAndContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll-to-Top Quick Return Button */}
      <button
        type="button"
        className={`floating-scroll-top-btn ${isScrolled ? 'is-visible' : ''}`}
        onClick={handleScrollToTop}
        aria-label="Back to top"
        title="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Quick Sample Request Modal */}
      <SampleModal
        isOpen={sampleModalOpen}
        onClose={handleCloseSampleModal}
      />
    </div>
  );
};

export default App;

