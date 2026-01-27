// Dynamic trait-based role matching algorithm
// Calculates how well a role matches personality trait scores
// No pre-defined weights needed - adapts to scoring algorithm changes

/**
 * Define ideal trait profiles for each role category
 * Scores are 0-100 scale (from scoring algorithm)
 *
 * Trait meanings:
 * - focus_score: 0=Builder, 100=Analyzer
 * - interface_score: 0=User-facing, 100=Systems-facing
 * - change_score: 0=Exploratory, 100=Operational
 * - decision_score: 0=Vision-led, 100=Logic-led
 * - execution_score: 0=Adaptive, 100=Structured
 */

export const ROLE_TRAIT_PROFILES = {
  // USER-FACING ROLES (Interface score 0-40)
  'Frontend Developer': {
    idealTraits: {
      interface_score: 10,    // Strongly user-facing
      focus_score: 40,        // Lean builder
      change_score: 30,       // Moderately exploratory
      decision_score: 40,     // Balance vision and logic
      execution_score: 50,    // Balanced approach
    },
    flexibility: {
      interface_score: 15,    // Must be user-facing
      focus_score: 40,
      change_score: 40,
      decision_score: 50,
      execution_score: 50,
    }
  },

  'Frontend Engineer': {
    idealTraits: {
      interface_score: 10,
      focus_score: 40,
      change_score: 30,
      decision_score: 40,
      execution_score: 50,
    },
    flexibility: {
      interface_score: 15,
      focus_score: 40,
      change_score: 40,
      decision_score: 50,
      execution_score: 50,
    }
  },

  'Mobile Developer': {
    idealTraits: {
      interface_score: 15,
      focus_score: 45,
      change_score: 35,
      decision_score: 45,
      execution_score: 55,
    },
    flexibility: {
      interface_score: 20,
      focus_score: 40,
      change_score: 40,
      decision_score: 45,
      execution_score: 45,
    }
  },

  'Product Designer': {
    idealTraits: {
      interface_score: 5,     // Very user-facing
      focus_score: 35,        // Builder tendency
      change_score: 25,       // Exploratory
      decision_score: 35,     // Vision-led
      execution_score: 45,    // Somewhat adaptive
    },
    flexibility: {
      interface_score: 15,
      focus_score: 45,
      change_score: 45,
      decision_score: 45,
      execution_score: 50,
    }
  },

  'UX Researcher': {
    idealTraits: {
      interface_score: 10,
      focus_score: 60,        // Analyzer tendency
      change_score: 30,
      decision_score: 60,     // Data-driven
      execution_score: 55,
    },
    flexibility: {
      interface_score: 20,
      focus_score: 40,
      change_score: 40,
      decision_score: 40,
      execution_score: 45,
    }
  },

  'Product Manager': {
    idealTraits: {
      interface_score: 20,
      focus_score: 50,
      change_score: 35,
      decision_score: 50,
      execution_score: 60,
    },
    flexibility: {
      interface_score: 30,
      focus_score: 50,
      change_score: 45,
      decision_score: 45,
      execution_score: 40,
    }
  },

  'Product Manager (Technical)': {
    idealTraits: {
      interface_score: 30,
      focus_score: 55,
      change_score: 40,
      decision_score: 55,
      execution_score: 65,
    },
    flexibility: {
      interface_score: 35,
      focus_score: 45,
      change_score: 45,
      decision_score: 40,
      execution_score: 35,
    }
  },

  // SYSTEMS-FACING ROLES (Interface score 60-100)
  'Backend Developer': {
    idealTraits: {
      interface_score: 85,    // Strongly systems-facing
      focus_score: 50,
      change_score: 60,       // Lean operational
      decision_score: 60,     // Logic-led
      execution_score: 60,
    },
    flexibility: {
      interface_score: 20,    // Must be systems-facing
      focus_score: 45,
      change_score: 40,
      decision_score: 40,
      execution_score: 40,
    }
  },

  'Backend Engineer': {
    idealTraits: {
      interface_score: 85,
      focus_score: 50,
      change_score: 60,
      decision_score: 60,
      execution_score: 60,
    },
    flexibility: {
      interface_score: 20,
      focus_score: 45,
      change_score: 40,
      decision_score: 40,
      execution_score: 40,
    }
  },

  'DevOps Engineer': {
    idealTraits: {
      interface_score: 90,
      focus_score: 55,
      change_score: 70,       // Operational
      decision_score: 65,
      execution_score: 75,    // Structured
    },
    flexibility: {
      interface_score: 15,
      focus_score: 40,
      change_score: 30,
      decision_score: 35,
      execution_score: 25,
    }
  },

  'Site Reliability Engineer': {
    idealTraits: {
      interface_score: 90,
      focus_score: 60,
      change_score: 75,
      decision_score: 70,
      execution_score: 80,
    },
    flexibility: {
      interface_score: 15,
      focus_score: 40,
      change_score: 25,
      decision_score: 30,
      execution_score: 20,
    }
  },

  'Database Administrator': {
    idealTraits: {
      interface_score: 95,
      focus_score: 65,
      change_score: 80,
      decision_score: 70,
      execution_score: 85,
    },
    flexibility: {
      interface_score: 10,
      focus_score: 35,
      change_score: 20,
      decision_score: 30,
      execution_score: 15,
    }
  },

  'Systems Architect': {
    idealTraits: {
      interface_score: 85,
      focus_score: 75,        // Strong analyzer
      change_score: 65,
      decision_score: 70,
      execution_score: 75,
    },
    flexibility: {
      interface_score: 20,
      focus_score: 25,
      change_score: 35,
      decision_score: 30,
      execution_score: 25,
    }
  },

  'Cloud Architect': {
    idealTraits: {
      interface_score: 80,
      focus_score: 70,
      change_score: 65,
      decision_score: 70,
      execution_score: 75,
    },
    flexibility: {
      interface_score: 25,
      focus_score: 30,
      change_score: 35,
      decision_score: 30,
      execution_score: 25,
    }
  },

  'Security Engineer': {
    idealTraits: {
      interface_score: 85,
      focus_score: 70,
      change_score: 70,
      decision_score: 75,
      execution_score: 80,
    },
    flexibility: {
      interface_score: 20,
      focus_score: 30,
      change_score: 30,
      decision_score: 25,
      execution_score: 20,
    }
  },

  // BALANCED ROLES (Interface score 40-60)
  'Full-Stack Developer': {
    idealTraits: {
      interface_score: 50,
      focus_score: 50,
      change_score: 50,
      decision_score: 50,
      execution_score: 55,
    },
    flexibility: {
      interface_score: 40,    // Very flexible on interface
      focus_score: 50,
      change_score: 50,
      decision_score: 50,
      execution_score: 45,
    }
  },

  'Full Stack Developer': {
    idealTraits: {
      interface_score: 50,
      focus_score: 50,
      change_score: 50,
      decision_score: 50,
      execution_score: 55,
    },
    flexibility: {
      interface_score: 40,
      focus_score: 50,
      change_score: 50,
      decision_score: 50,
      execution_score: 45,
    }
  },

  // DATA & ML ROLES
  'Data Engineer': {
    idealTraits: {
      interface_score: 80,
      focus_score: 60,
      change_score: 65,
      decision_score: 70,
      execution_score: 70,
    },
    flexibility: {
      interface_score: 25,
      focus_score: 40,
      change_score: 35,
      decision_score: 30,
      execution_score: 30,
    }
  },

  'Data Scientist': {
    idealTraits: {
      interface_score: 70,
      focus_score: 70,        // Analyzer
      change_score: 45,       // Exploratory lean
      decision_score: 75,     // Data-driven
      execution_score: 60,
    },
    flexibility: {
      interface_score: 30,
      focus_score: 30,
      change_score: 45,
      decision_score: 25,
      execution_score: 40,
    }
  },

  'Machine Learning Engineer': {
    idealTraits: {
      interface_score: 75,
      focus_score: 65,
      change_score: 50,
      decision_score: 70,
      execution_score: 65,
    },
    flexibility: {
      interface_score: 30,
      focus_score: 35,
      change_score: 45,
      decision_score: 30,
      execution_score: 35,
    }
  },

  'ML Engineer': {
    idealTraits: {
      interface_score: 75,
      focus_score: 65,
      change_score: 50,
      decision_score: 70,
      execution_score: 65,
    },
    flexibility: {
      interface_score: 30,
      focus_score: 35,
      change_score: 45,
      decision_score: 30,
      execution_score: 35,
    }
  },

  'Research Scientist': {
    idealTraits: {
      interface_score: 80,
      focus_score: 80,        // Strong analyzer
      change_score: 35,       // Exploratory
      decision_score: 75,
      execution_score: 55,
    },
    flexibility: {
      interface_score: 25,
      focus_score: 20,
      change_score: 45,
      decision_score: 25,
      execution_score: 45,
    }
  },

  // QUALITY & TESTING
  'QA Engineer': {
    idealTraits: {
      interface_score: 60,
      focus_score: 65,
      change_score: 70,
      decision_score: 70,
      execution_score: 80,
    },
    flexibility: {
      interface_score: 40,
      focus_score: 35,
      change_score: 30,
      decision_score: 30,
      execution_score: 20,
    }
  },

  'Test Engineer': {
    idealTraits: {
      interface_score: 60,
      focus_score: 65,
      change_score: 70,
      decision_score: 70,
      execution_score: 80,
    },
    flexibility: {
      interface_score: 40,
      focus_score: 35,
      change_score: 30,
      decision_score: 30,
      execution_score: 20,
    }
  },

  'Automation Engineer': {
    idealTraits: {
      interface_score: 70,
      focus_score: 60,
      change_score: 70,
      decision_score: 70,
      execution_score: 80,
    },
    flexibility: {
      interface_score: 30,
      focus_score: 40,
      change_score: 30,
      decision_score: 30,
      execution_score: 20,
    }
  },
};

