import React, { useState } from 'react';
import { Coffee, Flame, PackageCheck, Truck, ArrowRight } from 'lucide-react';

interface HowWeWorkProps {
  onRequestSample: () => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onRequestSample }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Taste',
      subtitle: 'Understanding your palate',
      icon: Coffee,
      summary:
        'We discuss your coffee setup, milk pairings, and what your customers enjoy. We taste current origins together to set the flavor target.',
      details: [
        'Review your espresso machine & grinder dial-in',
        'Decide between single origin and balanced blend',
        'Define sweetness, acidity, and body goals',
      ],
    },
    {
      step: '02',
      title: 'Profile',
      subtitle: 'Dialing the roast curves',
      icon: Flame,
      summary:
        'We roast experimental batches in our Lucknow roastery, testing charge temperatures and airflow curves until the roast hits the exact note.',
      details: [
        'Small-batch trial roasts',
        'Logged rate-of-rise and development time ratios',
        'Cupping notes verified on our cupping table',
      ],
    },
    {
      step: '03',
      title: 'Sample',
      subtitle: 'Barista testing on your bar',
      icon: PackageCheck,
      summary:
        'We deliver freshly roasted sample bags directly to your team. Your baristas pull shots and brew drinks on your actual bar equipment.',
      details: [
        'Sample pack sent within 48 hours',
        'Testing extraction yield with your local water',
        'Collecting feedback from your head barista',
      ],
    },
    {
      step: '04',
      title: 'Supply',
      subtitle: 'Fresh weekly dispatch',
      icon: Truck,
      summary:
        'Once approved, we lock in your roast profile. We roast to order each week so you never serve stale coffee to your guests.',
      details: [
        'Fixed weekly roasting schedule',
        'Fresh roast dates stamped on each bag',
        'Direct delivery across Lucknow and India',
      ],
    },
  ];

  return (
    <section id="how-we-work" className="section-padding how-we-work-section">
      {/* Decorative Deep Green organic blob at bottom-right */}
      <div className="blob-green-bottom-right" aria-hidden="true" />

      <div className="container">
        <div className="section-header text-center">
          <span className="pill-tag pill-forest">HOW WE WORK WITH YOU</span>
          <h2 className="section-title">Four steps from bean to cup.</h2>
          <p className="section-subtitle">
            A transparent, hands-on process built for busy cafe and restaurant teams.
          </p>
        </div>

        {/* 4 Interactive Steps */}
        <div className="steps-container">
          <div className="steps-grid">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isSelected = activeStep === index;
              return (
                <div
                  key={item.step}
                  className={`step-card ${isSelected ? 'active-step' : ''}`}
                  onClick={() => setActiveStep(index)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                >
                  <div className="step-card-header">
                    <span className="step-badge">{item.step}</span>
                    <div className="step-icon-wrapper">
                      <Icon size={22} className={isSelected ? 'text-orange' : 'text-forest'} />
                    </div>
                  </div>

                  <h3 className="step-card-title">{item.title}</h3>
                  <span className="step-card-subtitle">{item.subtitle}</span>

                  <p className="step-card-summary">{item.summary}</p>

                  <div className="step-checklist">
                    {item.details.map((point, idx) => (
                      <div key={idx} className="step-check-row">
                        <span className="step-check-marker">✓</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Callout */}
          <div className="steps-cta-banner">
            <div className="steps-cta-text">
              <h4>Ready to test with your own espresso machine?</h4>
              <p>Tell us what you brew. We will prepare a custom sample pack for your team.</p>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={onRequestSample}
            >
              Request a sample <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
