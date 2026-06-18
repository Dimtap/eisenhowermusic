import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const scheduleData = {
  rehearsals: [
    { date: 'Jun 24, 2025', time: 'TBD', event: 'Leadership Camp', location: 'Eisenhower High School' },
    { date: 'Every Tuesday', time: '3:30 PM – 6:00 PM', event: 'Full Band Rehearsal', location: 'EHS Band Room & Field' },
    { date: 'Every Thursday', time: '3:30 PM – 6:00 PM', event: 'Full Band Rehearsal', location: 'EHS Band Room & Field' },
    { date: 'Select Saturdays', time: '8:00 AM – 12:00 PM', event: 'Pre-Competition Run-Through', location: 'EHS Field' },
    { date: 'Aug 4–8, 2025', time: '8:00 AM – 5:00 PM', event: 'Band Camp Week', location: 'Eisenhower High School' },
    { date: 'Aug 22, 2025', time: '6:00 PM', event: 'Booster Meeting / Parent Night', location: 'EHS Auditorium' },
  ],
  games: [
    { date: 'Sep 5, 2025', time: '7:00 PM', event: 'Home vs. Colton HS', location: 'Eisenhower Stadium' },
    { date: 'Sep 12, 2025', time: '7:00 PM', event: 'Away @ Fontana HS', location: 'Fontana HS Stadium' },
    { date: 'Sep 19, 2025', time: '7:00 PM', event: 'Home vs. Bloomington HS', location: 'Eisenhower Stadium' },
    { date: 'Sep 26, 2025', time: '7:00 PM', event: 'Away @ Cajon HS', location: 'Cajon HS Stadium' },
    { date: 'Oct 3, 2025', time: '7:00 PM', event: 'Homecoming – Home vs. Pacific HS', location: 'Eisenhower Stadium' },
    { date: 'Oct 10, 2025', time: '7:00 PM', event: 'Away @ Grand Terrace HS', location: 'Grand Terrace Stadium' },
    { date: 'Oct 17, 2025', time: '7:00 PM', event: 'Home vs. Rialto HS', location: 'Eisenhower Stadium' },
  ],
  competitions: [
    { date: 'Sep 27, 2025', time: '8:00 AM', event: 'SCSBOA Prelims', location: 'Colton High School' },
    { date: 'Oct 11, 2025', time: '8:00 AM', event: 'SCSBOA Field Show Invitational', location: 'Victor Valley HS' },
    { date: 'Oct 25, 2025', time: 'All Day', event: 'SCSBOA Semifinals', location: 'Citrus College, Glendora' },
    { date: 'Nov 1, 2025', time: 'All Day', event: 'CBA Invitational Championship', location: 'Ayala High School' },
    { date: 'Nov 8, 2025', time: 'All Day', event: 'CBA State Championship Finals', location: 'TBD' },
  ],
};

const tabs = [
  { id: 'rehearsals', label: 'Rehearsals' },
  { id: 'games', label: 'Football Games' },
  { id: 'competitions', label: 'Competitions' },
];

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('rehearsals');
  const data = scheduleData[activeTab];

  return (
    <section
      id="schedule"
      data-testid="schedule-section"
      className="bg-[#F3F4F6] py-24 md:py-32 border-y-2 border-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#2d6a27] font-heading mb-3">
            2025 Season
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase leading-none text-[#0A0A0A] font-heading">
            Schedule
          </h2>
          <div className="w-24 h-1 bg-[#c8a227] mt-4 border border-[#0A0A0A]" />
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap border-2 border-[#0A0A0A] mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-testid={`schedule-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] font-heading transition-all border-r-2 border-[#0A0A0A] last:border-r-0 ${
                activeTab === tab.id
                  ? 'bg-[#2d6a27] text-white'
                  : 'bg-white text-[#0A0A0A] hover:bg-[#F9FAFB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] overflow-x-auto bg-white">
          <table
            className="w-full border-collapse min-w-[500px]"
            data-testid="schedule-table"
          >
            <thead>
              <tr className="bg-[#0A0A0A] text-white">
                <th className="p-4 text-left">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] font-heading">
                    <Calendar size={13} />
                    Date
                  </span>
                </th>
                <th className="p-4 text-left text-xs font-bold uppercase tracking-[0.15em] font-heading">
                  Event
                </th>
                <th className="p-4 text-left hidden sm:table-cell">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] font-heading">
                    <MapPin size={13} />
                    Location
                  </span>
                </th>
                <th className="p-4 text-left hidden md:table-cell">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] font-heading">
                    <Clock size={13} />
                    Time
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  data-testid={`schedule-row-${i}`}
                  className="border-b-2 border-[#0A0A0A] last:border-b-0 hover:bg-[#F3F4F6] transition-colors"
                >
                  <td className="p-4 font-bold text-sm font-heading text-[#2d6a27] whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="p-4 text-sm font-body text-[#0A0A0A] font-medium">
                    {row.event}
                  </td>
                  <td className="p-4 text-sm font-body text-[#495057] hidden sm:table-cell">
                    {row.location}
                  </td>
                  <td className="p-4 text-sm font-body text-[#495057] hidden md:table-cell whitespace-nowrap">
                    {row.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#6B7280] font-body mt-4 italic">
          * Schedule is subject to change. Contact the director for the most current information.
        </p>
      </div>
    </section>
  );
};

export default Schedule;
