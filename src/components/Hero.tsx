import React from 'react';
import { CoffeePacket3D } from './CoffeePacket3D';
import { ArrowRight, Flame, ShieldCheck, MapPin } from 'lucide-react';
import { SageBranchSVG } from './BrandIcons';

interface HeroProps {
  onRequestSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestSample }) => {
  return (
    <section id="hero" className="hero-section">
      {/* Decorative Organic Blob Shapes per brand guidelines */}
      <div className="blob-orange-top-left" aria-hidden="true" />
      <div className="sage-branch-hero" aria-hidden="true">
        <SageBranchSVG color="#8FA894" />
      </div>

      <div className="container hero-container">
        {/* Left Column: Headlines & Call to Action */}
        <div className="hero-content">
          {/* Origin & Craft Tag */}
          <div className="hero-pill-badge">
            <span className="pill-dot-orange" />
            <span>Coffee Roasters • Lucknow, India</span>
          </div>

          <h1 className="hero-headline">
            Freshly roasted in Lucknow. Tailored for your cup.
          </h1>

          <p className="hero-subtext">
            We roast green coffee beans for B2B clients and retail customers. Small-batch,
            crafted by hand, and profiled to your cafe's preference.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-primary hero-main-btn"
              onClick={onRequestSample}
            >
              Request a sample <ArrowRight size={18} />
            </button>

            <a href="#how-we-work" className="btn-outline-forest">
              How we roast
            </a>
          </div>

          {/* Concrete Brand Truths */}
          <div className="hero-values-strip">
            <div className="val-item">
              <Flame size={17} className="text-orange" />
              <span>Custom roast profiles</span>
            </div>
            <div className="val-separator">•</div>
            <div className="val-item">
              <ShieldCheck size={17} className="text-forest" />
              <span>Signature blends</span>
            </div>
            <div className="val-separator">•</div>
            <div className="val-item">
              <MapPin size={17} className="text-orange" />
              <span>Gomti Nagar, Lucknow</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Coffee Packet Showcase */}
        <div className="hero-showcase-column" id="packet-showcase">
          <div className="showcase-badge-flag">
            <span>Interactive 3D Bag</span>
          </div>
          <CoffeePacket3D onRequestSample={onRequestSample} />
        </div>
      </div>
    </section>
  );
};
