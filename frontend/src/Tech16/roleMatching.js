// Enhanced role matching algorithm with comprehensive coverage
// Maps personality trait scores to engineering role fit percentages

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
      focus_score: 45,         // Balanced, slight builder lean
      change_score: 35,        // Moderately exploratory
      decision_score: 45,      // Balanced
      execution_score: 50,     // Balanced
    },
    flexibility: 35,           // General flexibility range
  },

  // MOBILE DEVELOPMENT
  mobile: {
    keywords: ['mobile', 'ios', 'android', 'flutter', 'react native', 'cross-platform'],
    idealTraits: {
      interface_score: 20,
      focus_score: 50,
      change_score: 40,
      decision_score: 50,
      execution_score: 55,
    },
    flexibility: 35,
  },

  // DESIGN & UX ENGINEERING
  design: {
    keywords: ['design system', 'accessibility', 'animation', 'graphics', 'ux'],
    idealTraits: {
      interface_score: 10,
      focus_score: 40,
      change_score: 30,
      decision_score: 40,
      execution_score: 50,
    },
    flexibility: 40,
  },

  // BACKEND & API ROLES
  backend: {
    keywords: ['backend', 'api engineer', 'microservices', 'protocol'],
    idealTraits: {
      interface_score: 80,     // Strongly systems-facing
      focus_score: 55,         // Slight analyzer lean
      change_score: 55,        // Slight operational lean
      decision_score: 60,      // Logic-led
      execution_score: 60,     // Structured
    },
    flexibility: 30,
  },

  // SEARCH & RANKING
  search: {
    keywords: ['search engineer', 'search', 'ranking', 'indexing', 'elasticsearch', 'solr'],
    idealTraits: {
      interface_score: 75,     // Systems-facing
      focus_score: 70,         // Analyzer (algorithms, relevance)
      change_score: 60,        // Moderate operational
      decision_score: 70,      // Logic-led (metrics, ranking)
      execution_score: 65,     // Structured
    },
    flexibility: 30,
  },

  // FULL STACK
  fullstack: {
    keywords: ['full stack', 'fullstack', 'product engineer'],
    idealTraits: {
      interface_score: 50,     // Perfect balance
      focus_score: 50,
      change_score: 50,
      decision_score: 50,
      execution_score: 55,
    },
    flexibility: 45,           // Very flexible
  },

  // INFRASTRUCTURE & DEVOPS
  infrastructure: {
    keywords: ['devops', 'infrastructure', 'platform engineer', 'sre', 'site reliability', 'kubernetes', 'cloud engineer', 'ci/cd', 'build engineer', 'release engineer'],
    idealTraits: {
      interface_score: 90,
      focus_score: 60,
      change_score: 70,        // Operational
      decision_score: 65,
      execution_score: 75,     // Structured
    },
    flexibility: 25,
  },

  // SECURITY
  security: {
    keywords: ['security', 'penetration', 'devsecops', 'appsec'],
    idealTraits: {
      interface_score: 85,
      focus_score: 70,         // Analyzer
      change_score: 70,
      decision_score: 75,
      execution_score: 80,
    },
    flexibility: 25,
  },

  // DATABASE & DATA INFRASTRUCTURE
  database: {
    keywords: ['database', 'dba', 'sql', 'nosql', 'data warehouse', 'etl'],
    idealTraits: {
      interface_score: 95,
      focus_score: 65,
      change_score: 75,
      decision_score: 70,
      execution_score: 80,
    },
    flexibility: 20,
  },

  // DATA ENGINEERING
  dataEngineering: {
    keywords: ['data engineer', 'data pipeline', 'data platform', 'streaming data', 'analytics engineer'],
    idealTraits: {
      interface_score: 80,
      focus_score: 60,
      change_score: 60,
      decision_score: 70,
      execution_score: 70,
    },
    flexibility: 30,
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
    flexibility: 35,
  },

  // MACHINE LEARNING ENGINEERING
  mlEngineering: {
    keywords: ['machine learning engineer', 'ml engineer', 'mlops', 'ml platform', 'ai engineer', 'llm engineer', 'generative ai', 'computer vision', 'nlp engineer', 'deep learning'],
    idealTraits: {
      interface_score: 75,
      focus_score: 65,
      change_score: 50,
      decision_score: 70,
      execution_score: 65,
    },
    flexibility: 35,
  },

  // SYSTEMS & ARCHITECTURE
  systems: {
    keywords: ['systems engineer', 'systems architect', 'distributed systems', 'real-time systems', 'embedded', 'firmware', 'compiler'],
    idealTraits: {
      interface_score: 85,
      focus_score: 75,
      change_score: 65,
      decision_score: 70,
      execution_score: 75,
    },
    flexibility: 25,
  },

  // QA & TESTING
  qa: {
    keywords: ['qa engineer', 'test', 'sdet', 'quality', 'automation engineer'],
    idealTraits: {
      interface_score: 60,
      focus_score: 65,
      change_score: 70,
      decision_score: 70,
      execution_score: 80,
    },
    flexibility: 35,
  },

  // PERFORMANCE & OBSERVABILITY
  performance: {
    keywords: ['performance', 'observability', 'reliability engineer', 'monitoring'],
    idealTraits: {
      interface_score: 85,
      focus_score: 70,
      change_score: 70,
      decision_score: 75,
      execution_score: 75,
    },
    flexibility: 30,
  },

  // DEVELOPER EXPERIENCE & TOOLS
  devex: {
    keywords: ['developer experience', 'devex', 'developer tools', 'sdk engineer', 'build engineer'],
    idealTraits: {
      interface_score: 70,
      focus_score: 55,
      change_score: 50,
      decision_score: 60,
      execution_score: 65,
    },
    flexibility: 40,
  },

  // DEVELOPER ADVOCACY
  advocacy: {
    keywords: ['developer advocate', 'developer relations', 'devrel'],
    idealTraits: {
      interface_score: 30,
      focus_score: 40,
      change_score: 35,
      decision_score: 45,
      execution_score: 50,
    },
    flexibility: 45,
  },

  // GROWTH & EXPERIMENTATION
  growth: {
    keywords: ['growth engineer', 'experimentation', 'a/b testing'],
    idealTraits: {
      interface_score: 40,
      focus_score: 50,
      change_score: 35,
      decision_score: 65,      // Data-driven
      execution_score: 55,
    },
    flexibility: 40,
  },

  // BLOCKCHAIN & WEB3
  blockchain: {
    keywords: ['blockchain', 'smart contract', 'web3'],
    idealTraits: {
      interface_score: 70,
      focus_score: 60,
      change_score: 45,
      decision_score: 65,
      execution_score: 65,
    },
    flexibility: 35,
  },

  // GAME DEVELOPMENT
  game: {
    keywords: ['game', 'unity', 'unreal', 'gameplay'],
    idealTraits: {
      interface_score: 45,
      focus_score: 50,
      change_score: 45,
      decision_score: 55,
      execution_score: 60,
    },
    flexibility: 40,
  },

  // ROBOTICS & IOT
  robotics: {
    keywords: ['robotics', 'iot ', 'iot engineer'],
    idealTraits: {
      interface_score: 80,
      focus_score: 65,
      change_score: 60,
      decision_score: 65,
      execution_score: 70,
    },
    flexibility: 30,
  },
};

