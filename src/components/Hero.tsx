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
          <div className="hero-pill-badge" data-reveal="scale-up">
            <span className="pill-dot-orange" />
            <span>Coffee Roasters • Lucknow, India</span>
          </div>

          <h1 className="hero-headline stagger-1" data-reveal="fade-up">
            <span className="headline-part">Freshly roasted in Lucknow.</span>{' '}
            <span className="headline-part">Tailored for your cup.</span>
          </h1>

          <p className="hero-subtext stagger-2" data-reveal="fade-up">
            We roast green coffee beans for cafes, white-label partners, and home brewers. Available in whole beans and freshly ground coffee, crafted by hand and profiled to your cafe's preference.
          </p>

          <div className="hero-cta-group stagger-3" data-reveal="pop">
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
          <div className="hero-values-strip stagger-4" data-reveal="fade-up">
            <div className="val-item">
              <Flame size={17} className="text-orange" />
              <span>Custom roast profiles & cupping</span>
            </div>
            <div className="val-separator">•</div>
            <div className="val-item">
              <ShieldCheck size={17} className="text-forest" />
              <span>White-label cafe packets</span>
            </div>
            <div className="val-separator">•</div>
            <div className="val-item">
              <MapPin size={17} className="text-orange" />
              <span>Whole beans & ground</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Coffee Packet Showcase */}
        <div className="hero-showcase-column" id="packet-showcase" data-reveal="pop">
          <div className="showcase-badge-flag">
            <span>Interactive 3D Bag</span>
          </div>
          <CoffeePacket3D onRequestSample={onRequestSample} />
        </div>
      </div>
    </section>
  );
};
