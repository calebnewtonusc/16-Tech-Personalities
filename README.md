# Tech 16 Personalities

**Developer Personality Assessment and Career Guidance Tool**

A 16Personalities-style quiz tailored for tech students and professionals, providing personalized role recommendations, learning paths, and school-specific resources.

## What It Does

Tech 16 Personalities assesses developers across 5 key dimensions:

1. **Focus:** Builder (B) ↔ Analyzer (A)
2. **Interface:** User-Facing (U) ↔ Systems-Facing (S)
3. **Change Style:** Exploratory (E) ↔ Operational (O)
4. **Decision Driver:** Vision-Led (V) ↔ Logic-Led (L)
5. **Execution:** Adaptive (A) ↔ Structured (T) [suffix]

Results in a **4-letter type code + suffix** (e.g., B-S-O-L-T) with:
- Percentage scores on each scale
- Personalized type description
- Top 3 role recommendations from 16 tech roles
- Skill roadmaps and learning resources
- School-specific course/club recommendations

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Supabase (Postgres with Prisma)
- **Auth:** NextAuth.js (Google/Email)
- **Analytics:** PostHog (optional)
- **Deployment:** Vercel

## Features

### User Experience
- ✅ 40-question Likert scale quiz (1-5)
- ✅ Progress tracking with save/resume
- ✅ Mobile-first responsive design
- ✅ Results page with 16Personalities-style visualization
- ✅ Shareable result cards (images + PDF)
- ✅ Optional account system for history tracking

### Recommendation Engine
- ✅ Type-to-role mapping with weighted scoring
- ✅ Top 3 role recommendations with fit percentages
- ✅ Learning paths per role (skills, courses, resources)
- ✅ School-specific filtering (USC, etc.)

### Admin CMS
- ✅ Question management (edit text, scale, weights)
- ✅ Type profile editing (16 personality descriptions)
- ✅ Resource directory management
- ✅ Analytics dashboard (completion rates, type distribution)

## Project Structure

```
16TechPersonalities/
├── frontend/
│   └── src/
│       ├── app/           # Next.js App Router pages
│       ├── components/    # React components
│       ├── lib/           # Utilities and helpers
│       └── types/         # TypeScript type definitions
├── backend/
│   └── src/
│       ├── routes/        # API routes
│       ├── services/      # Business logic
│       └── models/        # Data models
├── database/
│   ├── migrations/        # Prisma migrations
│   └── schemas/           # Database schemas
├── docs/                  # Documentation
├── tests/                 # Test suites
└── public/                # Static assets
```

## Database Schema

### Core Tables
- **users** - User accounts and auth
- **schools** - School/university info
- **quizzes** - Quiz versions (versioned for result integrity)
- **questions** - Question bank with scales and weights
- **quiz_sessions** - User quiz sessions (save progress)
- **responses** - User answers to questions
- **type_profiles** - 16 personality type descriptions
- **roles** - Tech role definitions (16 roles)
- **resources** - Learning resources with tags
- **feedback** - User feedback on results

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account (or local Postgres)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/calebnewtonusc/16TechPersonalities.git
cd 16TechPersonalities

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations
npx prisma migrate dev

# Seed the database (questions, types, roles)
npm run seed

# Start development server
npm run dev

# Visit http://localhost:3000
```

## The 5 Scales

### 1. Focus: Builder (B) ↔ Analyzer (A)
- **Builder:** "Ship it and iterate" mindset, prototyping, MVP-first
- **Analyzer:** Deep understanding, root cause analysis, thorough planning

### 2. Interface: User-Facing (U) ↔ Systems-Facing (S)
- **User-Facing:** UI/UX, product features, user feedback loops
- **Systems-Facing:** Infrastructure, databases, performance optimization

### 3. Change Style: Exploratory (E) ↔ Operational (O)
- **Exploratory:** New projects, R&D, experimentation, greenfield
- **Operational:** Scaling, reliability, maintenance, production stability

### 4. Decision Driver: Vision-Led (V) ↔ Logic-Led (L)
- **Vision-Led:** Product vision, user stories, "why" and impact
- **Logic-Led:** Data-driven, metrics, technical constraints, "what works"

### 5. Execution: Adaptive (A) ↔ Structured (T)
- **Adaptive:** Flexible, context-switching, ambiguity-tolerant
- **Structured:** Process-oriented, planning, predictability

## 16 Tech Roles

Product, Design, Frontend, Backend, Full-Stack, Mobile, DevOps/SRE, Data Engineer, ML Engineer, Data Scientist, Research Scientist, Security Engineer, QA/Test, PM, TPM, Solutions Architect

## Development Roadmap

🚧 **Under Active Development** - Week 0-2 Project

- [ ] Core quiz flow (question display, progress, scoring)
- [ ] Results page with personality visualization
- [ ] Recommendation engine (role matching)
- [ ] Database schema and migrations
- [ ] Admin CMS for content management
- [ ] Share features (cards, PDF, compare)
- [ ] School-specific resource filtering
- [ ] Analytics dashboard
- [ ] Deployment to Vercel

## Future Enhancements

- 🔮 ML-powered role prediction (train on role interest labels)
- 🔮 Personalized weight optimization
- 🔮 Team compatibility analysis
- 🔮 Question quality scoring
- 🔮 A/B testing for question variations

## License

MIT

---

**Part of the 2026 ML/AI Engineering Portfolio**
Building data-driven career guidance with personalization and actionable recommendations.
