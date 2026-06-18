import React from 'react';
import { ChevronDown } from 'lucide-react';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative bg-[#0A0A0A] min-h-screen flex items-center overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#c8a227 1px, transparent 1px), linear-gradient(90deg, #c8a227 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Text */}
          <div className="flex flex-col gap-8 fade-in-up">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c8a227] font-heading mb-5">
                Eisenhower High School &bull; Rialto, California
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-white font-heading">
                Ike
                <br />
                <span className="text-[#c8a227]">Instru&shy;mental</span>
                <br />
                Marching
                <br />
                Band
              </h1>
            </div>

            <div className="border-l-4 border-[#2d6a27] pl-5">
              <p className="text-base text-[#9CA3AF] font-body">
                Rialto, California &bull; Est. 1960
              </p>
              <p className="text-sm text-[#6B7280] font-body mt-1 italic">
                Discipline. Teamwork. Excellence.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                data-testid="hero-cta-schedule"
                onClick={() => scrollTo('schedule')}
                className="bg-[#2d6a27] text-white px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] border-2 border-white shadow-[4px_4px_0px_#c8a227] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#c8a227] transition-all duration-200 font-heading"
              >
                View Schedule
              </button>
              <button
                data-testid="hero-cta-media"
                onClick={() => scrollTo('media')}
                className="bg-[#c8a227] text-[#0A0A0A] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] border-2 border-white shadow-[4px_4px_0px_#2d6a27] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2d6a27] transition-all duration-200 font-heading"
              >
                Media
              </button>
              <button
                data-testid="hero-cta-contact"
                onClick={() => scrollTo('contact')}
                className="bg-transparent text-white px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] border-2 border-white hover:bg-white hover:text-[#0A0A0A] transition-all duration-200 font-heading"
              >
                Contact
              </button>
            </div>

            {/* Stat Pills */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { value: '65+', label: 'Years' },
                { value: '4', label: 'Sections' },
                { value: 'Rialto, CA', label: 'Home' },
              ].map((s) => (
                <div key={s.label} className="border border-white/20 px-4 py-2 text-center">
                  <p className="text-lg font-black text-[#c8a227] font-heading leading-tight">{s.value}</p>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider font-heading">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Placeholder Composition */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2d6a27] border-2 border-white h-52 flex items-center justify-center shadow-[6px_6px_0px_#c8a227] overflow-hidden">
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest px-4 text-center">
                  Photo Placeholder
                </p>
              </div>
              <div className="bg-[#c8a227] border-2 border-white h-52 flex items-center justify-center shadow-[6px_6px_0px_#2d6a27] overflow-hidden">
                <p className="text-black/30 text-xs font-mono uppercase tracking-widest px-4 text-center">
                  Photo Placeholder
                </p>
              </div>
            </div>
            <div className="relative bg-[#1d4a19] border-2 border-white h-44 flex items-center justify-center shadow-[6px_6px_0px_#c8a227] overflow-hidden">
              <p className="absolute text-[120px] font-black text-white/5 font-heading select-none pointer-events-none leading-none">
                1960
              </p>
              <div className="relative text-center">
                <p className="text-[#c8a227] text-xs font-bold uppercase tracking-[0.3em] font-heading">
                  Est.
                </p>
                <p className="text-white text-4xl font-black font-heading">1960</p>
                <p className="text-white/50 text-xs font-mono uppercase tracking-widest mt-1">
                  Photo Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown size={28} className="text-white" />
      </div>
    </section>
  );
};

export default Hero;