/**
 * Calculate match percentage between personality scores and role requirements
 * Uses weighted distance calculation with role-specific flexibility
 *
 * @param {Object} scores - Personality trait scores (0-100 each)
 * @param {string} roleName - Name of the role to match against
 * @returns {number} Match percentage (0-100)
 */
export function calculateRoleMatch(scores, roleName) {
  const profile = ROLE_TRAIT_PROFILES[roleName];

  // If role not in our profiles, return 50% (neutral)
  if (!profile) {
    return 50;
  }

  const { idealTraits, flexibility } = profile;

  // Calculate weighted distance for each trait
  let totalDistance = 0;
  let totalWeight = 0;

  const traits = ['focus_score', 'interface_score', 'change_score', 'decision_score', 'execution_score'];

  traits.forEach(trait => {
    const userScore = scores[trait] || 50; // Default to neutral if missing
    const idealScore = idealTraits[trait];
    const flexRange = flexibility[trait];

    // Calculate distance from ideal
    const distance = Math.abs(userScore - idealScore);

    // Convert distance to penalty (0-100)
    // Within flexibility range = no penalty
    // Beyond flexibility = linear penalty up to 100
    let penalty = 0;
    if (distance > flexRange) {
      const excessDistance = distance - flexRange;
      const maxExcessDistance = 100 - flexRange;
      penalty = Math.min(100, (excessDistance / maxExcessDistance) * 100);
    }

    // Weight by inverse flexibility (stricter requirements = higher weight)
    const weight = 100 - flexRange;

    totalDistance += penalty * weight;
    totalWeight += weight;
  });

  // Calculate match percentage (100 = perfect, 0 = terrible)
  const avgPenalty = totalWeight > 0 ? totalDistance / totalWeight : 0;
  const matchPercentage = Math.max(0, Math.min(100, 100 - avgPenalty));

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
  const rolesWithMatch = roles.map(role => ({
    ...role,
    matchPercentage: calculateRoleMatch(scores, role.name),
    fitScore: calculateRoleMatch(scores, role.name) / 100, // 0-1 scale for compatibility
  }));

  // Sort by match percentage (highest first)
  return rolesWithMatch.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
