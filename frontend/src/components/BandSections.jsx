import React from 'react';
import { Music, Wind, Flag, Drum } from 'lucide-react';

const sections = [
  {
    id: 'drumline',
    title: 'Drumline',
    subtitle: 'The Heartbeat',
    description:
      'The rhythmic backbone of the marching band. From snares and bass drums to the front ensemble pit, our percussionists drive the energy of every performance with precision and power.',
    icon: Drum,
    accentBg: '#2d6a27',
    shadow: '#c8a227',
  },
  {
    id: 'brass',
    title: 'Brass',
    subtitle: 'The Power',
    description:
      'Trumpets, trombones, mellophones, baritones, and sousaphones — the Brass section fills the stadium with the unmistakable sound of Ike Instrumental. Loud, proud, and in tune.',
    icon: Music,
    accentBg: '#c8a227',
    shadow: '#2d6a27',
  },
  {
    id: 'woodwinds',
    title: 'Woodwinds',
    subtitle: 'The Melody',
    description:
      'Flutes, clarinets, and saxophones — the Woodwinds bring melody, color, and texture to our show music. Their precision and musicality elevate every performance.',
    icon: Wind,
    accentBg: '#1d4a19',
    shadow: '#c8a227',
  },
  {
    id: 'color-guard',
    title: 'Color Guard',
    subtitle: 'The Visual',
    description:
      'The Color Guard brings the show to life through flag work, rifles, sabres, and dance. They are the visual voice of the band, expressing the emotion of the music through movement.',
    icon: Flag,
    accentBg: '#0A0A0A',
    shadow: '#c8a227',
  },
];

const BandSections = () => {
  return (
    <section
      id="sections"
      data-testid="sections-section"
      className="bg-[#0A0A0A] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#c8a227] font-heading mb-3">
            Our Performers
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase leading-none text-white font-heading">
            Band Sections
          </h2>
          <div className="w-24 h-1 bg-[#2d6a27] mt-4 border border-[#c8a227]" />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                data-testid={`section-card-${s.id}`}
                className="bg-white border-2 border-white flex flex-col hover:-translate-y-2 transition-transform duration-300"
                style={{ boxShadow: `6px 6px 0px ${s.shadow}` }}
              >
                {/* Color Header */}
                <div
                  className="h-32 border-b-2 border-[#0A0A0A] flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: s.accentBg }}
                >
                  <Icon
                    size={56}
                    className="absolute opacity-10 text-white"
                    strokeWidth={1.5}
                  />
                  <p className="relative text-white/40 text-xs font-mono uppercase tracking-widest px-4 text-center">
                    Photo Placeholder
                  </p>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.2em] font-heading"
                    style={{
                      color: s.accentBg === '#c8a227' ? '#a68620' : s.accentBg === '#0A0A0A' ? '#2d6a27' : s.accentBg,
                    }}
                  >
                    {s.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-[#0A0A0A] font-heading">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#495057] font-body flex-1">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee Strip */}
        <div className="mt-16 overflow-hidden border-y-2 border-white/10 py-4">
          <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="text-sm font-bold uppercase tracking-[0.25em] font-heading text-white/20"
              >
                Drumline &bull; Brass &bull; Woodwinds &bull; Color Guard &bull;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BandSections;
