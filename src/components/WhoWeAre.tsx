import React from 'react';
import { SageBranchSVG, FSSAIComplianceBadge } from './BrandIcons';
import { Check } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  return (
    <section id="who-we-are" className="who-we-are-section bg-forest">
      {/* Decorative Sage line art coffee cherry branch */}
      <div className="who-we-are-sage-branch" aria-hidden="true">
        <SageBranchSVG color="#8FA894" />
      </div>

      <div className="container who-we-are-container">
        <div className="who-we-are-grid">
          {/* Left Column: The Real Craft Roastery Photo */}
          <div className="who-we-are-visual">
            <div className="roastery-photo-frame" data-reveal="pop-tilt-left">
              <img
                src="/images/roastery_craft.jpg"
                alt="Freshly roasted coffee beans rotating in our stainless steel cooling tray at The Roast Room"
                className="roastery-photo"
                loading="lazy"
              />
              <div className="photo-caption-tag">
                <span>The Roast Room • Lucknow Roastery</span>
              </div>
            </div>

            {/* Direct Roastery Address Card */}
            <div className="roastery-address-card stagger-2" data-reveal="pop">
              <span className="address-label">ROASTERY LOCATION</span>
              <p className="address-text">
                Ground floor, 1/58, Vastu Khand,<br />
                Gomti Nagar, Lucknow 226010
              </p>
              <div className="roastery-fssai-attach">
                <FSSAIComplianceBadge variant="compact" />
              </div>
            </div>
          </div>

          {/* Right Column: Story & Principles */}
          <div className="who-we-are-story">
            <span className="pill-tag pill-cream" data-reveal="scale-up">WHO WE ARE</span>

            <h2 className="who-we-are-headline stagger-1" data-reveal="fade-up">
              Craft-led roasting from the heart of Lucknow.
            </h2>

            <p className="story-paragraph highlight stagger-2" data-reveal="fade-up">
              The Roast Room is a dedicated coffee roasting house based in Lucknow, Uttar Pradesh.
              We roast green coffee beans for partner cafes, restaurants, hotels, and retail
              coffee drinkers across India.
            </p>

            <p className="story-paragraph stagger-3" data-reveal="fade-up">
              Every bean tells a story. That is why we roast by hand in small batches, monitoring
              heat curves and development times closely. We do not use generic bulk roasts. Instead,
              we build individual roast profiles to match how you brew and what your customers enjoy.
            </p>

            {/* Core Craft Principles */}
            <div className="craft-pillars-list">
              <div className="pillar-item stagger-3" data-reveal="pop">
                <div className="pillar-check">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Small-batch control</strong>
                  <p>Hand-tuned batch sizes so every bean roasts evenly from core to surface.</p>
                </div>
              </div>

              <div className="pillar-item stagger-4" data-reveal="pop">
                <div className="pillar-check">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Profiled to your preference</strong>
                  <p>Custom temperature curves tailored for espresso machines, pour-overs, or batch brews.</p>
                </div>
              </div>

              <div className="pillar-item stagger-5" data-reveal="pop">
                <div className="pillar-check">
                  <Check size={16} />
                </div>
                <div>
                  <strong>Direct origin traceability</strong>
                  <p>Single estate and curated coffees with clear harvest and process details.</p>
                </div>
              </div>
            </div>

            <div className="quote-banner stagger-6" data-reveal="fade-up">
              <span className="quote-tagline">“Every bean tells a story.”</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
