import React from 'react';
import { Sliders, Sparkles, Building2, Package, ArrowRight } from 'lucide-react';

interface WhatWeDoProps {
  onRequestSample: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onRequestSample }) => {
  const services = [
    {
      id: 'custom-roast',
      icon: Sliders,
      title: 'Custom Roast Profiling',
      tag: 'Tailored curves',
      description:
        'We dial in roast development times, airflow, and charge temperatures to match your exact brewing setup and palate.',
      details: [
        'Espresso & milk beverage optimization',
        'Filter & pour-over delicacy',
        'Recorded digital roast profiles for repeat consistency',
      ],
    },
    {
      id: 'signature-blends',
      icon: Sparkles,
      title: 'Signature Blends',
      tag: 'Cafe identity',
      description:
        'We build exclusive house blends that belong only to your brand. Created to stand out and keep your customers coming back.',
      details: [
        'Curated Arabica and Robusta ratios',
        'Balanced body, crema, and finish',
        'Seasonal origin recipe adjustments',
      ],
    },
    {
      id: 'b2b-supply',
      icon: Building2,
      title: 'B2B Wholesale Supply',
      tag: 'Reliable partners',
      description:
        'Freshly roasted whole beans delivered on a predictable schedule for cafes, hotels, restaurants, and corporate spaces.',
      details: [
        'Flexible 1 KG and wholesale bulk packaging',
        'Regular weekly roasting cycles',
        'Fresh roast date marked on every bag',
      ],
    },
    {
      id: 'retail-beans',
      icon: Package,
      title: 'Retail Beans',
      tag: 'Whole bean pouches',
      description:
        'Single origin and specialty blends packaged in valved foil bags, ready for your retail retail shelves and home brewers.',
      details: [
        'Degassing aroma valve included',
        'Clear origin and processing notes',
        'Available for cafe retail displays',
      ],
    },
  ];

  return (
    <section id="what-we-do" className="section-padding what-we-do-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="pill-tag pill-forest">WHAT WE DO</span>
          <h2 className="section-title">Our roasting services.</h2>
          <p className="section-subtitle">
            Focused on the needs of daily commercial coffee bars and retail shelves.
          </p>
        </div>

        {/* 4 Interactive Service Tiles */}
        <div className="services-grid">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="service-card">
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Icon size={26} className="text-orange" />
                  </div>
                  <span className="service-number">0{index + 1}</span>
                </div>

                <span className="service-tag">{item.tag}</span>
                <h3 className="service-title">{item.title}</h3>
                <p className="service-description">{item.description}</p>

                <ul className="service-points">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="service-point-item">
                      <span className="bullet-dot" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="card-sample-link"
                  onClick={onRequestSample}
                >
                  Request a sample for this <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
