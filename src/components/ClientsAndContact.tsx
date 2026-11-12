import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Coffee, Building, Utensils, Briefcase, Tag } from 'lucide-react';
import { FSSAIComplianceBadge } from './BrandIcons';

export const ClientsAndContact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    businessType: 'Cafe',
    phone: '',
    email: '',
    serviceInterest: 'Sample Pack',
    coffeeFormat: 'Whole Beans',
    brewMethods: ['Espresso'],
    bookCuppingSession: false,
    city: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleBrewMethodToggle = (method: string) => {
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
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  // Partner segments with White-Label Branding added
  const partnerTypes = [
    { icon: Coffee, title: 'Specialty Coffee Bars', desc: 'Dialed-in roast profiles and cupping sessions for barista consistency.' },
    { icon: Tag, title: 'White-Label Café Partners', desc: 'Your beans packaged in custom foil packets with your café branding.' },
    { icon: Building, title: 'Boutique Hotels & Stays', desc: 'Distinctive breakfast and lounge roast profiles with reliable delivery.' },
    { icon: Utensils, title: 'Independent Restaurants', desc: 'Custom blends pairing cleanly with dinner menus and desserts.' },
    { icon: Briefcase, title: 'Corporate Workspaces', desc: 'Freshly roasted whole beans and pre-ground coffee for office teams.' },
  ];

  return (
    <section id="contact" className="section-padding clients-contact-section">
      <div className="container">
        {/* Partner Sectors Overview */}
        <div className="section-header text-center" data-reveal="fade-up">
          <span className="pill-tag pill-forest">WHO WE ROAST FOR</span>
          <h2 className="section-title">Built for hospitality, cafés & home brewers.</h2>
          <p className="section-subtitle">
            Reliable roasting schedules, white-label café packaging, and hands-on cupping sessions in Lucknow.
          </p>
        </div>

        {/* Partner Type Cards */}
        <div className="partner-types-grid partner-types-grid-five">
          {partnerTypes.map((item, idx) => {
            const Icon = item.icon;
            const staggerClass = `stagger-${(idx % 5) + 1}`;
            return (
              <div
                key={idx}
                className={`partner-type-card ${staggerClass}`}
                data-reveal="pop"
              >
                <div className="partner-icon-circle">
                  <Icon size={22} className="text-orange" />
                </div>
                <h4 className="partner-card-title">{item.title}</h4>
                <p className="partner-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Honest Partner Perspectives */}
        <div className="partner-quotes-strip">
          <div className="quote-card stagger-1" data-reveal="fade-left">
            <p className="quote-text">
              “The roast consistency makes dial-in straightforward every morning. The body and crema on our double shots are right where we need them to be.”
            </p>
            <div className="quote-author">
              <strong>Partner Cafe Owner</strong>
              <span>Gomti Nagar, Lucknow</span>
            </div>
          </div>

          <div className="quote-card stagger-2" data-reveal="fade-right">
            <p className="quote-text">
              “We brought our head baristas to test shots on their commercial machines before launching. The cupping session helped us dial in the exact flavor profile we wanted.”
            </p>
            <div className="quote-author">
              <strong>Specialty Coffee Director</strong>
              <span>Lucknow Coffee House</span>
            </div>
          </div>
        </div>

        {/* Main Enquiry & Sample Request Section */}
        <div className="enquiry-box-container stagger-1" data-reveal="pop">
          <div className="enquiry-card-grid">
            {/* Left: Contact Info & Roastery details */}
            <div className="enquiry-info-pane bg-forest">
              <span className="pill-tag pill-orange">GET IN TOUCH</span>
              <h3 className="enquiry-info-title">Talk to our roaster.</h3>
              <p className="enquiry-info-p">
                Whether you are opening a new café, launching white-label coffee with your own branding, booking a cupping session, or ordering ground coffee for home brewing.
              </p>

              <div className="contact-details-list">
                <div className="contact-item">
                  <MapPin size={20} className="contact-icon text-orange" />
                  <div>
                    <strong>The Roast Room Roastery</strong>
                    <p>Ground floor, 1/58, Vastu Khand, Gomti Nagar, Lucknow 226010, Uttar Pradesh</p>
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

              {/* Verified Food Safety Certification */}
              <div className="contact-fssai-box">
                <FSSAIComplianceBadge variant="compact" />
              </div>

              <div className="sample-dispatch-note">
                <div className="dispatch-badge">48-Hour Dispatch</div>
                <p>Samples roasted and dispatched following proper degassing so you experience peak balanced flavor.</p>
              </div>
            </div>

            {/* Right: The Single CTA Sample Form */}
            <div className="enquiry-form-pane">
              {submitted ? (
                <div className="form-success-card">
                  <CheckCircle2 size={52} className="text-orange" />
                  <h3>Inquiry received.</h3>
                  <p>
                    Thank you, <strong>{formData.fullName || 'Partner'}</strong>. We have logged your request
                    for <strong>{formData.businessName || 'your setup'}</strong> ({formData.serviceInterest}).
                  </p>
                  <p className="success-sub">
                    Our roasting team will contact you at{' '}
                    <strong>{formData.phone || formData.email}</strong> to coordinate your sample dispatch or schedule your roastery tasting session.
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
                        serviceInterest: 'Sample Pack',
                        coffeeFormat: 'Whole Beans',
                        brewMethods: ['Espresso'],
                        bookCuppingSession: false,
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
                    <h3 className="form-title">Request a sample or tasting session</h3>
                    <p className="form-sub">
                      Tell us what you brew. We will send freshly roasted samples or invite your team for an in-roastery cupping session.
                    </p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="serviceInterest">What is your primary interest?</label>
                      <select
                        id="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      >
                        <option value="Free B2B Sample Pack">Free B2B Coffee Sample Pack</option>
                        <option value="White-Label Coffee Branding">White-Label Branding (Coffee in our cafe's packets)</option>
                        <option value="Cupping & Tasting Session Slot">Book a Cupping & Espresso Tasting Session in Lucknow</option>
                        <option value="Custom Roast Profiling">Custom Roast Profiling for our Bar</option>
                        <option value="B2B Wholesale Supply">B2B Wholesale Supply</option>
                        <option value="Home Brewer Order">Retail Whole Beans / Ground Coffee (Home Brewer)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="coffeeFormat">Format Preference</label>
                      <select
                        id="coffeeFormat"
                        value={formData.coffeeFormat}
                        onChange={(e) => setFormData({ ...formData, coffeeFormat: e.target.value })}
                      >
                        <option value="Whole Beans">Whole Beans (For grinders & espresso bars)</option>
                        <option value="Ground Coffee">Freshly Ground (No grinder needed at home)</option>
                        <option value="Both">Both Whole Beans & Ground</option>
                      </select>
                    </div>
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
                        placeholder="e.g. Blue Door Coffee or Home Brewer"
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
                        <option value="Cafe">Cafe / Specialty Coffee Bar</option>
                        <option value="White-Label Partner">White-Label Partner (Our Own Brand)</option>
                        <option value="Hotel">Hotel / Resort Hospitality</option>
                        <option value="Restaurant">Restaurant / Bistro</option>
                        <option value="Corporate">Corporate Workspace</option>
                        <option value="Home Brewer">Home Brewer (Personal)</option>
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
                        required
                        placeholder="hello@yourcafe.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* 5 Required Brew Methods per customer feedback */}
                  <div className="form-group">
                    <label>How do you brew? (Select all that apply)</label>
                    <div className="brew-checkboxes-grid">
                      {['pour over', 'aeropress', 'french press', 'espresso', 'cold brew'].map(
                        (method) => {
                          const isChecked = formData.brewMethods.includes(method);
                          return (
                            <label key={method} className={`checkbox-chip ${isChecked ? 'checked' : ''}`}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleBrewMethodToggle(method)}
                              />
                              <span style={{ textTransform: 'capitalize' }}>{method}</span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Cupping Session Checkbox */}
                  <div className="cupping-checkbox-row">
                    <label className="checkbox-label-cupping">
                      <input
                        type="checkbox"
                        checked={formData.bookCuppingSession}
                        onChange={(e) => setFormData({ ...formData, bookCuppingSession: e.target.checked })}
                      />
                      <span>
                        <strong>Interested in Roastery Cupping / Espresso Testing?</strong> Check this box if you’d like to book a slot for your head barista to test on our commercial equipment in Lucknow.
                      </span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">Notes, Target Flavor Profile, or Packaging Branding details</label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="e.g. We are looking for custom white-label packaging with our logo, and prefer a nutty, chocolatey espresso profile that cuts through milk."
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
                        <Send size={16} /> Submit Request / Book Slot
                      </>
                    )}
                  </button>

                  <p className="form-privacy-note">
                    We only use your contact details to coordinate sample delivery or schedule tasting sessions. No spam.
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
