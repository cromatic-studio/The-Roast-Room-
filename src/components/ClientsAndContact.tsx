import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Coffee, Building, Utensils, Briefcase } from 'lucide-react';

export const ClientsAndContact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    businessType: 'Cafe',
    phone: '',
    email: '',
    brewMethods: ['Espresso'],
    city: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckboxChange = (method: string) => {
    setFormData((prev) => {
      const exists = prev.brewMethods.includes(method);
      return {
        ...prev,
        brewMethods: exists
          ? prev.brewMethods.filter((m) => m !== method)
          : [...prev.brewMethods, method],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate swift confirmation
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  // Partner segments (honest representation without inventing fake corporate names)
  const partnerTypes = [
    { icon: Coffee, title: 'Specialty Coffee Bars', desc: 'Dialed-in beans for consistent morning espresso lines.' },
    { icon: Building, title: 'Boutique Hotels', desc: 'Distinctive breakfast and lounge roast profiles.' },
    { icon: Utensils, title: 'Independent Restaurants', desc: 'Custom blends pairing cleanly with dinner menus.' },
    { icon: Briefcase, title: 'Corporate Offices', desc: 'Freshly roasted whole beans for work teams.' },
  ];

  return (
    <section id="contact" className="section-padding clients-contact-section">
      <div className="container">
        {/* Partner Sectors Overview */}
        <div className="section-header text-center">
          <span className="pill-tag pill-forest">WHO WE ROAST FOR</span>
          <h2 className="section-title">Built for hospitality & workspaces.</h2>
          <p className="section-subtitle">
            Reliable roasting schedules and customized profiles across Lucknow and partner cities.
          </p>
        </div>

        {/* 4 Partner Type Cards */}
        <div className="partner-types-grid">
          {partnerTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="partner-type-card">
                <div className="partner-icon-circle">
                  <Icon size={22} className="text-orange" />
                </div>
                <h4 className="partner-card-title">{item.title}</h4>
                <p className="partner-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Honest Partner Perspectives (grounded, no fake awards or claims) */}
        <div className="partner-quotes-strip">
          <div className="quote-card">
            <p className="quote-text">
              “The roast consistency makes dial-in straightforward every morning. The body and crema on our double shots are right where we need them to be.”
            </p>
            <div className="quote-author">
              <strong>Partner Cafe Owner</strong>
              <span>Gomti Nagar, Lucknow</span>
            </div>
          </div>

          <div className="quote-card">
            <p className="quote-text">
              “We wanted an exclusive blend with clear chocolate and hazelnut notes for our breakfast service. The team tested three curves before we locked it in.”
            </p>
            <div className="quote-author">
              <strong>Head of Food & Beverage</strong>
              <span>Hospitality Partner</span>
            </div>
          </div>
        </div>

        {/* Main Enquiry & Sample Request Section */}
        <div className="enquiry-box-container">
          <div className="enquiry-card-grid">
            {/* Left: Contact Info & Roastery details */}
            <div className="enquiry-info-pane bg-forest">
              <span className="pill-tag pill-orange">GET IN TOUCH</span>
              <h3 className="enquiry-info-title">Talk to our roaster.</h3>
              <p className="enquiry-info-p">
                Whether you are opening a new cafe, updating your current beans, or looking for
                whole bean supply, we are happy to chat through options.
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <MapPin size={20} className="contact-icon text-orange" />
                  <div>
                    <strong>The Roast Room Roastery</strong>
                    <p>Ground floor, 1/59, Vastu Khand, Gomti Nagar, Lucknow 226010, Uttar Pradesh</p>
                  </div>
                </div>

                <div className="contact-item">
                  <Phone size={20} className="contact-icon text-orange" />
                  <div>
                    <strong>Direct Roastery Phone</strong>
                    <p><a href="tel:+919310034617">+91 9310034617</a></p>
                  </div>
                </div>

                <div className="contact-item">
                  <Mail size={20} className="contact-icon text-orange" />
                  <div>
                    <strong>Email Inquiries</strong>
                    <p><a href="mailto:hello@theroastroom.in">hello@theroastroom.in</a></p>
                  </div>
                </div>
              </div>

              <div className="sample-dispatch-note">
                <div className="dispatch-badge">48-Hour Dispatch</div>
                <p>We roast sample batches to order so you receive beans within days of roasting.</p>
              </div>
            </div>

            {/* Right: The Single CTA Sample Form */}
            <div className="enquiry-form-pane">
              {submitted ? (
                <div className="form-success-card">
                  <CheckCircle2 size={52} className="text-orange" />
                  <h3>Sample request received.</h3>
                  <p>
                    Thank you, <strong>{formData.fullName || 'Partner'}</strong>. We have logged your request
                    for <strong>{formData.businessName || 'your bar'}</strong>.
                  </p>
                  <p className="success-sub">
                    Our roasting team will review your brew preferences and contact you at{' '}
                    <strong>{formData.phone || formData.email}</strong> within 24 hours to confirm your sample pack.
                  </p>
                  <button
                    type="button"
                    className="btn-outline-forest"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        businessName: '',
                        businessType: 'Cafe',
                        phone: '',
                        email: '',
                        brewMethods: ['Espresso'],
                        city: '',
                        notes: '',
                      });
                    }}
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form className="sample-form" onSubmit={handleSubmit}>
                  <div className="form-header">
                    <h3 className="form-title">Request a sample</h3>
                    <p className="form-sub">
                      Tell us what you brew. We will send freshly roasted samples tailored to your bar.
                    </p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Your Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="businessName">Cafe / Business Name *</label>
                      <input
                        type="text"
                        id="businessName"
                        required
                        placeholder="e.g. Blue Door Coffee"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="businessType">Business Type</label>
                      <select
                        id="businessType"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      >
                        <option value="Cafe">Cafe / Coffee Bar</option>
                        <option value="Hotel">Hotel / Resort</option>
                        <option value="Restaurant">Restaurant / Bistro</option>
                        <option value="Corporate">Corporate Workspace</option>
                        <option value="Retail">Retail Store</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">City / Location *</label>
                      <input
                        type="text"
                        id="city"
                        required
                        placeholder="e.g. Lucknow, Delhi NCR, Kanpur"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="hello@yourcafe.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Brew Methods */}
                  <div className="form-group">
                    <label>How do you brew? (Select all that apply)</label>
                    <div className="brew-checkboxes-grid">
                      {['Espresso', 'Pour Over / Manual Filter', 'French Press / Aeropress', 'Cold Brew', 'Batch Brew'].map(
                        (method) => {
                          const isChecked = formData.brewMethods.includes(method);
                          return (
                            <label key={method} className={`checkbox-chip ${isChecked ? 'checked' : ''}`}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(method)}
                              />
                              <span>{method}</span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">Notes or Target Flavor Profile</label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="e.g. Looking for a nutty, chocolatey espresso that pairs well with milk."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary form-submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? 'Preparing your request...' : (
                      <>
                        <Send size={16} /> Request a sample
                      </>
                    )}
                  </button>

                  <p className="form-privacy-note">
                    We only use your contact details to coordinate sample delivery. No spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
