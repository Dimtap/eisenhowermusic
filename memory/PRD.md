# PRD — Ike Instrumental Marching Band Website

## Original Problem Statement
Create a fully responsive, polished, and official-looking website for the Eisenhower High School marching band program (Rialto, California, Est. 1960). Colors: Green and Gold. Sections: Home (with Announcement: "Leadership camp june 24"), About, Schedule, Sections, Media, Contact. Use solid color placeholders. User requires a simple CMS to change text and images after deploy, protected by an admin password. Contact form should use Formspree (form ID: `meewbkry`).

## Architecture

### Stack
- **Frontend**: React, Tailwind CSS, Shadcn UI
- **Backend**: FastAPI (Python), MongoDB
- **Auth**: Password-only JWT (cookie-based, via Emergent integration playbook)
- **Contact Form**: Formspree (`meewbkry`)
- **State Management**: React Context API (ContentContext)

### Directory Structure
```
/app/
├── backend/
│   ├── server.py          # FastAPI app with Auth + CMS endpoints
│   ├── requirements.txt
│   └── .env               # MONGO_URL, DB_NAME, ADMIN_PASSWORD, JWT_SECRET
├── frontend/
│   ├── src/
│   │   ├── App.js          # Routes: / (MainSite) + /admin (AdminPage)
│   │   ├── context/ContentContext.jsx   # Fetches /api/content, provides to all components
│   │   └── components/
│   │       ├── Navigation.jsx   # Dynamic announcement banner
│   │       ├── Hero.jsx         # Static hero section
│   │       ├── About.jsx        # Dynamic text from CMS
│   │       ├── Schedule.jsx     # Dynamic schedule tables from CMS
│   │       ├── BandSections.jsx # Static band sections
│   │       ├── Media.jsx        # Dynamic photos/videos from CMS
│   │       ├── Contact.jsx      # Formspree form + dynamic director info
│   │       └── admin/
│   │           ├── AdminPage.jsx    # Auth check, renders Login or Panel
│   │           ├── AdminLogin.jsx   # Password-only login form
│   │           └── AdminPanel.jsx   # Full CMS tabs
│   └── .env               # REACT_APP_BACKEND_URL
└── memory/
    ├── PRD.md
    ├── test_credentials.md
    └── CHANGELOG.md
```

### Key API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/admin-login | None | Login with password, sets access_token cookie |
| POST | /api/auth/admin-logout | None | Clears access_token cookie |
| GET | /api/auth/me | Cookie | Verify auth status |
| GET | /api/content | None | Get full site content JSON |
| PUT | /api/content | Cookie | Update full site content |

### DB Schema
- `admins`: `{ role: "admin", password_hash, created_at }`
- `site_content`: `{ type: "site_content", announcement, about, schedule, media, contact }`

### CMS Editable Sections
- **Announcement**: Banner text across the top of every page
- **About**: history, mission, community text blocks
- **Schedule**: rehearsals, games, competitions (add/edit/delete rows)
- **Media**: photos (label + imageUrl + color), videos (label + videoUrl + color)
- **Contact**: directorName, directorEmail

---

## What's Been Implemented

### Session 1 (Initial MVP)
- Full 6-section responsive website with Green & Gold design
- Navigation with hamburger menu
- Hero, About, Schedule, BandSections, Media, Contact sections
- Footer with quick links and social
- Static placeholder content

### Session 2 (CMS + Admin Panel)
- Backend rewrite with Auth (JWT cookie) + CMS endpoints
- Admin UI components: AdminPage, AdminLogin, AdminPanel
- ContentContext for dynamic content management
- `@formspree/react` dependency installed

### Session 3 (Full Integration — Feb 2026)
- **Wired ContentContext** across all components (Navigation, About, Schedule, Media, Contact)
- **Admin routing** added to App.js (`/admin` route, wrapped in ContentProvider)
- **Formspree activated** with real form ID `meewbkry`
- **Backend .env** updated with `ADMIN_PASSWORD="Er!2Gx9kL4"` and `JWT_SECRET`
- **test_credentials.md** updated with correct credentials
- All 12 tests passed (100% backend + frontend)

---

## Prioritized Backlog

### P0 — Critical
- None (MVP complete)

### P1 — Enhancements
- Instagram embed feed for @ikeinstrumental
- Cookie `secure=True` for production deployment (currently `secure=False`)
- Brute-force login lockout (5 attempts)

### P2 — Future
- Photo upload via file input (vs URL paste)
- Rich text editor for about section
- Custom domain configuration
- Email notifications for contact form submissions
