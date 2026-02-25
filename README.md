# 16 Tech Personalities

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

A personality-driven career matching tool for the tech industry. Take a 40-question scenario-based quiz across 5 behavioral spectrums and discover which of 16 tech personality types fits you best, then see your top role recommendations from a catalog of 42 tech careers.

**Live Site:** [16techpersonalities.com](https://16techpersonalities.com)

> Screenshot

## Features

- **40-Question Quiz:** scenario-based questions measuring 5 personality spectrums (Interface, Change, Decision, Execution, Focus)
- **16 Personality Types:** unique 4 or 5-letter codes generated from your spectrum scores, each with detailed strengths and challenges
- **42 Tech Role Recommendations:** hybrid rule-based algorithm combines 16 custom type-specific models with distance scoring for precise career matching
- **Radar Chart Results Dashboard:** interactive Recharts visualization of your personality profile with shareable results
- **No Sign-up Required:** quiz runs anonymously; progress saved to localStorage, results optionally persisted to Supabase
- **Export & Share:** download results as a formatted text file or share via the Web Share API

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Create React App, Styled Components |
| Visualization | Recharts (radar chart) |
| Backend / DB | Supabase (PostgreSQL + Row Level Security) |
| State | localStorage with Supabase fallback |
| Deployment | Vercel |

## Getting Started

```bash
cd frontend
npm install
npm start
```

Create a `.env` file in `frontend/` with your Supabase credentials (optional. The app degrades gracefully to localStorage without them):

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Algorithm

The scoring engine works in two passes:

1. **Top 3 Roles:** each of the 16 base personality types has a hand-crafted algorithm (`algo_BUEV.js` through `algo_ASOL.js`) that factors in preference strength, edge cases, and mixed signals. Test coverage: 112 cases (16 types x 7 strength levels).
2. **Remaining Roles (4+):** Euclidean distance scoring with direction-matching and flexibility weighting, handled by `roleMatching.js`.

The `megaAlgorithm.js` entry point routes between these two systems.

> **Disclaimer:** This is a student portfolio project for educational and entertainment purposes. It has not been scientifically validated and should not be used for professional career counseling or hiring decisions.

---

**Author:** Caleb Newton. [calebnewton.me](https://calebnewton.me)
