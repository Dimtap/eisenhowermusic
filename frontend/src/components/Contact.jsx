import React, { useState } from 'react';
import { Instagram, Mail, MapPin, Send, ExternalLink } from 'lucide-react';

// Replace with your Formspree form ID from https://formspree.io
const FORMSPREE_ID = 'xvoeqkry';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section
        id="contact"
        data-testid="contact-section"
        className="bg-[#F3F4F6] py-24 md:py-32 border-t-2 border-[#0A0A0A]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#2d6a27] font-heading mb-3">
              Reach Out
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase leading-none text-[#0A0A0A] font-heading">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-[#c8a227] mt-4 border border-[#0A0A0A]" />
          </div>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* LEFT: Info */}
            <div className="flex flex-col gap-6">
              {/* Director Card */}
              <div className="bg-white border-2 border-[#0A0A0A] p-8 shadow-[4px_4px_0px_#0A0A0A]">
                <h3 className="text-lg font-bold uppercase font-heading mb-6 text-[#0A0A0A] tracking-tight">
                  Band Director
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#2d6a27] border-2 border-[#0A0A0A] flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#495057] font-heading">
                        Email
                      </p>
                      <p className="text-sm font-body text-[#0A0A0A] mt-0.5">
                        director@eisenhowerhighschool.edu
                      </p>
                      <p className="text-xs text-[#9CA3AF] font-body mt-0.5">
                        (Placeholder — update with actual email)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#2d6a27] border-2 border-[#0A0A0A] flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#495057] font-heading">
                        School
                      </p>
                      <p className="text-sm font-body text-[#0A0A0A] mt-0.5">
                        Eisenhower High School
                      </p>
                      <p className="text-sm font-body text-[#495057]">
                        Rialto, California
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Link */}
              <a
                href="https://instagram.com/ikeinstrumental"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="instagram-link"
                className="flex items-center gap-5 bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] p-6 hover:bg-[#2d6a27] transition-colors duration-200 group shadow-[4px_4px_0px_#c8a227]"
              >
                <Instagram size={30} className="text-[#c8a227] flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8a227] font-heading">
                    Follow Us on Instagram
                  </p>
                  <p className="text-xl font-black font-heading mt-0.5">
                    @ikeinstrumental
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0"
                />
              </a>
            </div>

            {/* RIGHT: Form */}
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="bg-white border-2 border-[#0A0A0A] p-8 shadow-[6px_6px_0px_#0A0A0A] space-y-5"
            >
              <h3 className="text-lg font-bold uppercase font-heading text-[#0A0A0A] tracking-tight">
                Send A Message
              </h3>

              {status === 'success' && (
                <div
                  data-testid="form-success"
                  className="bg-[#F0FFF4] border-2 border-[#2d6a27] p-4 text-sm font-bold text-[#2d6a27] font-heading uppercase tracking-wider"
                >
                  Message sent! We&apos;ll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div
                  data-testid="form-error"
                  className="bg-red-50 border-2 border-red-500 p-4 text-sm font-bold text-red-600 font-heading uppercase tracking-wider"
                >
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] font-heading mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    data-testid="contact-input-name"
                    placeholder="Your full name"
                    className="w-full border-2 border-[#0A0A0A] bg-white p-3 rounded-none focus:outline-none focus:border-[#2d6a27] shadow-[2px_2px_0px_#0A0A0A] text-sm font-body"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] font-heading mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-testid="contact-input-email"
                    placeholder="your@email.com"
                    className="w-full border-2 border-[#0A0A0A] bg-white p-3 rounded-none focus:outline-none focus:border-[#2d6a27] shadow-[2px_2px_0px_#0A0A0A] text-sm font-body"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] font-heading mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  data-testid="contact-input-subject"
                  placeholder="What is this about?"
                  className="w-full border-2 border-[#0A0A0A] bg-white p-3 rounded-none focus:outline-none focus:border-[#2d6a27] shadow-[2px_2px_0px_#0A0A0A] text-sm font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] font-heading mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  data-testid="contact-input-message"
                  placeholder="Your message..."
                  className="w-full border-2 border-[#0A0A0A] bg-white p-3 rounded-none focus:outline-none focus:border-[#2d6a27] shadow-[2px_2px_0px_#0A0A0A] text-sm font-body resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                data-testid="contact-submit-button"
                className="w-full bg-[#2d6a27] text-white px-8 py-4 font-bold uppercase tracking-[0.12em] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0A0A0A] transition-all duration-200 font-heading flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                <Send size={15} />
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              <p className="text-xs text-[#9CA3AF] font-body">
                Form powered by Formspree. To activate, sign up at{' '}
                <a
                  href="https://formspree.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#2d6a27]"
                >
                  formspree.io
                </a>{' '}
                and update the FORMSPREE_ID in Contact.jsx.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        data-testid="footer"
        className="bg-[#0A0A0A] text-white border-t-4 border-[#2d6a27] py-16"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#2d6a27] border-2 border-[#c8a227] flex items-center justify-center shadow-[2px_2px_0px_#c8a227]">
                  <span className="text-[#c8a227] font-black text-2xl font-heading leading-none">
                    I
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] font-heading text-white leading-none">
                    Ike Instrumental
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em] font-heading text-[#9CA3AF] leading-none mt-0.5">
                    Marching Band
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] font-body leading-relaxed">
                Eisenhower High School
                <br />
                Rialto, California &bull; Est. 1960
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c8a227] font-heading mb-5">
                Quick Links
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'schedule', label: 'Schedule' },
                  { id: 'sections', label: 'Band Sections' },
                  { id: 'media', label: 'Media' },
                  { id: 'contact', label: 'Contact' },
                ].map((link) => (
                  <button
                    key={link.id}
                    data-testid={`footer-link-${link.id}`}
                    onClick={() =>
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-sm text-[#6B7280] hover:text-white transition-colors text-left font-body"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social & Colors */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c8a227] font-heading mb-5">
                Follow Us
              </p>
              <a
                href="https://instagram.com/ikeinstrumental"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram-link"
                className="inline-flex items-center gap-3 text-[#6B7280] hover:text-white transition-colors group mb-8"
              >
                <Instagram size={18} className="text-[#c8a227]" />
                <span className="text-sm font-body">@ikeinstrumental</span>
              </a>

              <div className="border-t border-white/10 pt-6 mt-2">
                <p className="text-xs font-bold uppercase tracking-[0.15em] font-heading text-[#c8a227] mb-3">
                  School Colors
                </p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#2d6a27] border border-white/20" />
                    <span className="text-xs text-[#6B7280] font-body">Green</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#c8a227] border border-white/20" />
                    <span className="text-xs text-[#6B7280] font-body">Gold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#4B5563] font-body">
              &copy; {new Date().getFullYear()} Ike Instrumental Marching Band &mdash;
              Eisenhower High School, Rialto, CA
            </p>
            <p className="text-xs text-[#4B5563] font-body">
              Established 1960 &bull; Green &amp; Gold
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
