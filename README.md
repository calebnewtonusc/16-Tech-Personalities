# Tech 16 Personalities

Personality assessment application for tech professionals. Take a 40-question quiz to discover your tech personality type and get personalized career recommendations.

**🌐 Live Site:** [https://16techpersonalities.com](https://16techpersonalities.com)

## Features

### Core Functionality
- **40-Question Quiz**: Scenario-based questions measuring 5 personality spectrums
- **5 Personality Spectrums**:
  - Focus (Builder vs Analyzer)
  - Interface (User-Facing vs Systems-Facing)
  - Change Style (Exploratory vs Operational)
  - Decision Driver (Vision-Led vs Logic-Led)
  - Execution (Adaptive vs Structured)
- **16 Unique Personality Types**: 4-letter codes with -A/-T suffix
- **42+ Tech Roles**: Personalized career recommendations with detailed roadmaps

### User Experience
- **Anonymous Quiz**: No signup required
- **Results Dashboard**: Interactive profile with radar chart visualization
- **Detailed Insights**: Strengths, challenges, and work preferences
- **Top 3 Recommendations**: Best-fit roles with 4-phase learning roadmaps
- **Share Results**: Web Share API integration
- **Download Results**: Export as formatted text file

## Tech Stack

### Frontend
- **React 19** with Create React App
- **Styled Components** for styling
- **Recharts** for radar chart visualization
- **localStorage** for progress saving

### Backend & Database (Optional)
- **Supabase** for data persistence
- **PostgreSQL** with Row Level Security
- **JSONB** for flexible data storage

**Note**: Production version operates client-side only with localStorage. Supabase integration is available but optional.

## Project Structure

```
16TechPersonalities/
├── frontend/
│   ├── src/
│   │   ├── Tech16/
│   │   │   ├── index.js                  # Main app component
│   │   │   ├── Quiz.js                   # Quiz interface
│   │   │   ├── Results.js                # Results display
│   │   │   ├── AllRolesRanked.js         # All roles view
│   │   │   ├── scoring.js                # Scoring algorithm
│   │   │   ├── roleMatching.js           # Role recommendations
│   │   │   └── data/
│   │   │       ├── questions.js          # 40 quiz questions
│   │   │       ├── personalities.js      # 16 personality profiles
│   │   │       └── roles.js              # Tech roles
│   │   └── App.js
│   └── package.json
├── database/
│   ├── migrations/
│   │   └── 001_initial_schema.sql        # Database schema
│   └── seed.sql                          # Seed data
└── README.md
```

## Database Schema

### Tables
1. **quiz_versions**: Quiz questions and versioning
2. **quiz_results**: User quiz results with spectrum scores
3. **personality_profiles**: 16 personality type descriptions
4. **tech_roles**: Career role information and roadmaps
5. **role_scoring_weights**: Personality-to-role fit mappings

## Setup

### Prerequisites
- Node.js 18+ and npm
- (Optional) Supabase account for data persistence

### Quick Start

```bash
cd frontend
npm install
npm start  # Visit http://localhost:3000
```

### (Optional) Supabase Setup

If you want data persistence:

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Get project URL and anon key from Settings > API
3. Create `.env.local`:
```env
REACT_APP_SUPABASE_URL=your_project_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```
4. Run migrations in Supabase SQL editor:
   - `database/migrations/001_initial_schema.sql`
   - `database/seed.sql`

## Scoring Algorithm

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

1. **Euclidean Distance**: Calculate distance between personality spectrum scores and ideal role profiles
2. **Trait Weights**: Each role has predefined fit weights for each spectrum
3. **Ranking**: Roles sorted by distance (lower = better fit)
4. **Top 3**: Display best-fit roles with learning roadmaps

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. (Optional) Add environment variables if using Supabase:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
4. Deploy

## Available Scripts

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## License

MIT License

---

Built for the tech community
