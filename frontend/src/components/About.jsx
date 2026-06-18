import React from 'react';
import { Award, Users, Music, MapPin } from 'lucide-react';

const stats = [
  { value: '65+', label: 'Years of Excellence', icon: Award },
  { value: '100+', label: 'Student Musicians', icon: Users },
  { value: '4', label: 'Performance Sections', icon: Music },
  { value: 'Rialto', label: 'Serving Our Community', icon: MapPin },
];

const values = ['Discipline', 'Teamwork', 'Excellence', 'Community Pride'];

const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="bg-[#FDFDFD] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#2d6a27] font-heading mb-3">
            Our Story
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase leading-none text-[#0A0A0A] font-heading">
            About The Program
          </h2>
          <div className="w-24 h-1 bg-[#c8a227] mt-4 border border-[#0A0A0A]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  data-testid={`about-stat-${stat.value}`}
                  className="bg-white border-2 border-[#0A0A0A] p-6 shadow-[4px_4px_0px_#0A0A0A] hover:-translate-y-1 transition-transform duration-300 flex flex-col gap-3"
                >
                  <Icon size={22} className="text-[#2d6a27]" />
                  <div>
                    <p className="text-3xl font-black text-[#0A0A0A] font-heading leading-none">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[#495057] font-body mt-1">{stat.label}</p>
                  </div>
                </div>
              );
            })}

            {/* Accent block */}
            <div className="col-span-2 bg-[#2d6a27] border-2 border-[#0A0A0A] p-6 shadow-[4px_4px_0px_#c8a227]">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c8a227] font-heading mb-1">
                Home Field
              </p>
              <p className="text-xl font-black text-white font-heading">
                Eisenhower High School
              </p>
              <p className="text-sm text-white/70 font-body mt-1">Rialto, California</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-7">
            <div>
              <h3 className="text-xl font-bold uppercase font-heading text-[#0A0A0A] mb-3 tracking-tight">
                Our History
              </h3>
              <p className="text-base leading-relaxed text-[#0A0A0A] font-body">
                The Ike Instrumental Marching Band has been a proud tradition at Eisenhower
                High School since 1960. For over six decades, we have represented Rialto,
                California on fields across Southern California, bringing the spirit of
                excellence and precision to every performance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold uppercase font-heading text-[#0A0A0A] mb-3 tracking-tight">
                Our Mission
              </h3>
              <p className="text-base leading-relaxed text-[#0A0A0A] font-body">
                We believe that band is more than music — it is a school for life. Our
                program develops <strong>discipline</strong>, <strong>teamwork</strong>, and
                a commitment to <strong>musical excellence</strong>. Every student who
                marches with us learns to show up, work hard, and perform with pride.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold uppercase font-heading text-[#0A0A0A] mb-3 tracking-tight">
                Community Pride
              </h3>
              <p className="text-base leading-relaxed text-[#0A0A0A] font-body">
                The Ike Marching Band is a cornerstone of the Rialto community. From Friday
                night football games to regional competitions, we carry the Green and Gold
                with honor — inspiring students, families, and neighbors alike.
              </p>
            </div>

            {/* Value Tags */}
            <div className="flex flex-wrap gap-3 pt-2">
              {values.map((v) => (
                <span
                  key={v}
                  data-testid={`about-value-${v.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 border-2 border-[#0A0A0A] text-xs font-bold uppercase tracking-[0.15em] font-heading bg-[#F3F4F6]"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
