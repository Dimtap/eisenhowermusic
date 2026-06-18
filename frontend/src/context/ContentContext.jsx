import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const DEFAULT_CONTENT = {
  announcement: 'Upcoming Event: Leadership Camp \u2013 June 24',
  about: {
    history:
      'The Ike Instrumental Marching Band has been a proud tradition at Eisenhower High School since 1960. For over six decades, we have represented Rialto, California on fields across Southern California, bringing the spirit of excellence and precision to every performance.',
    mission:
      'We believe that band is more than music \u2014 it is a school for life. Our program develops discipline, teamwork, and a commitment to musical excellence. Every student who marches with us learns to show up, work hard, and perform with pride.',
    community:
      'The Ike Marching Band is a cornerstone of the Rialto community. From Friday night football games to regional competitions, we carry the Green and Gold with honor \u2014 inspiring students, families, and neighbors alike.',
  },
  schedule: {
    rehearsals: [
      { date: 'Jun 24, 2025', time: 'TBD', event: 'Leadership Camp', location: 'Eisenhower High School' },
      { date: 'Every Tuesday', time: '3:30 PM \u2013 6:00 PM', event: 'Full Band Rehearsal', location: 'EHS Band Room & Field' },
      { date: 'Every Thursday', time: '3:30 PM \u2013 6:00 PM', event: 'Full Band Rehearsal', location: 'EHS Band Room & Field' },
      { date: 'Select Saturdays', time: '8:00 AM \u2013 12:00 PM', event: 'Pre-Competition Run-Through', location: 'EHS Field' },
      { date: 'Aug 4\u20138, 2025', time: '8:00 AM \u2013 5:00 PM', event: 'Band Camp Week', location: 'Eisenhower High School' },
      { date: 'Aug 22, 2025', time: '6:00 PM', event: 'Booster Meeting / Parent Night', location: 'EHS Auditorium' },
    ],
    games: [
      { date: 'Sep 5, 2025', time: '7:00 PM', event: 'Home vs. Colton HS', location: 'Eisenhower Stadium' },
      { date: 'Sep 12, 2025', time: '7:00 PM', event: 'Away @ Fontana HS', location: 'Fontana HS Stadium' },
      { date: 'Sep 19, 2025', time: '7:00 PM', event: 'Home vs. Bloomington HS', location: 'Eisenhower Stadium' },
      { date: 'Sep 26, 2025', time: '7:00 PM', event: 'Away @ Cajon HS', location: 'Cajon HS Stadium' },
      { date: 'Oct 3, 2025', time: '7:00 PM', event: 'Homecoming \u2013 Home vs. Pacific HS', location: 'Eisenhower Stadium' },
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
  },
  media: {
    photos: [
      { label: 'Football Game Performance', imageUrl: '', color: '#2d6a27' },
      { label: 'Competition Day', imageUrl: '', color: '#c8a227' },
      { label: 'Rehearsal Session', imageUrl: '', color: '#1d4a19' },
      { label: 'Drumline Feature', imageUrl: '', color: '#0A0A0A' },
      { label: 'Color Guard Performance', imageUrl: '', color: '#a68620' },
      { label: 'Halftime Show', imageUrl: '', color: '#3a7a33' },
    ],
    videos: [
      { label: 'Halftime Show \u2013 Homecoming 2024', videoUrl: '', color: '#0A0A0A' },
      { label: 'SCSBOA Competition Performance', videoUrl: '', color: '#1d4a19' },
      { label: 'Full Band Showcase Night', videoUrl: '', color: '#0A0A0A' },
    ],
  },
  contact: {
    directorName: 'Band Director',
    directorEmail: 'director@eisenhowerhighschool.edu',
  },
};

const ContentContext = createContext({
  content: DEFAULT_CONTENT,
  refreshContent: () => {},
});

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/content`);
      setContent({ ...DEFAULT_CONTENT, ...res.data });
    } catch {
      // keep defaults on error
    }
  };

  useEffect(() => {
    fetchContent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContentContext.Provider value={{ content, refreshContent: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
