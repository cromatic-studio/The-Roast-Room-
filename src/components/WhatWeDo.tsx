import React from 'react';
import { Sliders, Sparkles, Building2, Coffee, Tag } from 'lucide-react';

interface WhatWeDoProps {
  onRequestSample?: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = () => {
  const services = [
    {
      id: 'custom-roast',
      icon: Sliders,
      title: 'Custom Roast Profiling',
      tag: 'Tailored Roast Curves',
      badge: 'Interactive Cupping',
      description:
        'We discuss your desired taste notes and select green beans accordingly. After roasting test batches, we host a cupping and espresso shot tasting session on our commercial equipment with your head baristas before locking in your permanent signature profile.',
      details: [
        'Green bean selection matching your target flavor notes',
        'In-roastery cupping & espresso extraction on our machines',
        'Post-degassing sampling to verify final brew consistency',
      ],
    },
    {
      id: 'white-label',
      icon: Tag,
      title: 'White-Label Coffee Solutions',
      tag: 'Your Brand, Your Packets',
      badge: 'New for Cafés',
      description:
        'Every bean your café uses or wants to retail to your customers can be packaged in custom packets featuring your very own branding and logo. We handle green sourcing, precision roasting, and valved packaging while your café takes center stage.',
      details: [
        'Custom-branded foil pouches with your café logo & artwork',
        'Choose exclusive single origins or tailored signature blends',
        'Low minimum order quantities (MOQ) for independent coffee bars',
      ],
    },
    {
      id: 'whole-and-ground',
      icon: Coffee,
      title: 'Whole Beans & Ground Coffee',
      tag: 'Cafés & Home Brewers',
      badge: 'No Grinder Needed',
      description:
        'Available in Whole Beans for espresso bars and home grinders, alongside precision Freshly Ground Coffee for home brewers with no grinder. We grind immediately before nitrogen packaging so everyone can enjoy specialty beans at home.',
      details: [
        'Whole beans with degassing aroma valves for peak flavor longevity',
        'Freshly ground to order: Pour Over, AeroPress, French Press, Espresso, Cold Brew',
        'Packaged ready for café retail shelves and direct home delivery',
      ],
    },
    {
      id: 'signature-blends',
      icon: Sparkles,
      title: 'Signature Blends',
      tag: 'Café Identity',
      badge: 'Exclusive Recipe',
      description:
        'We build exclusive house blends that belong only to your brand. Created to stand out on espresso bars, pair cleanly with milk, and keep your guests returning for that signature cup.',
      details: [
        'Curated specialty Arabica and fine Robusta proportions',
        'Balanced syrupy body, golden crema, and chocolate finish',
        'Seasonal harvest recipe calibrations for identical taste year-round',
      ],
    },
    {
      id: 'b2b-supply',
      icon: Building2,
      title: 'B2B Wholesale Supply',
      tag: 'Commercial Partners',
      badge: 'Weekly Roasting',
      description:
        'Freshly roasted whole beans and ground coffee delivered on a predictable schedule for cafés, boutique hotels, fine-dining restaurants, and corporate spaces.',
      details: [
        'Flexible 1 KG and wholesale commercial packaging',
        'Regular weekly roasting cycles with zero stale warehouse stock',
        'Fresh roast date stamped on every valved bag',
      ],
    },
  ];

  return (
    <section id="what-we-do" className="section-padding what-we-do-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-reveal="fade-up">
          <span className="pill-tag pill-forest">WHAT WE DO</span>
          <h2 className="section-title">Roasting solutions for cafés & coffee lovers.</h2>
          <p className="section-subtitle">
            From white-label custom branded packets to precision whole beans and freshly ground coffee for home brewers.
          </p>
        </div>

        {/* 5 Interactive Service Tiles */}
        <div className="services-grid services-grid-five">
          {services.map((item, index) => {
            const Icon = item.icon;
            const isFeatured = index === 0;
            const staggerClass = `stagger-${(index % 5) + 1}`;
            return (
              <div
                key={item.id}
                className={`service-card ${isFeatured ? 'service-card-featured' : ''} ${staggerClass}`}
                data-reveal="pop"
              >
                <div className="service-card-header">
                  <div className="service-header-left">
                    <span className="service-number">0{index + 1}</span>
                    {item.badge && (
                      <span className="service-badge-pill">{item.badge}</span>
                    )}
                  </div>
                  <div className="service-icon-wrapper">
                    <Icon size={20} className="service-icon" />
                  </div>
                </div>

                <h3 className="service-title">{item.title}</h3>
                <span className="service-subtitle">{item.tag}</span>
                <p className="service-description">{item.description}</p>

                <div className="service-checklist">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="service-check-row">
                      <span className="service-check-marker">✓</span>
                      <span className="service-check-text">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
