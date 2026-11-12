import React, { useState } from 'react';
import {
  PourOverIcon,
  FrenchPressIcon,
  AeropressIcon,
  EspressoIcon,
  ColdBrewIcon,
} from './BrandIcons';
import { Droplets, Clock, Flame, Sparkles, ArrowRight } from 'lucide-react';

interface BrewingGuideProps {
  onRequestSample?: () => void;
}

export type BrewMethodId = 'pourover' | 'aeropress' | 'frenchpress' | 'espresso' | 'coldbrew';

interface BrewMethodData {
  id: BrewMethodId;
  name: string;
  tagline: string;
  equipment: string;
  grindSize: string;
  grindVisual: string;
  ratio: string;
  waterTemp: string;
  time: string;
  flavorNotes: string;
  icon: React.FC<{ size?: number; color?: string }>;
  steps: { title: string; instruction: string }[];
}

export const BrewingGuide: React.FC<BrewingGuideProps> = ({ onRequestSample }) => {
  const [selectedMethod, setSelectedMethod] = useState<BrewMethodId>('pourover');

  const brewMethods: BrewMethodData[] = [
    {
      id: 'pourover',
      name: 'Pour Over',
      tagline: 'Delicate clarity & floral acidity',
      equipment: 'V60 / Kalita Wave / Chemex',
      grindSize: 'Medium-Fine',
      grindVisual: 'Table salt to fine sea salt',
      ratio: '1:15 (15g coffee : 225g water)',
      waterTemp: '92°C – 94°C',
      time: '2:45 – 3:15 min',
      flavorNotes: 'Clean, tea-like body, articulate citrus acidity, and bright floral sweetness.',
      icon: PourOverIcon,
      steps: [
        {
          title: 'Rinse & Dose',
          instruction: 'Place filter paper into brewer and rinse thoroughly with hot water to remove paper taste. Add 15g ground coffee and level the bed.',
        },
        {
          title: 'The Bloom',
          instruction: 'Pour 45g hot water (93°C) gently over the grounds. Let bloom for 40 seconds to release trapped roasting CO₂ gases.',
        },
        {
          title: 'Continuous Pour',
          instruction: 'Pour in steady, gentle spirals from center outward. Pour up to 140g by 1:15 min, and complete total 225g by 2:00 min.',
        },
        {
          title: 'Drawdown & Serve',
          instruction: 'Allow gentle drawdown to finish flat by 3:00 min. Give the server a gentle swirl to aerate, pour and enjoy.',
        },
      ],
    },
    {
      id: 'aeropress',
      name: 'AeroPress',
      tagline: 'Punchy sweetness & velvety mouthfeel',
      equipment: 'AeroPress (Standard or Inverted)',
      grindSize: 'Medium-Fine',
      grindVisual: 'Fine sand with uniform consistency',
      ratio: '1:13 (16g coffee : 210g water)',
      waterTemp: '88°C – 90°C',
      time: '1:45 – 2:00 min',
      flavorNotes: 'Dense mouthfeel, balanced fruit brightness, and rounded caramel undertones.',
      icon: AeropressIcon,
      steps: [
        {
          title: 'Prepare Setup',
          instruction: 'Rinse paper filter with hot water and lock into cap. Insert plunger slightly into chamber if brewing inverted.',
        },
        {
          title: 'Add & Saturate',
          instruction: 'Add 16g coffee into chamber. Pour 210g water at ~89°C within 15 seconds, ensuring all grounds are immersed.',
        },
        {
          title: 'Gentle Agitation',
          instruction: 'Stir 3–4 times with paddle to ensure complete saturation. Let brew until 1:15 min.',
        },
        {
          title: 'Steady Plunge',
          instruction: 'Press down steadily for 30–35 seconds. Stop pressing once you hear a gentle hissing sound.',
        },
      ],
    },
    {
      id: 'frenchpress',
      name: 'French Press',
      tagline: 'Rich full body & chocolate oils',
      equipment: 'Plunger Press Pot',
      grindSize: 'Coarse',
      grindVisual: 'Kosher salt or breadcrumbs',
      ratio: '1:14 (20g coffee : 280g water)',
      waterTemp: '94°C – 96°C',
      time: '4:00 min',
      flavorNotes: 'Heavy, syrupy mouthfeel, dark cacao, toasted hazelnut, and deep natural oils.',
      icon: FrenchPressIcon,
      steps: [
        {
          title: 'Pre-warm & Add',
          instruction: 'Warm glass carafe with hot water, discard water, then add 20g of coarse ground coffee.',
        },
        {
          title: 'Vigorous Pour',
          instruction: 'Pour 280g hot water (95°C) vigorously across all coffee grounds to create natural turbulent mixing.',
        },
        {
          title: 'Undisturbed Steep',
          instruction: 'Place plunger lid on top with mesh resting just on surface. Let steep undisturbed for 4 minutes.',
        },
        {
          title: 'Press & Decant',
          instruction: 'Press plunger down slowly with smooth pressure. Decant immediately into cups to prevent over-extraction.',
        },
      ],
    },
    {
      id: 'espresso',
      name: 'Espresso',
      tagline: 'Intense concentration & golden crema',
      equipment: 'Commercial or Home Espresso Machine',
      grindSize: 'Fine',
      grindVisual: 'Powdered sugar with a slight tactile grit',
      ratio: '1:2 (18g dose in : 36g yield out)',
      waterTemp: '93°C • 9 Bar Pressure',
      time: '26 – 30 seconds',
      flavorNotes: 'Thick hazelnut crema, intense bittersweet chocolate, honey sweetness, and velvety mouthfeel.',
      icon: EspressoIcon,
      steps: [
        {
          title: 'Dose & Distribute',
          instruction: 'Grind 18g into dry portafilter basket. De-clump grounds using a WDT needle distributor.',
        },
        {
          title: 'Level & Tamp',
          instruction: 'Tamp firmly and level with consistent 15kg pressure until bed is flat and even.',
        },
        {
          title: 'Purge & Lock',
          instruction: 'Purge group head for 1 second. Lock portafilter in smoothly and start pump immediately.',
        },
        {
          title: 'Extract to Yield',
          instruction: 'Watch for rich golden honey flow. Stop extraction at 36g liquid in 26 to 30 seconds.',
        },
      ],
    },
    {
      id: 'coldbrew',
      name: 'Cold Brew',
      tagline: 'Ultra-smooth & low acid refreshment',
      equipment: 'Cold Brew Jar / Steeping Vessel',
      grindSize: 'Extra Coarse',
      grindVisual: 'Coarse sea salt',
      ratio: '1:8 (Concentrate) or 1:12 (Ready to drink)',
      waterTemp: 'Cold / Room Temp Filtered Water',
      time: '14 – 18 hours',
      flavorNotes: 'Virtually zero bitterness or harsh acidity, naturally sweet cocoa, brown sugar, and malt.',
      icon: ColdBrewIcon,
      steps: [
        {
          title: 'Combine Grounds & Water',
          instruction: 'Place 50g coarse coffee into filter bag or vessel. Pour 500ml cold filtered water slowly over grounds.',
        },
        {
          title: 'Saturate & Seal',
          instruction: 'Stir gently to make sure every grain is submerged. Seal container tightly with lid.',
        },
        {
          title: 'Slow Cold Steep',
          instruction: 'Refrigerate or steep in a cool spot for 14 to 18 hours undisturbed for sweet extraction.',
        },
        {
          title: 'Filter & Chill',
          instruction: 'Remove filter bag or strain through paper filter. Serve over ice with cold milk or filtered water.',
        },
      ],
    },
  ];

  const current = brewMethods.find((m) => m.id === selectedMethod) || brewMethods[0];
  const CurrentIcon = current.icon;

  return (
    <section id="how-to-brew" className="section-padding brewing-guide-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-reveal="fade-up">
          <span className="pill-tag pill-forest">BREWING INSTRUCTIONS</span>
          <h2 className="section-title">Dial in your brew to perfection.</h2>
          <p className="section-subtitle">
            Whether pulling shots on a commercial coffee bar or brewing at home with no grinder, our roaster’s guide gives you peak flavor every cup.
          </p>
        </div>

        {/* 5 Brew Method Tab Buttons */}
        <div className="brew-methods-tab-strip stagger-1" data-reveal="fade-up">
          {brewMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                className={`brew-tab-btn ${isSelected ? 'active-brew-tab' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="brew-tab-icon-box">
                  <Icon size={20} />
                </div>
                <div className="brew-tab-info">
                  <span className="brew-tab-name">{method.name}</span>
                  <span className="brew-tab-sub">{method.grindSize}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Brew Method Interactive Card */}
        <div className="brew-active-card stagger-2" data-reveal="pop">
          <div className="brew-card-header">
            <div className="brew-title-area">
              <div className="brew-method-icon-circle">
                <CurrentIcon size={28} />
              </div>
              <div>
                <span className="brew-subtitle-tag">{current.equipment}</span>
                <h3 className="brew-method-headline">{current.name}</h3>
                <p className="brew-tagline-text">{current.tagline}</p>
              </div>
            </div>

            {/* Quick Parameters Grid */}
            <div className="brew-params-grid">
              <div className="brew-param-item">
                <span className="param-label">
                  <Sparkles size={14} className="text-orange" /> Grind Size
                </span>
                <span className="param-val">{current.grindSize}</span>
                <span className="param-note">{current.grindVisual}</span>
              </div>

              <div className="brew-param-item">
                <span className="param-label">
                  <Droplets size={14} className="text-forest" /> Ratio
                </span>
                <span className="param-val">{current.ratio}</span>
                <span className="param-note">Coffee to water ratio</span>
              </div>

              <div className="brew-param-item">
                <span className="param-label">
                  <Flame size={14} className="text-orange" /> Temp / Spec
                </span>
                <span className="param-val">{current.waterTemp}</span>
                <span className="param-note">Optimal extraction temp</span>
              </div>

              <div className="brew-param-item">
                <span className="param-label">
                  <Clock size={14} className="text-forest" /> Brew Time
                </span>
                <span className="param-val">{current.time}</span>
                <span className="param-note">Total contact duration</span>
              </div>
            </div>
          </div>

          {/* Flavor Character Pill */}
          <div className="brew-flavor-bar">
            <strong>Cup Character:</strong> {current.flavorNotes}
          </div>

          {/* Step-by-Step Instructions */}
          <div className="brew-steps-grid">
            {current.steps.map((st, idx) => (
              <div key={idx} className="brew-step-card">
                <div className="brew-step-counter">
                  <span>0{idx + 1}</span>
                </div>
                <h4 className="brew-step-heading">{st.title}</h4>
                <p className="brew-step-text">{st.instruction}</p>
              </div>
            ))}
          </div>

          {/* Ground Coffee for Home Brewers Note */}
          <div className="brew-grinder-callout stagger-3" data-reveal="pop">
            <div className="grinder-callout-text">
              <div className="grinder-badge">HOME BREWER FRIENDLY • NO GRINDER REQUIRED</div>
              <h4>No grinder at home? We precision-grind fresh before dispatch!</h4>
              <p>
                Choose <strong>"Ground Coffee"</strong> and select <strong>{current.name}</strong>. We calibrate our commercial burrs for your brewer and pack in valved aroma pouches for fresh café flavor at home.
              </p>
            </div>
            {onRequestSample && (
              <button
                type="button"
                className="btn-primary"
                onClick={onRequestSample}
              >
                Order for {current.name} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
