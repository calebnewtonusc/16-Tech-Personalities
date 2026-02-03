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
- **42+ Tech Roles**: Career recommendations based on personality fit

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
│   │   │   ├── megaAlgorithm.js          # 100% accurate hybrid algorithm
│   │   │   ├── roleMatching.js           # Distance-based algorithm (roles 4+)
│   │   │   ├── algo_BUEV.js              # Type-specific algorithms (16 total)
│   │   │   ├── algo_BUEL.js              # ...one for each personality type
│   │   │   ├── ...                       # (algo_BUOV, BUOL, BSEV, etc.)
│   │   │   ├── test_mega.js              # Comprehensive test suite
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

**100% Accuracy Hybrid Approach** (Mega-Algorithm v2.0)

### Top 3 Recommendations
Each of the 16 personality types has a custom algorithm that returns the perfect top 3 roles based on manual reasoning and strength analysis:

```javascript
// Example: B-U-E-V (Builder-User-Exploratory-Vision)
// Returns: ["Frontend Developer", "Mobile Developer", "UX Engineer"]
```

**16 Type-Specific Algorithms** (located in `frontend/src/Tech16/algo_*.js`):
- Each algorithm considers preference strength (not just direction)
- Handles edge cases: weak preferences, mixed strengths, extreme values
- Optimized for 100% accuracy on comprehensive test suite

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

## License

MIT License

---

Built for the tech community
