import React, { useState } from 'react';
import { Coffee, Flame, ArrowRight, Calendar, Phone, Award } from 'lucide-react';

interface HowWeWorkProps {
  onRequestSample: () => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onRequestSample }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Register & Taste Consultation',
      subtitle: 'Book a slot via website or call',
      icon: Calendar,
      timeline: 'Day 1 • Slot Booking',
      summary:
        'Book your roast profiling session. We discuss your target flavor profile, milk balance, and café preferences to select matching green beans.',
      details: [
        'Book consultation online or call roaster (+91 9310034617)',
        'Define target palate (sweetness, body, crema & milk balance)',
        'Curated green bean selection tailored to your brew setup',
      ],
    },
    {
      step: '02',
      title: 'Roasting & Cupping Session',
      subtitle: 'Crafting test batches & evaluating notes',
      icon: Flame,
      timeline: 'Days 2–3 • Roastery Lab',
      summary:
        'We prepare small-batch trial roasts, hosting a cupping session to analyze fragrance, body, and acidity to dial in the heat curve.',
      details: [
        'Small-batch test roasts with logged development curves',
        'In-depth cupping session to evaluate aroma, body & balance',
        'Precision curve tweaks to airflow, heat & roast time',
      ],
    },
    {
      step: '03',
      title: 'Barista Tasting on Roastery Equipment',
      subtitle: 'Evaluate through cupping or espresso shots',
      icon: Coffee,
      timeline: 'Day 4 • Hands-on Tasting',
      summary:
        'Bring your head baristas to test trial roasts directly on our commercial roastery espresso equipment and cupping bowls in real café conditions.',
      details: [
        'Baristas pull test shots on commercial espresso machines',
        'Evaluate high-pressure extraction and test builds with milk',
        'Immediate recipe refinement based on barista tasting feedback',
      ],
    },
    {
      step: '04',
      title: 'Degassing, Sampling & Signature Lock',
      subtitle: 'Resting period, dispatch & locked profile',
      icon: Award,
      timeline: 'Day 5 • Dispatch & Lock',
      summary:
        'After mandatory degassing, freshly rested sample packs are dispatched for bar testing. Once approved, we lock your permanent signature profile.',
      details: [
        'Optimal resting observed so CO₂ releases and flavor peaks',
        'Fresh sample packs dispatched directly to your café',
        'Permanently locked as your signature profile for every batch',
      ],
    },
  ];

  return (
    <section id="how-we-work" className="section-padding how-we-work-section">
      {/* Decorative Deep Green organic blob at bottom-right */}
      <div className="blob-green-bottom-right" aria-hidden="true" />

      <div className="container">
        <div className="section-header text-center" data-reveal="fade-up">
          <span className="pill-tag pill-forest">ROAST PROFILING & SAMPLE WORKFLOW</span>
          <h2 className="section-title">Four steps from taste target to signature profile.</h2>
          <p className="section-subtitle">
            A transparent, hands-on process: register, roast, cup on our equipment, sample after degassing, and lock your blend.
          </p>
        </div>

        {/* 4 Interactive Steps */}
        <div className="steps-container">
          <div className="steps-grid">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isSelected = activeStep === index;
              const staggerClass = `stagger-${index + 1}`;
              return (
                <div
                  key={item.step}
                  className={`step-card ${isSelected ? 'active-step' : ''} ${staggerClass}`}
                  data-reveal="pop"
                  onClick={() => setActiveStep(index)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                >
                  <div className="step-card-header">
                    <div className="step-header-left">
                      <span className="step-badge">{item.step}</span>
                      <span className="step-timeline-pill">{item.timeline}</span>
                    </div>
                    <div className="step-icon-wrapper">
                      <Icon size={20} className={isSelected ? 'text-orange' : 'text-forest'} />
                    </div>
                  </div>

                  <h3 className="step-card-title">{item.title}</h3>
                  <span className="step-card-subtitle">{item.subtitle}</span>

                  <p className="step-card-summary">{item.summary}</p>

                  <div className="step-checklist">
                    {item.details.map((point, idx) => (
                      <div key={idx} className="step-check-row">
                        <span className="step-check-marker">✓</span>
                        <span className="step-check-text">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cupping & Espresso Tasting Sessions Feature Showcase */}
          <div className="cupping-experience-card stagger-2" data-reveal="pop">
            <div className="cupping-experience-content">
              <div className="cupping-badge-row">
                <span className="pill-tag pill-orange-light">LUCKNOW ROASTERY SESSIONS</span>
                <span className="cupping-status-dot">● Equipment Available</span>
              </div>
              <h3 className="cupping-title">Coffee Testing & Tasting Sessions for Baristas</h3>
              <p className="cupping-desc">
                Cafe owners can make their head baristas taste trial roasts through either a formal <strong>cupping session</strong> or by pulling <strong>espresso shots</strong> directly on our commercial roastery coffee equipment. We test extraction, body, and milk interaction together before finalizing your roast profile.
              </p>
              <div className="cupping-specs-row">
                <div className="cupping-spec-item">
                  <span className="spec-label">Equipment</span>
                  <span className="spec-val">Commercial Espresso Machine & Flat Burrs</span>
                </div>
                <div className="cupping-spec-item">
                  <span className="spec-label">Evaluation Methods</span>
                  <span className="spec-val">SCA Cupping & High-Pressure Espresso Extraction</span>
                </div>
                <div className="cupping-spec-item">
                  <span className="spec-label">Resting & Degassing</span>
                  <span className="spec-val">Samples rested for optimum extraction clarity</span>
                </div>
                <div className="cupping-spec-item">
                  <span className="spec-label">Roastery Location</span>
                  <span className="spec-val">Gomti Nagar, Lucknow</span>
                </div>
              </div>
            </div>

            <div className="cupping-action-box">
              <h4>Ready to book your cupping slot?</h4>
              <p>Register online or call us directly to schedule a tasting session for your team.</p>
              <div className="cupping-buttons-stack">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onRequestSample}
                >
                  Book a Cupping Slot <ArrowRight size={16} />
                </button>
                <a
                  href="tel:+919310034617"
                  className="btn-outline-forest cupping-call-btn"
                >
                  <Phone size={15} /> Call Roaster: +91 9310034617
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
