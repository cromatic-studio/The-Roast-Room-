import React from 'react';
import { BrandLogo, VegMark, FSSAIComplianceBadge } from './BrandIcons';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer bg-forest">
      <div className="container footer-container">
        {/* Top Tier */}
        <div className="footer-top-row">
          <div className="footer-brand-column stagger-1" data-reveal="fade-up">
            <BrandLogo variant="light" showTagline={true} className="footer-logo" />
            <p className="footer-bio">
              Small-batch coffee roasters based in Lucknow, India. We roast green coffee beans
              for cafes, hotels, restaurants, and retail customers.
            </p>
            <div className="footer-veg-badge">
              <VegMark size={18} />
              <span>100% Freshly Roasted Coffee</span>
            </div>
          </div>

          <div className="footer-nav-column stagger-2" data-reveal="fade-up">
            <h4 className="footer-heading">NAVIGATION</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Overview</a></li>
              <li><a href="#who-we-are">Who We Are</a></li>
              <li><a href="#what-we-do">What We Do</a></li>
              <li><a href="#how-we-work">How We Work</a></li>
              <li><a href="#how-to-brew">How to Brew</a></li>
              <li><a href="#packet-showcase">Our Coffee & 3D Bag</a></li>
              <li><a href="#contact">Contact & Samples</a></li>
            </ul>
          </div>

          <div className="footer-contact-column stagger-3" data-reveal="fade-up">
            <h4 className="footer-heading">ROASTERY IN LUCKNOW</h4>
            <div className="footer-contact-item">
              <MapPin size={16} className="text-orange" />
              <span>Ground floor, 1/58, Vastu Khand, Gomti Nagar, Lucknow 226010</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="text-orange" />
              <a href="tel:+919310034617">+91 9310034617</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="text-orange" />
              <a href="mailto:hello@theroastroom.in">hello@theroastroom.in</a>
            </div>
            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D95F2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@theroastroom.coffee</span>
            </div>
          </div>

          <div className="footer-compliance-column stagger-4" data-reveal="fade-up">
            <h4 className="footer-heading">CERTIFICATION</h4>
            <FSSAIComplianceBadge variant="card" />
            <div className="roast-schedule-pill">
              <span>Roasting weekly • Dispatch across India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © {CURRENT_YEAR} The Roast Room Coffee Roasters. All rights reserved.
          </div>

          <button
            type="button"
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
