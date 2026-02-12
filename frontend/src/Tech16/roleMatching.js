// Enhanced role matching algorithm with comprehensive coverage
// Maps personality trait scores to engineering role fit percentages

// Import the mega-algorithm for backward compatibility
import { rankRolesByMatch as megaAlgorithmRankRoles } from './megaAlgorithm';

/**
 * Role categories with ideal trait profiles
 * Each category covers multiple related roles from the database
 *
 * Trait meanings (0-100 scale):
 * - focus_score: 0=Builder, 100=Analyzer
 * - interface_score: 0=User-facing, 100=Systems-facing
 * - change_score: 0=Exploratory, 100=Operational
 * - decision_score: 0=Vision-led, 100=Logic-led
 * - execution_score: 0=Adaptive, 100=Structured
 */

const ROLE_CATEGORIES = {
  // FRONTEND & UI ROLES (User-facing, visual, interactive)
  frontend: {
    keywords: ['frontend', 'web developer', 'react', 'vue', 'angular', 'ui ', 'web3'],
    idealTraits: {
      interface_score: 15,     // Strongly user-facing
      focus_score: 50,         // Neutral (matches both B and A)
      change_score: 40,        // Exploratory lean
      decision_score: 48,      // Neutral
      execution_score: 50,     // Neutral
    },
    flexibility: 42,           // High flexibility to match both B-U and A-U types
  },

  // MOBILE DEVELOPMENT
  mobile: {
    keywords: ['mobile', 'ios', 'android', 'flutter', 'react native', 'cross-platform'],
    idealTraits: {
      interface_score: 18,     // Strongly user-facing
      focus_score: 50,         // Neutral (matches both B and A)
      change_score: 38,        // Exploratory lean
      decision_score: 45,      // Slight vision lean
      execution_score: 48,     // Slight adaptive lean
    },
    flexibility: 32,           // Reduced - should be more selective for E-V types specifically
  },

  // DESIGN & UX ENGINEERING
  design: {
    keywords: ['design system', 'accessibility', 'animation', 'graphics', 'ux'],
    idealTraits: {
      interface_score: 12,     // Strongly user-facing but not too extreme (was 5)
      focus_score: 55,         // Analyzer lean (design systems need thought)
      change_score: 25,        // Exploratory
      decision_score: 35,      // Vision-led
      execution_score: 40,     // Adaptive
    },
    flexibility: 35,           // Reduced from 48 - more selective
  },

  // BACKEND & API ROLES
  backend: {
    keywords: ['backend', 'api engineer', 'microservices', 'protocol'],
    idealTraits: {
      interface_score: 82,     // Strongly systems-facing
      focus_score: 50,         // Neutral (matches both B and A)
      change_score: 35,        // Exploratory lean
      decision_score: 50,      // Neutral
      execution_score: 55,     // Slight structure
    },
    flexibility: 45,           // Very high flexibility to match both B-S and A-S types
  },

  // SEARCH & RANKING
  search: {
    keywords: ['search engineer', 'search', 'ranking', 'indexing', 'elasticsearch', 'solr'],
    idealTraits: {
      interface_score: 74,     // Systems-facing
      focus_score: 64,         // Analyzer (algorithms, relevance)
      change_score: 56,        // Balanced
      decision_score: 72,      // Logic-led (metrics, ranking)
      execution_score: 66,     // Structured
    },
    flexibility: 42,           // Increased from 38 - should appear for S-E-L and S-O-L
  },

  // FULL STACK
  fullstack: {
    keywords: ['full stack', 'fullstack'],
    idealTraits: {
      interface_score: 38,     // Slight user lean (full stack does both but leans user)
      focus_score: 58,         // Slight analyzer lean
      change_score: 65,        // Operational lean (shipping features)
      decision_score: 65,      // Logic lean
      execution_score: 75,     // Structured
    },
    flexibility: 25,           // Increased from 8 - needs to match A-U-O-L types
  },

  // PRODUCT ENGINEERING (separate from Full Stack)
  product: {
    keywords: ['product engineer'],
    idealTraits: {
      interface_score: 28,     // User lean
      focus_score: 50,         // Neutral (both B and A do product)
      change_score: 50,        // Neutral (mix of E and O)
      decision_score: 48,      // Slight vision lean
      execution_score: 52,     // Slight structure
    },
    flexibility: 35,           // Moderate flexibility - shouldn't dominate O-L types
  },

  // INFRASTRUCTURE & DEVOPS (excluding Platform)
  infrastructure: {
    keywords: ['devops', 'infrastructure', 'sre', 'site reliability', 'kubernetes', 'cloud engineer', 'ci/cd', 'build engineer', 'release engineer'],
    idealTraits: {
      interface_score: 82,     // Systems-facing
      focus_score: 42,         // Builder lean (DevOps is hands-on)
      change_score: 78,        // Operational (key trait)
      decision_score: 48,      // Balanced
      execution_score: 78,     // Structured (key trait)
    },
    flexibility: 45,           // High flexibility to match both B-S-O and A-S-O types
  },

  // PLATFORM ENGINEERING (separate from DevOps/SRE)
  platform: {
    keywords: ['platform engineer'],
    idealTraits: {
      interface_score: 82,     // Systems-facing
      focus_score: 50,         // Neutral (both B and A do platform)
      change_score: 55,        // Mix leaning exploratory (building platforms)
      decision_score: 50,      // Neutral
      execution_score: 65,     // Structured lean
    },
    flexibility: 48,           // Very high flexibility to match B-S and A-S with E or O
  },

  // SECURITY
  security: {
    keywords: ['security', 'penetration', 'devsecops', 'appsec', 'security engineer', 'application security', 'security researcher'],
    idealTraits: {
      interface_score: 78,     // Systems-facing
      focus_score: 72,         // Strong analyzer (key differentiator - only A types)
      change_score: 72,        // Operational
      decision_score: 80,      // Very logic-driven
      execution_score: 82,     // Extremely structured
    },
    flexibility: 32,           // Much more selective - A-S-O-L primarily
  },

  // DATABASE & DATA INFRASTRUCTURE
  database: {
    keywords: ['database', 'dba', 'sql', 'nosql', 'data warehouse', 'etl', 'database engineer', 'database administrator'],
    idealTraits: {
      interface_score: 80,     // Systems-facing
      focus_score: 50,         // Balanced (builders and analyzers both do DB work)
      change_score: 80,        // Operational (key trait)
      decision_score: 80,      // Logic-driven (key trait)
      execution_score: 85,     // Very structured (key trait)
    },
    flexibility: 42,           // Increased from 35 - must accommodate weak S-O-L preferences
  },

  // DATA ENGINEERING
  dataEngineering: {
    keywords: ['data engineer', 'data pipeline', 'data platform', 'streaming data', 'analytics engineer'],
    idealTraits: {
      interface_score: 85,     // VERY systems-facing (must not appear for U types)
      focus_score: 50,         // Neutral (both B and A do data engineering)
      change_score: 62,        // Mix of E and O (building new pipelines vs maintaining)
      decision_score: 72,      // Logic-driven
      execution_score: 75,     // Structured
    },
    flexibility: 45,           // High flexibility to match S-E-L and S-O-L types
  },

  // DATA SCIENCE & ML
  dataScience: {
    keywords: ['data scientist', 'ml research', 'research scientist', 'research engineer'],
    idealTraits: {
      interface_score: 75,
      focus_score: 75,         // Analyzer
      change_score: 40,        // Exploratory
      decision_score: 75,
      execution_score: 55,
    },
    flexibility: 40,           // Increased from 35 - should appear for S-E-L-A
  },

  // MACHINE LEARNING ENGINEERING
  mlEngineering: {
    keywords: ['machine learning engineer', 'ml engineer', 'mlops', 'ml platform', 'ai engineer', 'llm engineer', 'generative ai', 'computer vision', 'nlp engineer', 'deep learning', 'ml research', 'research scientist'],
    idealTraits: {
      interface_score: 80,     // Systems-facing
      focus_score: 70,         // Analyzer (key trait)
      change_score: 35,        // Exploratory (key trait)
      decision_score: 75,      // Logic-driven
      execution_score: 60,
    },
    flexibility: 28,           // Much more selective - for A-S-E types primarily
  },

  // SYSTEMS & ARCHITECTURE
  systems: {
    keywords: ['systems engineer', 'systems architect', 'distributed systems', 'real-time systems', 'embedded', 'firmware', 'compiler'],
    idealTraits: {
      interface_score: 85,     // Systems-facing
      focus_score: 75,         // Analyzer (key trait)
      change_score: 35,        // Exploratory (key trait)
      decision_score: 60,
      execution_score: 60,
    },
    flexibility: 35,           // Should appear for A-S-E types
  },

  // QA & TESTING
  qa: {
    keywords: ['qa engineer', 'test', 'sdet', 'quality', 'automation engineer'],
    idealTraits: {
      interface_score: 45,     // Slight user lean (testing user-facing features)
      focus_score: 55,         // Slight analyzer lean
      change_score: 75,        // Operational (key trait)
      decision_score: 75,      // Logic-driven (key trait)
      execution_score: 85,     // Very structured (key trait - the most important)
    },
    flexibility: 28,           // Very selective - for U-O-L-T and S-O-L-T primarily
  },

  // PERFORMANCE & OBSERVABILITY
  performance: {
    keywords: ['performance', 'observability', 'reliability engineer', 'monitoring'],
    idealTraits: {
      interface_score: 80,     // Systems-facing
      focus_score: 65,
      change_score: 68,        // Operational
      decision_score: 70,
      execution_score: 72,
    },
    flexibility: 38,           // Increased from 30 - should appear for S-O
  },

  // DEVELOPER EXPERIENCE & TOOLS
  devex: {
    keywords: ['developer experience', 'devex', 'developer tools', 'sdk engineer', 'build engineer'],
    idealTraits: {
      interface_score: 72,     // Systems-leaning
      focus_score: 56,
      change_score: 52,
      decision_score: 62,
      execution_score: 66,
    },
    flexibility: 36,           // Reduced from 40 - appearing 3x, make room for variety
  },

  // DEVELOPER ADVOCACY
  advocacy: {
    keywords: ['developer advocate', 'developer relations', 'devrel'],
    idealTraits: {
      interface_score: 25,     // Very user-facing
      focus_score: 38,
      change_score: 32,        // Exploratory
      decision_score: 42,      // Vision-led
      execution_score: 45,     // Adaptive
    },
    flexibility: 40,           // Reduced from 45 - appearing 4x, make it more specific
  },

  // GROWTH & EXPERIMENTATION
  growth: {
    keywords: ['growth engineer', 'experimentation', 'a/b testing', 'ab testing engineer'],
    idealTraits: {
      interface_score: 25,     // User-facing
      focus_score: 50,         // Neutral (both B and A do growth)
      change_score: 32,        // Exploratory
      decision_score: 78,      // Very data-driven (key differentiator)
      execution_score: 48,     // Adaptive
    },
    flexibility: 32,           // Needs to match U-E-L types
  },

  // BLOCKCHAIN & WEB3
  blockchain: {
    keywords: ['blockchain', 'smart contract', 'web3', 'web3 developer'],
    idealTraits: {
      interface_score: 68,     // Systems-leaning
      focus_score: 58,
      change_score: 48,        // Exploratory-operational balance
      decision_score: 66,
      execution_score: 62,
    },
    flexibility: 40,           // Increased from 35 - should appear for balanced S personalities
  },

  // GAME DEVELOPMENT
  game: {
    keywords: ['game', 'unity', 'unreal', 'gameplay'],
    idealTraits: {
      interface_score: 40,     // More user-facing
      focus_score: 48,         // Slight builder lean
      change_score: 40,        // Exploratory
      decision_score: 50,
      execution_score: 55,
    },
    flexibility: 35,           // Balanced flexibility - was never appearing at 30
  },

  // ROBOTICS & IOT
  robotics: {
    keywords: ['robotics', 'iot ', 'iot engineer', 'embedded software'],
    idealTraits: {
      interface_score: 78,     // Systems-facing
      focus_score: 64,
      change_score: 58,        // Balanced
      decision_score: 66,
      execution_score: 68,
    },
    flexibility: 38,           // Increased from 30 - should appear for S personalities
  },
};

