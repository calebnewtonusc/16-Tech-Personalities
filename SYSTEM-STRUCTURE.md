# Tech16 Personality System Structure

## 4 Pillars + 1 Modifier

The Tech16 system is based on **5 dimensions**, structured as **4 core pillars** plus **1 modifier suffix**:

### The 5 Dimensions:

1. **Focus** (Position 1) - **PREFIX**
   - Builder (B) - Fast execution, tangible results
   - Analyzer (A) - Deep analysis, understanding systems
   - **8 questions** (Q1-8)

2. **Interface** (Position 2)
   - User-facing (U) - Frontend, user experience
   - Systems-facing (S) - Backend, infrastructure
   - **8 questions** (Q9-16)

3. **Change** (Position 3)
   - Exploratory (E) - Innovation, new solutions
   - Operational (O) - Optimization, stability
   - **8 questions** (Q17-24)

4. **Decision** (Position 4)
   - Vision-led (V) - Product strategy, user needs
   - Logic-led (L) - Data-driven, technical merit
   - **8 questions** (Q25-32)

5. **Execution** (Position 5) - **SUFFIX MODIFIER**
   - Adaptive (A) - Flexible, context-switching
   - Structured (T) - Planned, focused
   - **8 questions** (Q33-40)

---

## Code Structure

### 5-Letter Full Code (Quiz Result)
Format: `Focus-Interface-Change-Decision-Execution`

**Examples:**
- `B-U-E-V-A` = Builder, User-facing, Exploratory, Vision-led, Adaptive
- `A-S-O-L-T` = Analyzer, Systems, Operational, Logic, Structured

### 4-Letter Base Code (Database Storage)
Format: `Focus-Interface-Change-Decision`

The database stores **16 base personality profiles** (2^4 = 16 combinations):
- `B-U-E-V` (without Execution modifier)
- `A-S-O-L` (without Execution modifier)

The Execution modifier creates **32 total variations** (16 base × 2 execution styles).

---

## Why This Structure?

**4 Pillars** define your **core developer personality**:
- What drives you (Focus)
- Where you work (Interface)
- How you approach change (Change)
- How you decide (Decision)

**1 Modifier** describes your **work style**:
- How you execute (Execution: Adaptive vs Structured)

---

## Database Schema

### personality_profiles
- `type_code`: 4-letter base code (B-U-E-V)
- 16 total rows

### quiz_versions
- `questions`: 40 questions (8 per dimension)
- Each question has:
  - `spectrum`: "focus", "interface", "change", "decision", or "execution"
  - `direction`: Target letter (e.g., "builder", "analyzer", "user", etc.)

### role_scoring_weights
- Maps base personality codes to role fit scores

---

## Scoring Algorithm

1. Calculate scores for each dimension (0-100 scale)
   - **< 50**: Low side (B, U, E, V, A)
   - **≥ 50**: High side (A, S, O, L, T)

2. Generate 5-letter code based on scores

3. Strip Execution suffix to get 4-letter base code

4. Look up personality profile using base code

---

## Display

- **Gallery**: Show 16 base types with 4-letter codes
- **Quiz Results**: Show 5-letter full code with Execution modifier
- **Personality Detail**: Use 4-letter base code for profile lookup
- **Colored Codes**: Each letter gets unique color for visual identification
