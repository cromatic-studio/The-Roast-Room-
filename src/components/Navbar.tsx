import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandIcons';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onRequestSample: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestSample }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Lockup */}
        <a href="#hero" className="brand-link" aria-label="The Roast Room Homepage">
          <BrandLogo variant="dark" className="nav-logo" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <a href="#who-we-are" className="nav-item">Who We Are</a>
          <a href="#what-we-do" className="nav-item">What We Do</a>
          <a href="#how-we-work" className="nav-item">How We Work</a>
          <a href="#reviews" className="nav-item">Reviews</a>
          <a href="#packet-showcase" className="nav-item">Our Coffee</a>
          <a href="#contact" className="nav-item">Contact</a>
        </nav>

        {/* Single CTA */}
        <div className="header-actions">
          <button
            type="button"
            className="btn-primary nav-cta"
            onClick={onRequestSample}
          >
            Request a sample
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a
            href="#who-we-are"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Who We Are
          </a>
          <a
            href="#what-we-do"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            What We Do
          </a>
          <a
            href="#how-we-work"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            How We Work
          </a>
          <a
            href="#reviews"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reviews & Ratings
          </a>
          <a
            href="#packet-showcase"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Our Coffee
          </a>
          <a
            href="#contact"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>

          <button
            type="button"
            className="btn-primary mobile-cta"
            onClick={() => {
              setMobileMenuOpen(false);
              onRequestSample();
            }}
          >
            Request a sample <ArrowUpRight size={18} />
          </button>
        </div>
      )}
    </header>
  );
};
