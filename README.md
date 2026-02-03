# Tech 16 Personalities

A comprehensive personality assessment application for tech professionals. Take a 40-question quiz to discover your unique tech personality type and get personalized career recommendations.

**🌐 Live Site:** [https://16techpersonalities.com](https://16techpersonalities.com)

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
- **Results Dashboard**: Interactive personality profile with radar chart
- **Detailed Insights**: Strengths, challenges, and work preferences
- **Top 3 Role Recommendations**: Personalized career matches with learning roadmaps
- **42+ Tech Roles**: View all ranked by personality fit
- **Share Results**: Generate shareable text with Web Share API
- **Download Results**: Export as formatted text file
- **Learning Roadmaps**: Detailed 4-phase career paths from beginner to expert

### Data & Content
- **16 Personality Profiles**: Comprehensive descriptions with unique insights
- **42+ Tech Roles**: All major specializations with detailed information
- **Scenario-Based Questions**: Realistic tech workplace scenarios
- **Balanced Question Distribution**: 8 questions per spectrum

## Tech Stack

### Frontend
- **React 18** with Create React App
- **Styled Components** for styling
- **Recharts** for radar chart visualization
- **localStorage** for progress saving

### Backend & Database
- **Supabase** (optional for data persistence)
- **PostgreSQL** for data storage
- **Row Level Security (RLS)** for data protection
- **JSONB** for flexible data storage

**Note**: The current production version operates client-side only with localStorage. Supabase integration is available but optional.

### Development Tools
- **ESLint** for code quality

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
│   │   │   ├── roleMatching.js           # Role recommendation logic
│   │   │   └── data/
│   │   │       ├── questions.js          # 40 quiz questions
│   │   │       ├── personalities.js      # 16 personality profiles
│   │   │       └── roles.js              # 42+ tech roles
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
- (Optional) Supabase account for data persistence
- Git

### 1. Clone and Install

```bash
cd frontend
npm install
```

### 2. (Optional) Set Up Supabase

If you want to use Supabase for data persistence:

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Create `.env.local`:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations in Supabase SQL editor:
   - First: `database/migrations/001_initial_schema.sql`
   - Then: `database/seed.sql`

### 3. Start Development Server

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. (Optional) Add environment variables if using Supabase:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
4. Deploy

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

1. **Euclidean Distance**: Calculate distance between personality spectrum scores and ideal role profiles
2. **Trait Weights**: Each role has predefined fit weights for each spectrum
3. **Ranking**: Roles sorted by distance (lower = better fit)
4. **Top 3**: Display top 3 role matches with learning roadmaps

## Development

### Available Scripts

```bash
npm start     # Start development server
npm run build # Build for production
npm test      # Run tests
```

### Code Structure

- **Client Components**: All React components for quiz and results
- **Type Safety**: PropTypes for component validation
- **State Management**: React useState and useEffect hooks
- **Data-Driven**: All content loaded from data files for easy updates

### Adding New Features

1. **New Personality Type**: Update `data/personalities.js`
2. **New Role**: Add to `data/roles.js`
3. **New Question**: Update `data/questions.js`
4. **New Spectrum**: Requires schema and code changes

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - Feel free to use this project as a learning resource.

## Acknowledgments

- Inspired by Myers-Briggs Type Indicator (MBTI)
- Built with modern web technologies
- Designed for the tech community

---

Built with care for the tech community
