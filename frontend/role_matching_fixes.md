# Role Matching Weight Fixes

## Problems Identified

1. **Full Stack Engineer** appears 11/16 times (69%) - TOO GENERAL
   - Current: `interface: 50, all traits: 50, flexibility: 45`
   - Problem: Perfect middle + highest flexibility = matches everyone

2. **Product Engineer** appears 10/16 times (63%) - SAME AS FULL STACK
   - Currently mapped to `fullstack` category
   - Needs its own category with less flexibility

3. **Game Developer** appears 8/16 times (50%) - TOO FREQUENT
   - Need to find and reduce flexibility

4. **46 specialized roles NEVER appear** (75%)
   - Security, ML/AI, DevOps/SRE, Design, etc.
   - Flexibility too LOW or ideal traits too extreme

## Solution Strategy

### 1. Reduce Generalist Role Flexibility

**Full Stack Engineer:**
- Change flexibility: `45 → 30`
- Keep traits at 50 (balanced) but make it pickier
- Should only match truly balanced personalities

**Product Engineer:**
- Create separate `product` category
- Ideal traits: Slight user lean, balanced otherwise
- `interface: 45, focus: 50, change: 45, decision: 50, execution: 55`
- Flexibility: `35`

**Game Developer:**
- Find current category and reduce flexibility to `30`
- Make it more specific to creative+systems blend

### 2. Increase Specialized Role Attractiveness

**Frontend Roles** (should dominate U personalities):
- `frontend` flexibility: `35 → 40` (MORE flexible)
- `design` flexibility: `40 → 45` (MORE flexible)
- `mobile` flexibility: `35 → 40`
- Make interface_score more extreme: `15 → 10` (stronger user-facing)

**Backend Roles** (should dominate S personalities):
- `backend` flexibility: `30 → 35` (slightly more flexible)
- Keep interface_score at 80 (strongly systems-facing)

**DevOps/SRE** (should appear for S-O personalities):
- `infrastructure` flexibility: `25 → 30`
- Emphasize operational + systems traits

**Security** (should appear for S-O-L-T):
- `security` flexibility: `25 → 30`
- Emphasize structured + logic traits

**ML/AI** (should appear for S-E-L):
- `mlEngineering` flexibility: `35 → 40`
- `dataScience` flexibility: `35 → 40`
- Emphasize exploratory + logic + systems

**QA/Testing** (should appear for L-T personalities):
- `qa` flexibility: `35 → 40`
- Emphasize logic + structured traits

### 3. Create Missing Categories

**Product Engineering** (separate from Full Stack):
```javascript
product: {
  keywords: ['product engineer'],
  idealTraits: {
    interface_score: 40,     // Slight user lean
    focus_score: 50,
    change_score: 45,        // Slight exploratory
    decision_score: 50,
    execution_score: 55,
  },
  flexibility: 35,
}
```

**Gaming** (if not exists, needs own category):
```javascript
gaming: {
  keywords: ['game developer', 'game engine', 'unity', 'unreal'],
  idealTraits: {
    interface_score: 45,     // Balanced
    focus_score: 50,
    change_score: 40,        // Exploratory
    decision_score: 50,
    execution_score: 50,
  },
  flexibility: 30,           // Less flexible
}
```

### 4. Adjust Ideal Traits for Better Separation

**Key Principle:** Traits should cluster around extremes, not middle

**User-facing roles** (0-30 interface):
- Frontend: 10
- Design/UX: 5
- Mobile: 15
- Growth: 20

**Balanced roles** (40-60 interface):
- Full Stack: 50
- Product: 40
- Game Dev: 45

**Systems-facing roles** (70-100 interface):
- Backend: 80
- Infrastructure: 90
- Database: 95
- Security: 85
- ML: 75

### 5. Testing Plan

After implementing changes:
1. Run `analyze_role_distribution.cjs` again
2. Verify each personality type gets relevant roles in top 10
3. Target metrics:
   - All 61 roles appear in at least 1 top-10
   - No role appears more than 6 times in top-3
   - Frontend roles dominate U personalities
   - Backend roles dominate S personalities
   - Specialized roles (Security, ML, etc.) appear for matching personalities

## Implementation Order

1. [checkmark.circle] Reduce Full Stack flexibility: 45 → 30
2. [checkmark.circle] Create Product Engineer category (remove from fullstack keywords)
3. [checkmark.circle] Find and fix Game Developer category
4. [checkmark.circle] Increase Frontend/Design/Mobile flexibility
5. [checkmark.circle] Increase specialized role flexibility (Security, ML, DevOps, QA)
6. [checkmark.circle] Adjust ideal traits for better separation
7. [checkmark.circle] Test with analyze_role_distribution.cjs
8. [checkmark.circle] Iterate based on results
