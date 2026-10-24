import React, { useState } from 'react';
import './App.css';
import './components/CoffeePacket3D.css';
import { CoffeeGrainCanvas } from './components/CoffeeGrainCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhoWeAre } from './components/WhoWeAre';
import { WhatWeDo } from './components/WhatWeDo';
import { HowWeWork } from './components/HowWeWork';
import { RatingArea } from './components/RatingArea';
import { ClientsAndContact } from './components/ClientsAndContact';
import { Footer } from './components/Footer';
import { SampleModal } from './components/SampleModal';

export const App: React.FC = () => {
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  const handleOpenSampleModal = () => {
    setSampleModalOpen(true);
  };

  const handleCloseSampleModal = () => {
    setSampleModalOpen(false);
  };

  return (
    <div className="roast-room-app">
      {/* Dynamic Interactive Background: Coffee Grains that scatter on mouse hover */}
      <CoffeeGrainCanvas />

      {/* Main Navigation */}
      <Navbar onRequestSample={handleOpenSampleModal} />

      {/* Main One-Page Scrolling Content (Core Brand Sections) */}
      <main>
        {/* 1. Hero: Headline, subtext, CTA, 3D Coffee Packet Showcase */}
        <Hero onRequestSample={handleOpenSampleModal} />

        {/* 2. Who We Are: Deep Forest Green block, Roastery craft photo, honest story */}
        <WhoWeAre />

        {/* 3. What We Do: 4 craft tiles (Profiling, Blends, B2B, Retail) */}
        <WhatWeDo onRequestSample={handleOpenSampleModal} />

        {/* 4. How We Work: 4 sequential steps (Taste, Profile, Sample, Supply) */}
        <HowWeWork onRequestSample={handleOpenSampleModal} />

        {/* 5. Ratings & Verified Google Reviews Carousel */}
        <RatingArea />

        {/* 6. Clients and Contact: Partner types, testimonials, and sample enquiry form */}
        <ClientsAndContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Sample Request Modal */}
      <SampleModal
        isOpen={sampleModalOpen}
        onClose={handleCloseSampleModal}
      />
    </div>
  );
};

export default App;
