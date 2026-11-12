import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandIcons';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onRequestSample: () => void;
}

const navItems = [
  { href: '#who-we-are', label: 'Who We Are' },
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#how-we-work', label: 'How We Work' },
  { href: '#how-to-brew', label: 'How to Brew' },
  { href: '#packet-showcase', label: 'Our Coffee' },
  { href: '#contact', label: 'Contact' }
];

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

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Automatically close mobile menu if viewport widens to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1080 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile Drawer Dimming Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          {/* Brand Lockup */}
          <a
            href="#hero"
            className="brand-link"
            aria-label="The Roast Room Homepage"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BrandLogo variant="dark" className="nav-logo" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-item">
                {item.label}
              </a>
            ))}
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

            {/* Animated Mobile Menu Toggle */}
            <button
              type="button"
              className={`mobile-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <span className="mobile-toggle-icon">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>
        </div>

        {/* Animated Mobile Drawer Panel */}
        <div
          id="mobile-navigation-drawer"
          className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mobile-drawer-inner">
            <nav className="mobile-nav-links" aria-label="Mobile Navigation">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-nav-item"
                  style={{ '--item-idx': index } as React.CSSProperties}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-bullet" aria-hidden="true" />
                  <span className="mobile-nav-text">{item.label}</span>
                  <span className="mobile-nav-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </nav>

            <div className="mobile-drawer-cta-wrap">
              <button
                type="button"
                className="btn-primary mobile-drawer-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestSample();
                }}
              >
                Request a sample
              </button>
              <div className="mobile-drawer-footnote">
                <span>Lucknow, Uttar Pradesh</span>
                <span className="dot-sep">•</span>
                <span>FSSAI: 22726743000645</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
