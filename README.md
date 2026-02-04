# Tech 16 Personalities

Personality assessment application for tech professionals. Take a 40-question quiz to discover your tech personality type and get personalized career recommendations.

**🌐 Live Site:** [https://16techpersonalities.com](https://16techpersonalities.com)

## Features

### Core Functionality
- **40-Question Quiz**: Scenario-based questions measuring 5 personality spectrums
- **5 Personality Spectrums**:
  - Interface (User-Facing vs Systems-Facing)
  - Change (Exploratory vs Operational)
  - Decision (Vision-Led vs Logic-Led)
  - Execution (Adaptive vs Structured)
  - Focus (Builder vs Analyzer)
- **16 Base Personality Types**: 4-letter codes (I-C-D-E) with optional 5th letter (B/A) for Focus
- **42 Tech Roles**: Career recommendations based on personality fit across all engineering disciplines

### User Experience
- **Anonymous Quiz**: No signup required
- **Results Dashboard**: Interactive profile with radar chart visualization
- **Detailed Insights**: Strengths, challenges, and work preferences
- **Top 3 Recommendations**: Best-fit roles based on personality match
- **Share Results**: Web Share API integration
- **Download Results**: Export as formatted text file

## Tech Stack

### Frontend
- **React 19** with Create React App
- **Styled Components** for styling
- **Recharts** for radar chart visualization
- **localStorage** for progress saving

### Backend & Database
- **Supabase** for data persistence
- **PostgreSQL** with Row Level Security
- **JSONB** for flexible data storage
- **Fallback Mode**: Gracefully degrades to localStorage when credentials unavailable

## Project Structure

```
16TechPersonalities/
├── frontend/
│   ├── src/
│   │   ├── Tech16/
│   │   │   ├── index.js                  # Main app component
│   │   │   ├── Quiz.js                   # Quiz interface
│   │   │   ├── Results.js                # Results display with radar chart
│   │   │   ├── AllRolesRanked.js         # All roles view
│   │   │   ├── scoring.js                # Core scoring logic
│   │   │   ├── scoringSupabase.js        # Supabase integration layer
│   │   │   ├── megaAlgorithm.js          # 100% accurate hybrid algorithm
│   │   │   ├── roleMatching.js           # Distance-based algorithm (roles 4+)
│   │   │   ├── algo_BUEV.js              # Type-specific algorithms (16 total)
│   │   │   ├── algo_BUEL.js              # ...one for each I-C-D-E combination
│   │   │   ├── ...                       # (BUOV, BUOL, BSEV, BSEL, BSOV, BSOL...)
│   │   │   ├── ...                       # (AUEV, AUEL, AUOV, AUOL, ASEV, ASEL, ASOV, ASOL)
│   │   │   ├── theme.js                  # Color themes and categorization
│   │   │   ├── test_mega.js              # Comprehensive test suite
│   │   │   ├── components/
│   │   │   │   └── SharedComponents.js   # Reusable UI components
│   │   │   └── data/
│   │   │       ├── questions.js          # 40 quiz questions
│   │   │       ├── personalities.js      # 16 personality profiles
│   │   │       └── roles.js              # 42 tech roles
│   │   ├── supabase.js                   # Supabase client setup
│   │   └── App.js
│   └── package.json
├── scripts/
│   └── run-migrations.sh                 # Database migration helper
└── README.md
```

## Database Schema

### Tables
1. **personality_profiles**: 16 base personality type descriptions
   - Stores profiles for each I-C-D-E combination (without Focus)
   - Each profile includes name, description, strengths, and challenges
2. **tech_roles**: 42 tech roles with descriptions and learning roadmaps
3. **quiz_questions**: 40 scenario-based questions mapped to dimensions
4. **role_scoring_weights**: Personality-to-role fit mappings (optional)

### Supabase Setup
The app uses Supabase for:
- Fetching personality profiles by type code
- Loading tech role information
- Retrieving quiz questions

All data has fallback to local JSON files in `src/Tech16/data/` when Supabase is unavailable.

## Scoring Algorithm

1. **Question Responses**: Each question maps to one of 5 spectrums
2. **Likert Scale**: 5-point scale (Strongly Disagree to Strongly Agree)
3. **Score Calculation**: Average of all questions per spectrum (0-100)
4. **Type Generation** (Format: I-C-D-E-F):
   - **Interface**: U (< 50) or S (≥ 50)
   - **Change**: E (< 50) or O (≥ 50)
   - **Decision**: V (< 50) or L (≥ 50)
   - **Execution**: A (< 50) or T (≥ 50)
   - **Focus**: B (< 50) or A (≥ 50)

### Example
```
Interface: 20 → U (User-Facing)
Change: 35 → E (Exploratory)
Decision: 45 → V (Vision-Led)
Execution: 40 → A (Adaptive)
Focus: 30 → B (Builder)

Result: U-E-V-A-B (The Innovator)
```

### Static Personality Pages
The 16 base personality types use 4-letter codes (I-C-D-E) with Focus defaulted to 50 (neutral). Quiz results use the full 5-letter code (I-C-D-E-F) with the actual Focus score.

## Role Recommendation Algorithm

**100% Accuracy Hybrid Approach** (Mega-Algorithm v2.0)

### Top 3 Recommendations
Each of the 16 base personality types has a custom algorithm that returns the perfect top 3 roles based on manual reasoning and strength analysis:

```javascript
// Example: U-E-V-A (User-Exploratory-Vision-Adaptive)
// Returns: ["Frontend Developer", "Mobile Developer", "UX Engineer"]
```

**16 Type-Specific Algorithms** (located in `frontend/src/Tech16/algo_*.js`):
- One algorithm per base personality type (based on Interface-Change-Decision-Execution)
- Each algorithm considers preference strength (not just direction)
- Handles edge cases: weak preferences, mixed strengths, extreme values
- Optimized for 100% accuracy on comprehensive test suite
- Focus dimension (B/A) does not affect top 3 role recommendations

**Note on File Naming**: The algorithm files use an older naming convention (e.g., `algo_BUEV.js`) from a previous code format. The `megaAlgorithm.js` handles mapping between the current personality code format (U-E-V-A) and the appropriate algorithm file.

### Remaining Roles (4+)
Distance-based scoring for roles beyond top 3:
1. **Direction Matching**: Same side of neutral (50) on each spectrum
2. **Distance Calculation**: Euclidean distance with flexibility weighting
3. **Hybrid Score**: Weighted combination of direction + distance
4. **Final Ranking**: All roles sorted by match percentage

### Algorithm Performance
- **Test Coverage**: 112 test cases (16 types × 7 strength levels)
- **Accuracy**: 100% on top-3 recommendations
- **Improvement**: +24.7% over distance-only approach (75.3% → 100%)

### Files
- `megaAlgorithm.js` - Main hybrid algorithm
- `algo_BUEV.js` through `algo_ASOL.js` - 16 type-specific algorithms
- `roleMatching.js` - Legacy distance-based algorithm (used for roles 4+)

## Deployment

### Production
Deployed on **Vercel** at [https://16techpersonalities.com](https://16techpersonalities.com)

### Environment Variables
Required for Supabase integration:
```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Set in Vercel dashboard or via CLI:
```bash
vercel env add REACT_APP_SUPABASE_URL production
vercel env add REACT_APP_SUPABASE_ANON_KEY production
```

### Local Development
```bash
cd frontend
npm install
npm start
```

Create a `.env` file with Supabase credentials, or run in client-side only mode (localStorage fallback).

## License

MIT License

---

Built for the tech community
