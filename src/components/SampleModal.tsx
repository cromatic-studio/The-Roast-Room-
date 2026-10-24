import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';

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
    samplePreference: 'Ratnagiri YC-17 (Single Origin Light Roast)',
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
            <h3 className="modal-title">Sample requested.</h3>
            <p className="modal-text">
              We have noted your request for <strong>{formData.business || 'your setup'}</strong>.
              Our roaster will follow up at <strong>{formData.phone || formData.email}</strong> to coordinate shipping.
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
                <Sparkles size={13} className="text-orange" /> FREE B2B SAMPLE
              </span>
              <h3 className="modal-title">Request a sample</h3>
              <p className="modal-subtitle">
                Freshly roasted in Lucknow and dispatched directly to your bar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Sample Profile Preference</label>
                <select
                  value={formData.samplePreference}
                  onChange={(e) => setFormData({ ...formData, samplePreference: e.target.value })}
                >
                  <option value="Ratnagiri YC-17 (Single Origin Light Roast)">
                    Ratnagiri YC-17 — Single Origin Light Roast (Jasmin Tea, Raspberry & Nutty)
                  </option>
                  <option value="Signature House Espresso Blend">
                    Signature House Espresso Blend (Rich Crema, Dark Chocolate & Almond)
                  </option>
                  <option value="Pour Over / Filter Sampler">
                    Manual Pour-Over Filter Sampler
                  </option>
                  <option value="Custom Profile Consultation">
                    Custom Profile (Dialed for our machine)
                  </option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Cafe / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Business Name"
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
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    required
                    placeholder="City"
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
                    <Send size={16} /> Request a sample
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
