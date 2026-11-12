import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { FSSAILogo } from './BrandIcons';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    city: '',
    serviceInterest: 'Free Sample Pack',
    samplePreference: 'Ratnagiri YC-17 (Single Origin Light Roast)',
    formatPreference: 'Whole Beans',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success">
            <CheckCircle2 size={48} className="text-orange" />
            <h3 className="modal-title">Request received!</h3>
            <p className="modal-text">
              We have noted your interest in <strong>{formData.serviceInterest}</strong> ({formData.formatPreference}) for <strong>{formData.business || 'your team'}</strong>.
              Our roaster will connect with you via <strong>{formData.phone || formData.email}</strong> to coordinate dispatch or confirm your cupping session.
            </p>
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: '1.2rem' }}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="modal-header">
              <span className="pill-tag pill-forest">
                <Sparkles size={13} className="text-orange" /> LUCKNOW COFFEE ROASTERS
              </span>
              <h3 className="modal-title">Samples, White-Label & Cupping</h3>
              <p className="modal-subtitle">
                Freshly roasted in small batches and tailored for your cafe bar or home setup.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>What are you looking for?</label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  >
                    <option value="Free Sample Pack">Free Coffee Sample Pack (B2B)</option>
                    <option value="White-Label Coffee">White-Label Branding (Packets with our cafe's brand)</option>
                    <option value="Cupping & Tasting Session">Book a Cupping & Tasting Session at Lucknow Roastery</option>
                    <option value="Custom Roast Profiling">Custom Roast Profiling for our Espresso Machine</option>
                    <option value="B2B Wholesale Supply">B2B Wholesale Supply</option>
                    <option value="Home Brew Coffee">Retail Coffee (Whole Bean or Ground)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Format Preference</label>
                  <select
                    value={formData.formatPreference}
                    onChange={(e) => setFormData({ ...formData, formatPreference: e.target.value })}
                  >
                    <option value="Whole Beans">Whole Beans (For grinders & espresso bars)</option>
                    <option value="Ground for Pour Over">Freshly Ground: Pour Over (V60 / Kalita)</option>
                    <option value="Ground for AeroPress">Freshly Ground: AeroPress</option>
                    <option value="Ground for French Press">Freshly Ground: French Press</option>
                    <option value="Ground for Espresso">Freshly Ground: Espresso</option>
                    <option value="Ground for Cold Brew">Freshly Ground: Cold Brew</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Coffee Profile / Origin Selection</label>
                <select
                  value={formData.samplePreference}
                  onChange={(e) => setFormData({ ...formData, samplePreference: e.target.value })}
                >
                  <option value="Ratnagiri YC-17 (Single Origin Light Roast)">
                    Ratnagiri YC-17 — Single Origin Light Roast (Jasmine Tea, Raspberry & Nutty)
                  </option>
                  <option value="Signature House Espresso Blend">
                    Signature House Espresso Blend (Rich Crema, Dark Chocolate & Toasted Hazelnut)
                  </option>
                  <option value="White-Label Custom Blend Consultation">
                    White-Label Blend (To be branded in our own packaging)
                  </option>
                  <option value="Cupping Table Session (Multiple Origins)">
                    Roastery Cupping Table (Multiple experimental test roasts)
                  </option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Cafe / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blue Door Cafe or Home Brewer"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>City / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucknow, Delhi NCR, Kanpur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@business.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-primary modal-submit"
                disabled={loading}
              >
                {loading ? 'Submitting...' : (
                  <>
                    <Send size={16} /> Submit Request
                  </>
                )}
              </button>

              <div className="modal-fssai-row">
                <FSSAILogo width={46} height={26} />
                <span className="modal-fssai-text">
                  Licensed Roastery • <strong>Lic No.: 22726743000645</strong>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