/**
 * Find the best matching category for a role
 */
function findRoleCategory(roleName) {
  const lowerName = roleName.toLowerCase();

  // Find category with matching keyword
  for (const category of Object.values(ROLE_CATEGORIES)) {
    for (const keyword of category.keywords) {
      if (lowerName.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // Default to balanced full-stack profile if no match
  return ROLE_CATEGORIES.fullstack;
}

/**
 * Calculate match percentage between personality scores and role requirements
 * Uses ADAPTIVE MATCHING: balance direction alignment and distance based on preference strength
 *
 * @param {Object} scores - Personality trait scores (0-100 each)
 * @param {string} roleName - Name of the role to match against
 * @returns {number} Match percentage (0-100)
 */
export function calculateRoleMatch(scores, roleName) {
  const category = findRoleCategory(roleName);
  const { idealTraits, flexibility } = category;

  const traits = ['focus_score', 'interface_score', 'change_score', 'decision_score', 'execution_score'];

  // STEP 1: Calculate average preference strength (how far from neutral 50)
  let totalStrength = 0;
  traits.forEach(trait => {
    const userScore = scores[trait] || 50;
    totalStrength += Math.abs(userScore - 50);
  });
  const avgStrength = totalStrength / 5; // 0-50 scale (0=all neutral, 50=all extreme)

  // Convert to weighting factor: weak preferences (0-10) rely on direction, strong (30-50) rely on distance
  // At avgStrength=5: directionWeight=0.8, distanceWeight=0.2
  // At avgStrength=25: directionWeight=0.5, distanceWeight=0.5
  // At avgStrength=45: directionWeight=0.2, distanceWeight=0.8
  const directionWeight = Math.max(0.2, 1.0 - (avgStrength / 50) * 0.8); // 0.2 to 1.0
  const distanceWeight = 1.0 - directionWeight;

  // STEP 2: Calculate direction matches and distances
  let directionMatches = 0;
  let totalSquaredDistance = 0;
  let criticalMismatch = false;

  traits.forEach(trait => {
    const userScore = scores[trait] || 50;
    const idealScore = idealTraits[trait];
    const rawDistance = Math.abs(userScore - idealScore);

    // Direction matching: both on same side of 50
    const userDirection = userScore < 50 ? 'low' : userScore > 50 ? 'high' : 'neutral';
    const idealDirection = idealScore < 50 ? 'low' : idealScore > 50 ? 'high' : 'neutral';

    // CRITICAL DIMENSION: interface_score (User vs Systems) is a dealbreaker
    // If user has STRONG preference (>= 20 from 50) and role is opposite direction, it's a critical mismatch
    if (trait === 'interface_score') {
      const userStrength = Math.abs(userScore - 50);
      if (userStrength >= 20 && userDirection !== idealDirection && idealDirection !== 'neutral' && userDirection !== 'neutral') {
        criticalMismatch = true; // User strongly prefers User-facing but role is Systems-facing (or vice versa)
      }
    }

    // Count direction match
    if (idealDirection === 'neutral') {
      if (Math.abs(userScore - 50) <= 15) {
        directionMatches += 0.7;
      }
    } else if (userDirection === idealDirection) {
      directionMatches += 1.0;
    } else if (userDirection === 'neutral') {
      directionMatches += 0.3;
    }

    // Calculate distance
    let adjustedDistance;
    if (rawDistance <= flexibility) {
      adjustedDistance = (rawDistance / flexibility) * (rawDistance / flexibility) * flexibility * 0.5;
    } else {
      adjustedDistance = (flexibility * 0.5) + (rawDistance - flexibility);
    }

    totalSquaredDistance += adjustedDistance * adjustedDistance;
  });

  // If there's a critical mismatch, heavily penalize this role
  if (criticalMismatch) {
    directionMatches = Math.max(0, directionMatches - 2.5); // Lose 2.5 direction points
  }

  // STEP 3: Calculate direction score (0-100)
  const directionScore = (directionMatches / 5) * 85 + 15; // 15-100 range

  // STEP 4: Calculate distance score (0-100)
  const distance = Math.sqrt(totalSquaredDistance);
  const maxDistance = Math.sqrt(5 * 100 * 100);
  const normalizedDistance = distance / maxDistance;
  const distanceScore = (1 - normalizedDistance) * 100; // Higher = better (closer)

  // STEP 5: Weighted combination based on preference strength
  let matchPercentage = (directionScore * directionWeight) + (distanceScore * distanceWeight);

  // Apply small flexibility boost for diversity
  const flexibilityBoost = (flexibility - 25) / 200;
  matchPercentage += flexibilityBoost * 3;

  // Clamp to valid range
  matchPercentage = Math.min(100, Math.max(15, matchPercentage));

  return Math.round(matchPercentage);
}

/**
 * MEGA-ALGORITHM v2.0 - RULE-BASED HYBRID APPROACH
 *
 * Top 3 roles: Use type-specific algorithms (one for each of 16 personality types)
 * Remaining roles: Use distance-based scoring from calculateRoleMatch above
 *
 * Re-exported from megaAlgorithm.js for backward compatibility
 */
export { megaAlgorithmRankRoles as rankRolesByMatch };
