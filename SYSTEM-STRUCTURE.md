# Tech16 Personality System Structure

## 4 Core Pillars + 1 Modifier Suffix

The Tech16 system is based on **5 dimensions**, structured as **4 core pillars** plus **1 modifier suffix**:

### The 5 Dimensions:

1. **Interface** (Position 1)
   - User-facing (U) - Frontend, user experience
   - Systems-facing (S) - Backend, infrastructure
   - **8 questions** (Q1-8)

2. **Change** (Position 2)
   - Exploratory (E) - Innovation, new solutions
   - Operational (O) - Optimization, stability
   - **8 questions** (Q9-16)

3. **Decision** (Position 3)
   - Vision-led (V) - Product strategy, user needs
   - Logic-led (L) - Data-driven, technical merit
   - **8 questions** (Q17-24)

4. **Execution** (Position 4)
   - Adaptive (A) - Flexible, context-switching
   - Structured (T) - Planned, focused
   - **8 questions** (Q25-32)

5. **Focus** (Position 5) - **SUFFIX MODIFIER**
   - Builder (B) - Fast execution, tangible results
   - Analyzer (A) - Deep analysis, understanding systems
   - **8 questions** (Q33-40)

---

## Code Structure

### 4-Letter Base Code (Database Storage)
Format: `Interface-Change-Decision-Execution`

The database stores **16 base personality profiles** (2^4 = 16 combinations):
- `U-E-V-A` = User-facing, Exploratory, Vision-led, Adaptive
- `S-O-L-T` = Systems, Operational, Logic, Structured

### 5-Letter Full Code (Quiz Result with Modifier)
Format: `Interface-Change-Decision-Execution-Focus`

**Examples:**
- `U-E-V-A-B` = User, Exploratory, Vision, Adaptive, **Builder**
- `S-O-L-T-A` = Systems, Operational, Logic, Structured, **Analyzer**

Focus acts as a **lens** through which you express your core personality (32 total variations: 16 base × 2 focus styles).

---

## Why This Structure?

**4 Core Pillars** define your **core tech personality**:
- Where you work (Interface)
- How you approach change (Change)
- How you decide (Decision)
- How you execute (Execution)

**1 Modifier** colors how you express those traits:
- Your mindset lens (Focus: Builder vs Analyzer)

Builder vs Analyzer is like a **personality overlay** - it modifies HOW you express your core traits, similar to introversion/extraversion in MBTI.

---

## Database Schema

### personality_profiles
- `type_code`: 4-letter base code (U-E-V-A)
- 16 total rows

### quiz_versions
- `questions`: 40 questions (8 per dimension)
- Each question has:
  - `spectrum`: "interface", "change", "decision", "execution", or "focus"
  - `direction`: Target letter (e.g., "user", "systems", "builder", etc.)

### role_scoring_weights
- Maps base personality codes to role fit scores

---

## Scoring Algorithm

1. Calculate scores for each dimension (0-100 scale)
   - **< 50**: Low side (U, E, V, A, B)
   - **≥ 50**: High side (S, O, L, T, A)

2. Generate 5-letter code: Interface-Change-Decision-Execution-Focus

3. Strip Focus suffix to get 4-letter base code for database lookup

4. Display Focus as a badge/modifier on results page

---

## Display

- **Gallery**: Show 16 base types with 4-letter codes
- **Quiz Results**: Show 5-letter full code with Focus modifier badge
- **Personality Detail**: Use 4-letter base code for profile lookup
- **Colored Codes**: Each letter gets unique color for visual identification