/**
 * Find the best matching category for a role
 */
function findRoleCategory(roleName) {
  const lowerName = roleName.toLowerCase();

  // Find category with matching keyword
  for (const [categoryName, category] of Object.entries(ROLE_CATEGORIES)) {
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
 * Uses Euclidean distance with category-based profiles
 *
 * @param {Object} scores - Personality trait scores (0-100 each)
 * @param {string} roleName - Name of the role to match against
 * @returns {number} Match percentage (0-100)
 */
export function calculateRoleMatch(scores, roleName) {
  const category = findRoleCategory(roleName);
  const { idealTraits, flexibility } = category;

  const traits = ['focus_score', 'interface_score', 'change_score', 'decision_score', 'execution_score'];

  // Calculate normalized distance across all traits
  let totalSquaredDistance = 0;

  traits.forEach(trait => {
    const userScore = scores[trait] || 50;
    const idealScore = idealTraits[trait];
    const rawDistance = Math.abs(userScore - idealScore);

    // Apply flexibility threshold - distances within flexibility range have reduced impact
    let adjustedDistance;
    if (rawDistance <= flexibility) {
      // Within flexibility: smooth quadratic penalty (gentle)
      adjustedDistance = (rawDistance / flexibility) * (rawDistance / flexibility) * flexibility * 0.5;
    } else {
      // Beyond flexibility: linear penalty starting from half the flex range
      adjustedDistance = (flexibility * 0.5) + (rawDistance - flexibility);
    }

    totalSquaredDistance += adjustedDistance * adjustedDistance;
  });

  // Calculate match percentage using normalized distance
  // Max possible distance across 5 traits: sqrt(5 * 100^2) = 223.6
  const distance = Math.sqrt(totalSquaredDistance);
  const maxDistance = Math.sqrt(5 * 100 * 100);

  // Convert distance to match percentage (closer = higher match)
  const normalizedDistance = distance / maxDistance;
  let matchPercentage = (1 - normalizedDistance) * 100;

  // Apply category-specific boost to ensure diverse recommendations
  // More flexible categories get slight boost to prevent over-clustering
  const flexibilityBoost = (flexibility - 25) / 200; // -0.05 to +0.10
  matchPercentage += flexibilityBoost * 5;

  // Ensure minimum viable match of 15% (everyone has transferable skills)
  matchPercentage = Math.max(15, matchPercentage);

  // Clamp to 0-100 range
  matchPercentage = Math.min(100, Math.max(0, matchPercentage));

  return Math.round(matchPercentage);
}

/**
 * Rank all roles by match percentage
 *
 * @param {Object} scores - Personality trait scores
 * @param {Array} roles - Array of role objects from database
 * @returns {Array} Roles sorted by match (highest first) with matchPercentage added
 */
export function rankRolesByMatch(scores, roles) {
  const rolesWithMatch = roles.map(role => {
    const matchPercentage = calculateRoleMatch(scores, role.name);
    return {
      ...role,
      matchPercentage,
      fitScore: matchPercentage / 100, // 0-1 scale for compatibility
    };
  });

  // Sort by match percentage (highest first)
  return rolesWithMatch.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
