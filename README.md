# Tech 16 Personalities

A comprehensive full-stack personality assessment application for tech professionals. Take a 40-question quiz to discover your unique tech personality type and get personalized career recommendations.

## Features

### Core Functionality
- **40-Question Likert Quiz**: Scenario-based questions measuring 5 core spectrums
- **5 Personality Spectrums**:
  - Focus (Builder vs Analyzer)
  - Interface (User-Facing vs Systems-Facing)
  - Change Style (Exploratory vs Operational)
  - Decision Driver (Vision-Led vs Logic-Led)
  - Execution (Adaptive vs Structured)
- **16 Unique Personality Types**: 4-letter codes with -A/-T suffix
- **Trait-Weighted Role Mapping**: Personalized career recommendations
- **Quiz Versioning**: Ensures result integrity over time

### User Features
- **Anonymous Quiz Taking**: No signup required
- **Results Dashboard**: View quiz history and saved results
- **Share Results**: Generate shareable links
- **Download PDF Card**: Export beautiful results card
- **Compare Feature**: Side-by-side personality comparison
- **Learning Roadmaps**: Detailed career paths from beginner to expert

### Authentication
- Email/password authentication
- Google OAuth integration
- Protected routes for dashboard
- Row-level security (RLS) policies

### Admin CMS
- Manage personality profiles (CRUD)
- Manage tech roles (CRUD)
- Edit role scoring weights
- View analytics and type distribution
- Monitor quiz completion rates

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** with custom theme
- **Recharts** for data visualization
- **jsPDF + html2canvas** for PDF export
- **Lucide React** for icons

### Backend & Database
- **Supabase** for authentication and database
- **PostgreSQL** for data storage
- **Row Level Security (RLS)** for data protection
- **JSONB** for flexible data storage

### Development Tools
- **ESLint** for code quality
- **TypeScript** for type safety

## Project Structure

```
16TechPersonalities/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx              # Root layout with auth
│   │   │   ├── page.tsx                # Landing page
│   │   │   ├── quiz/
│   │   │   │   └── page.tsx            # Quiz interface
│   │   │   ├── results/
│   │   │   │   └── [id]/page.tsx       # Results display
│   │   │   ├── compare/
│   │   │   │   └── page.tsx            # Compare results
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx            # User dashboard
│   │   │   ├── admin/
│   │   │   │   └── page.tsx            # Admin CMS
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx      # Login page
│   │   │   │   └── signup/page.tsx     # Signup page
│   │   │   └── api/
│   │   │       └── quiz/
│   │   │           └── submit/route.ts # Quiz submission API
│   │   ├── components/
│   │   │   ├── QuizQuestion.tsx        # Quiz question component
│   │   │   ├── RadarChart.tsx          # Radar chart visualization
│   │   │   ├── SpectrumBar.tsx         # Spectrum score bar
│   │   │   ├── RoleCard.tsx            # Role recommendation card
│   │   │   ├── ResultsCard.tsx         # Exportable results card
│   │   │   └── AuthProvider.tsx        # Authentication context
│   │   ├── lib/
│   │   │   ├── supabase.ts             # Supabase client
│   │   │   ├── scoring.ts              # Scoring algorithm
│   │   │   ├── roleMapping.ts          # Role recommendation logic
│   │   │   └── utils.ts                # Utility functions
│   │   └── types/
│   │       └── index.ts                # TypeScript types
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── database/
│   ├── migrations/
│   │   └── 001_initial_schema.sql     # Database schema
│   └── seed.sql                        # Seed data
└── README.md
```

## Database Schema

### Tables

1. **quiz_versions**: Stores quiz questions and versioning
2. **quiz_results**: User quiz results with spectrum scores
3. **personality_profiles**: 16 personality type descriptions
4. **tech_roles**: Career role information and roadmaps
5. **role_scoring_weights**: Personality-to-role fit mappings

### Key Features
- UUID primary keys
- JSONB for flexible data storage
- Row Level Security (RLS) policies
- Indexes for performance optimization
- Automated timestamp triggers

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### 1. Clone and Install

```bash
cd /Users/joelnewton/Desktop/2026 Code/Projects/Big-Projects/16TechPersonalities/frontend
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Copy `.env.local.example` to `.env.local`
4. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Database Migrations

In your Supabase SQL editor, run:

1. First, run `database/migrations/001_initial_schema.sql`
2. Then, run `database/seed.sql` to populate initial data

### 4. Configure Authentication

In your Supabase project:

1. Go to Authentication > Providers
2. Enable Email provider
3. Enable Google OAuth (optional):
   - Add Google OAuth credentials
   - Configure redirect URLs

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_BASE_URL`
4. Deploy

### Production Checklist

- [ ] Set up custom domain
- [ ] Configure Supabase production instance
- [ ] Enable Google OAuth with production URLs
- [ ] Set up monitoring and error tracking
- [ ] Configure CDN for static assets
- [ ] Set up backups for database
- [ ] Review and test RLS policies
- [ ] Enable rate limiting for API routes

## Scoring Algorithm

### How It Works

1. **Question Responses**: Each question maps to one of 5 spectrums
2. **Likert Scale**: 5-point scale (Strongly Disagree to Strongly Agree)
3. **Score Calculation**: Average of all questions per spectrum (0-100)
4. **Type Generation**:
   - Score < 50 → First letter (B, U, E, V, A)
   - Score >= 50 → Second letter (A, S, O, L, T)
   - Suffix: A (Adaptive) if execution < 50, T (Structured) if >= 50

### Example

```
Focus: 30 → B (Builder)
Interface: 20 → U (User-Facing)
Change: 35 → E (Exploratory)
Decision: 45 → V (Vision-Led)
Execution: 40 → A (Adaptive)

Result: B-U-E-V-A (The Innovator)
```

## Role Recommendation Algorithm

1. **Base Weights**: Each role has predefined fit weights for each personality type
2. **Score Modifiers**: Applied based on individual spectrum scores
3. **Ranking**: Roles sorted by adjusted fit score
4. **Top 3**: Display top 3 role matches with learning roadmaps

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Structure

- **Server Components**: Used by default for better performance
- **Client Components**: Marked with 'use client' directive
- **API Routes**: RESTful endpoints in /app/api
- **Type Safety**: Comprehensive TypeScript types

### Adding New Features

1. **New Personality Type**: Update `personality_profiles` table
2. **New Role**: Add to `tech_roles` and `role_scoring_weights`
3. **New Question**: Update quiz version with new question
4. **New Spectrum**: Requires schema and code changes

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - Feel free to use this project as a learning resource.

## Acknowledgments

- Inspired by Myers-Briggs Type Indicator (MBTI)
- Built with modern web technologies
- Designed for the tech community

## Support

For issues or questions:
1. Check the documentation
2. Review Supabase logs
3. Check browser console for errors
4. Verify environment variables

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Career path visualization
- [ ] Team compatibility analysis
- [ ] Skills assessment integration
- [ ] Job board integration
- [ ] Community features

---

Built with care for the tech community
