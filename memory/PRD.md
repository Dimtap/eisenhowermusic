# Ike Instrumental Marching Band Website — PRD

## Project Overview
A fully responsive, polished, official-looking single-page marketing website for the Ike Instrumental Marching Band at Eisenhower High School in Rialto, California.

## Band Info
- **School**: Eisenhower High School
- **Location**: Rialto, California, USA
- **Established**: 1960
- **Colors**: Green (#2d6a27) and Gold (#c8a227)
- **Instagram**: @ikeinstrumental

## User Personas
- **Students** — current and prospective band members
- **Parents** — families interested in the program
- **Community Members** — supporters and fans
- **School Staff** — administrators and coaches

## Core Requirements (Static)
1. Announcement banner at top (Leadership Camp – June 24)
2. Sticky navigation with mobile hamburger menu
3. Hero section with band name, subtitle, CTA buttons
4. About section with history, mission, community pride, stats
5. Schedule section with tabbed view (Rehearsals / Football Games / Competitions)
6. Band Sections cards (Drumline, Brass, Woodwinds, Color Guard)
7. Media section (photo gallery + video placeholders + downloads)
8. Contact section with Formspree form + Instagram link
9. Footer with quick links and school info

## Architecture
- **Frontend**: React (SPA, single-page scroll)
- **Backend**: FastAPI (minimal, not used for static content)
- **Database**: MongoDB (not used for static site)
- **Hosting**: Deployable on GitHub Pages or similar static hosting
- **Contact Form**: Formspree free tier

## What's Been Implemented (Feb 2026)
- [x] Announcement banner – "Upcoming Event: Leadership Camp – June 24"
- [x] Sticky navigation – Desktop + Mobile hamburger menu
- [x] Hero section – Full viewport, dark background, green/gold typography
- [x] About section – Stats grid, history, mission, community pride, value tags
- [x] Schedule section – Tabbed (Rehearsals/Football Games/Competitions), full table data
- [x] Band Sections – 4 cards with solid color headers and descriptions
- [x] Media section – Photo gallery grid, 3 video placeholders, download links
- [x] Contact section – Formspree-integrated form, Instagram link, director info
- [x] Footer – Brand, quick links, social, school colors
- [x] Swiss/brutalist design system with Green & Gold color scheme
- [x] Cabinet Grotesk (headings) + IBM Plex Sans (body) fonts
- [x] Full mobile responsiveness
- [x] Smooth scrolling between all sections
- [x] data-testid on all interactive elements

## Design System
- **Typography**: Cabinet Grotesk (headings, bold) / IBM Plex Sans (body)
- **Primary**: #2d6a27 (Green) / #c8a227 (Gold)
- **Background**: #FDFDFD (light) / #0A0A0A (dark sections)
- **Style**: Swiss/Brutalist — harsh 2px black borders, box shadows, uppercase tracking

## Formspree Setup (Action Required)
To activate the contact form:
1. Create account at https://formspree.io
2. Create a new form
3. Copy the form ID (e.g. `xvoeqkry`)
4. Update `FORMSPREE_ID` in `/app/frontend/src/components/Contact.jsx`

## P0 Backlog (Critical Before Launch)
- [ ] Update director email in Contact.jsx (currently `director@eisenhowerhighschool.edu`)
- [ ] Set up real Formspree form ID
- [ ] Add real band photos to replace solid-color placeholders

## P1 Backlog (Nice to Have)
- [ ] Instagram embed feed from @ikeinstrumental
- [ ] Real performance photos
- [ ] Director name and bio
- [ ] School year dropdown for schedule
- [ ] Animation on section scroll-into-view (Intersection Observer)

## P2 Backlog (Future)
- [ ] Online registration/interest form for new members
- [ ] Merchandise store link
- [ ] Performance recordings embed
- [ ] Alumni section
