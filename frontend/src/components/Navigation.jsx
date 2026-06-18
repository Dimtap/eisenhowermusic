import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Schedule', id: 'schedule' },
  { label: 'Sections', id: 'sections' },
  { label: 'Media', id: 'media' },
  { label: 'Contact', id: 'contact' },
];

const Navigation = () => {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement Banner */}
      <div
        data-testid="announcement-banner"
        className="bg-[#2d6a27] text-white py-2 border-b-2 border-[#0A0A0A]"
      >
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] font-heading px-4">
          {content.announcement}
        </p>
      </div>

      {/* Main Nav */}
      <nav
        data-testid="main-nav"
        className={`bg-white/95 backdrop-blur-xl border-b-2 border-[#0A0A0A] transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_0px_#0A0A0A]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              data-testid="nav-logo"
              className="flex items-center gap-3 focus:outline-none"
            >
              <div className="w-10 h-10 bg-[#2d6a27] border-2 border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0px_#c8a227] flex-shrink-0">
                <span className="text-[#c8a227] font-black text-xl font-heading leading-none">I</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2d6a27] font-heading leading-tight">
                  Ike Instrumental
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0A0A0A] font-heading leading-tight">
                  Marching Band
                </p>
              </div>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  data-testid={`nav-link-${link.id}`}
                  onClick={() => scrollTo(link.id)}
                  className="text-xs font-bold uppercase tracking-[0.12em] text-[#0A0A0A] hover:text-[#2d6a27] transition-colors duration-200 font-heading"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Hamburger */}
            <button
              data-testid="nav-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 border-2 border-[#0A0A0A] bg-white hover:bg-[#F3F4F6] transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            data-testid="mobile-menu"
            className="md:hidden border-t-2 border-[#0A0A0A] bg-white"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                data-testid={`mobile-nav-link-${link.id}`}
                onClick={() => scrollTo(link.id)}
                className="w-full px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] text-left text-[#0A0A0A] hover:bg-[#F3F4F6] border-b border-[#E5E7EB] last:border-b-0 font-heading transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
