/**
 * MEGA-ALGORITHM: Perfect Role Matching System
 *
 * This algorithm combines 8 core algorithms based on 3 dimensions:
 * - Interface (U/S), Change (E/O), Decision (V/L)
 *
 * Focus (B/A) is the 5th dimension MODIFIER, not a routing factor
 * Execution (A/T) is also a modifier, used within algorithms
 *
 * Approach:
 * 1. Determine personality type from 3 core dimensions (U/S × E/O × V/L)
 * 2. Route to the appropriate algorithm
 * 3. Algorithm checks focus_score and execution_score to determine specific role ordering
 * 4. Return top 3 roles based on deep manual reasoning
 *
 * @param {Object} scores - { focus_score, interface_score, change_score, decision_score, execution_score }
 * @param {Array} roles - Array of role objects with { id, name }
 * @returns {Array} Top 3 role objects in ranked order
 */

// Import all 8 core algorithms (Focus is handled within each algorithm as a modifier)
import rankRolesFor_UEV from './algo_UEV.js';
import rankRolesFor_UEL from './algo_UEL.js';
import rankRolesFor_UOV from './algo_UOV.js';
import rankRolesFor_UOL from './algo_UOL.js';
import rankRolesFor_SEV from './algo_SEV.js';
import rankRolesFor_SEL from './algo_SEL.js';
import rankRolesFor_SOV from './algo_SOV.js';
import rankRolesFor_SOL from './algo_SOL.js';

/**
 * Determine personality type from scores
 * Focus (B/A) is a MODIFIER handled within algorithms, not part of routing
 * @param {Object} scores - The 5 personality dimension scores
 * @returns {string} Type code based on 3 core dimensions (e.g., 'UEV', 'SOL')
 */
function determinePersonalityType(scores) {
  const { interface_score, change_score, decision_score } = scores;

  // Interface: U (User-facing, <50) or S (Systems-facing, ≥50)
  const interface_ = interface_score < 50 ? 'U' : 'S';

  // Change: E (Exploratory, <50) or O (Operational, ≥50)
  const change = change_score < 50 ? 'E' : 'O';

  // Decision: V (Vision-led, <50) or L (Logic-led, ≥50)
  const decision = decision_score < 50 ? 'V' : 'L';

  // Return 3-letter code: Interface × Change × Decision
  // Focus and Execution are handled within each algorithm as modifiers
  return `${interface_}${change}${decision}`;
}

/**
 * Main mega-algorithm function - HYBRID APPROACH
 *
 * Strategy:
 * 1. Top 3: Use type-specific algorithms (100% accuracy from manual reasoning)
 * 2. Remaining roles: Use distance-based scoring for proper ranking
 *
 * @param {Object} scores - { focus_score, interface_score, change_score, decision_score, execution_score }
 * @param {Array} roles - Array of role objects with { id, name }
 * @returns {Array} All roles sorted by match (top 3 guaranteed by type-specific algorithm)
 */
export function rankRolesByMatch(scores, roles) {
  // Determine personality type
  const personalityType = determinePersonalityType(scores);

  // Map type to algorithm function (8 algorithms based on Interface × Change × Decision)
  // Focus (B/A) and Execution (A/T) are handled within each algorithm as modifiers
  const algorithmMap = {
    'UEV': rankRolesFor_UEV,
    'UEL': rankRolesFor_UEL,
    'UOV': rankRolesFor_UOV,
    'UOL': rankRolesFor_UOL,
    'SEV': rankRolesFor_SEV,
    'SEL': rankRolesFor_SEL,
    'SOV': rankRolesFor_SOV,
    'SOL': rankRolesFor_SOL,
  };

  // Get the appropriate algorithm
  const typeAlgorithm = algorithmMap[personalityType];

  if (!typeAlgorithm) {
    throw new Error(`Unknown personality type: ${personalityType}`);
  }

  // Execute the type-specific algorithm to get top 3 role names
  const topRoleNames = typeAlgorithm(scores);

  // Create a normalized lookup map
  const roleLookup = new Map();
  roles.forEach(role => {
    const normalizedName = normalizeRoleName(role.name);
    roleLookup.set(normalizedName, role);
  });

  // Find the top 3 role objects (deduplicate if algorithm returns roles that map to same actual role)
  const top3Roles = [];
  const top3Ids = new Set();
  let matchPercentage = 100; // Start at 100 and decrement for each unique role

  topRoleNames.forEach((roleName, index) => {
    const normalizedName = normalizeRoleName(roleName);
    const role = roleLookup.get(normalizedName);

    if (role) {
      // Check if this role is already in top 3 (happens when multiple algorithm outputs map to same role)
      if (top3Ids.has(role.id)) {
        console.log(`Skipping duplicate role "${roleName}" (already have "${role.name}" in top 3)`);
        return; // Skip duplicate
      }

      top3Roles.push({
        ...role,
        matchPercentage: matchPercentage, // 100, 99, 98, etc. for each unique role
        rank: top3Roles.length + 1,
      });
      top3Ids.add(role.id);
      matchPercentage--; // Decrement for next unique role
    } else {
      console.warn(`Top role not found in roles list: ${roleName}`);
    }
  });

  // If we don't have 3 roles yet (due to duplicates), fill in with distance-based top roles
  if (top3Roles.length < 3) {
    console.log(`Only ${top3Roles.length} unique roles from algorithm, filling remaining with distance-based scoring`);
  }

  // Calculate distance-based scores for remaining roles
  const remainingRoles = roles
    .filter(role => !top3Ids.has(role.id))
    .map(role => {
      const matchPercentage = calculateDistanceScore(scores, role.name);
      return {
        ...role,
        matchPercentage,
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  // If algorithm didn't provide 3 unique roles (due to duplicates), fill with distance-based top roles
  if (top3Roles.length < 3) {
    const neededRoles = 3 - top3Roles.length;
    const fillRoles = remainingRoles.slice(0, neededRoles).map((role, index) => ({
      ...role,
      matchPercentage: matchPercentage - index, // Continue from where we left off
      rank: top3Roles.length + index + 1,
    }));

    // Add filled roles to top3 and mark their IDs as used
    fillRoles.forEach(role => {
      top3Roles.push(role);
      top3Ids.add(role.id);
    });

    // Remove filled roles from remaining
    remainingRoles.splice(0, neededRoles);
  }

  // Combine: top 3 first (guaranteed 3 roles now), then remaining roles
  return [...top3Roles, ...remainingRoles];
}

/**
 * Calculate distance-based match score for roles not in top 3
 * Uses the same logic as the original algorithm
 */
function calculateDistanceScore(scores, roleName) {
  /**
   * Role ideal profiles for all 42 roles
   * Format: i=interface, f=focus, c=change, d=decision, e=execution, flex=flexibility
   * Scores: 0-100 where lower favors first pole, higher favors second pole
   * - i: User-facing (low) vs Systems-facing (high)
   * - f: Builder (low) vs Analyzer (high)
   * - c: Exploratory (low) vs Operational (high)
   * - d: Vision-led (low) vs Logic-led (high)
   * - e: Adaptive (low) vs Structured (high)
   */
  const categories = {
    // FRONTEND & UI ROLES
    'frontend engineer': { i: 15, f: 45, c: 40, d: 48, e: 50, flex: 42 },
    'mobile engineer': { i: 18, f: 48, c: 38, d: 45, e: 48, flex: 40 },
    'product designer': { i: 8, f: 60, c: 30, d: 30, e: 45, flex: 45 },
    'ux researcher': { i: 10, f: 75, c: 50, d: 35, e: 50, flex: 38 },
    'design systems engineer': { i: 20, f: 58, c: 45, d: 50, e: 55, flex: 35 },
    'animation engineer': { i: 12, f: 45, c: 35, d: 40, e: 45, flex: 42 },

    // BACKEND & API ROLES
    'backend engineer': { i: 82, f: 50, c: 35, d: 50, e: 55, flex: 45 },
    'full-stack engineer': { i: 50, f: 48, c: 45, d: 52, e: 58, flex: 48 },
    'microservices engineer': { i: 85, f: 55, c: 40, d: 55, e: 62, flex: 38 },
    'search engineer': { i: 78, f: 62, c: 50, d: 70, e: 62, flex: 40 },

    // INFRASTRUCTURE & PLATFORM ROLES
    'devops / sre': { i: 85, f: 48, c: 78, d: 55, e: 80, flex: 32 },
    'platform engineer': { i: 82, f: 52, c: 55, d: 52, e: 65, flex: 38 },
    'systems engineer': { i: 88, f: 68, c: 68, d: 72, e: 75, flex: 30 },
    'cloud engineer': { i: 80, f: 52, c: 60, d: 58, e: 68, flex: 38 },
    'kubernetes engineer': { i: 85, f: 55, c: 65, d: 62, e: 72, flex: 32 },
    'ci/cd engineer': { i: 82, f: 48, c: 70, d: 60, e: 75, flex: 35 },

    // DATABASE ROLES
    'data engineer': { i: 85, f: 52, c: 62, d: 72, e: 75, flex: 35 },
    'database engineer': { i: 82, f: 58, c: 68, d: 75, e: 78, flex: 32 },
    'database administrator': { i: 80, f: 55, c: 80, d: 80, e: 85, flex: 28 },

    // MACHINE LEARNING & AI ROLES
    'ml engineer': { i: 78, f: 68, c: 35, d: 75, e: 60, flex: 35 },
    'data scientist': { i: 72, f: 75, c: 45, d: 80, e: 58, flex: 38 },
    'research scientist': { i: 75, f: 82, c: 25, d: 78, e: 52, flex: 35 },
    'mlops engineer': { i: 80, f: 58, c: 65, d: 72, e: 70, flex: 35 },
    'computer vision engineer': { i: 78, f: 72, c: 38, d: 75, e: 62, flex: 35 },
    'nlp engineer': { i: 80, f: 70, c: 42, d: 78, e: 65, flex: 35 },
    'llm engineer': { i: 78, f: 68, c: 40, d: 75, e: 62, flex: 38 },

    // SECURITY ROLES
    'security engineer': { i: 80, f: 72, c: 72, d: 80, e: 82, flex: 28 },
    'application security engineer': { i: 75, f: 70, c: 65, d: 78, e: 75, flex: 30 },
    'devsecops engineer': { i: 82, f: 62, c: 75, d: 75, e: 80, flex: 30 },
    'penetration tester': { i: 72, f: 65, c: 45, d: 72, e: 65, flex: 38 },
    'security researcher': { i: 78, f: 78, c: 35, d: 80, e: 60, flex: 32 },

    // QA & TESTING ROLES
    'qa / test engineer': { i: 45, f: 58, c: 75, d: 75, e: 85, flex: 28 },
    'test automation engineer': { i: 65, f: 52, c: 72, d: 72, e: 80, flex: 32 },
    'mobile qa engineer': { i: 35, f: 55, c: 70, d: 70, e: 78, flex: 32 },

    // PRODUCT & MANAGEMENT ROLES
    'product manager': { i: 25, f: 62, c: 55, d: 48, e: 58, flex: 45 },
    'technical pm': { i: 35, f: 65, c: 58, d: 52, e: 62, flex: 42 },

    // ARCHITECTURE & STRATEGY ROLES
    'solutions architect': { i: 70, f: 75, c: 60, d: 68, e: 70, flex: 35 },

    // GROWTH & ADVOCACY ROLES
    'growth engineer': { i: 22, f: 48, c: 32, d: 75, e: 48, flex: 42 },
    'developer advocate': { i: 20, f: 55, c: 28, d: 50, e: 45, flex: 45 },

    // SPECIALIZED ROLES
    'blockchain engineer': { i: 75, f: 58, c: 50, d: 65, e: 62, flex: 38 },
    'game developer': { i: 65, f: 45, c: 35, d: 48, e: 55, flex: 42 },
    'embedded software engineer': { i: 85, f: 55, c: 68, d: 68, e: 75, flex: 32 },
  };

  const normalized = normalizeRoleName(roleName);
  const category = categories[normalized] || { i: 50, f: 50, c: 50, d: 50, e: 50, flex: 35 };

  /**
   * Trait importance weights - Interface is most critical for role fit
   * Total weight: 1.0 (normalized)
   */
  const traitWeights = {
    interface: 0.30,  // Most important - User vs Systems determines domain
    focus: 0.15,      // Modifier - affects approach, not domain
    change: 0.20,     // Important - Exploratory vs Operational affects role type
    decision: 0.20,   // Important - Vision vs Logic affects role type
    execution: 0.15,  // Less critical - Adaptive vs Structured is more flexible
  };

  // Calculate distance with trait-specific weighting
  const traits = [
    { name: 'focus', user: scores.focus_score, ideal: category.f, weight: traitWeights.focus },
    { name: 'interface', user: scores.interface_score, ideal: category.i, weight: traitWeights.interface },
    { name: 'change', user: scores.change_score, ideal: category.c, weight: traitWeights.change },
    { name: 'decision', user: scores.decision_score, ideal: category.d, weight: traitWeights.decision },
    { name: 'execution', user: scores.execution_score, ideal: category.e, weight: traitWeights.execution },
  ];

  let weightedDistance = 0;
  let weightedDirectionScore = 0;

  traits.forEach(({ name, user, ideal, weight }) => {
    const rawDistance = Math.abs(user - ideal);

    // Direction matching with soft boundaries (40-60 is neutral zone)
    const userDir = user < 40 ? 'low' : user > 60 ? 'high' : 'neutral';
    const idealDir = ideal < 40 ? 'low' : ideal > 60 ? 'high' : 'neutral';

    const directionMatch = (userDir === idealDir || idealDir === 'neutral' || userDir === 'neutral') ? 1 : 0;

    // Distance calculation with flexibility
    let adjustedDistance;
    if (rawDistance <= category.flex) {
      adjustedDistance = (rawDistance / category.flex) * 20;
    } else {
      adjustedDistance = 20 + (rawDistance - category.flex) * 0.8;
    }

    // Apply trait weight to both direction and distance
    weightedDirectionScore += directionMatch * weight;
    weightedDistance += adjustedDistance * weight;
  });

  // Adaptive weighting: preference strength affects direction vs distance balance
  // Strong preferences (far from 50) care more about direction
  // Weak preferences (near 50) care more about distance
  const avgPreferenceStrength = traits.reduce((sum, t) => sum + Math.abs(t.user - 50), 0) / 5;
  const directionWeight = Math.min(0.7, 0.4 + (avgPreferenceStrength / 100)); // 0.4-0.7
  const distanceWeight = 1 - directionWeight; // 0.6-0.3

  // Final score calculation (0-100)
  const directionScore = weightedDirectionScore * 100 * directionWeight;
  const distanceScore = Math.max(0, (1 - weightedDistance / 20) * 100 * distanceWeight);

  return Math.round(directionScore + distanceScore);
}

/**
 * Normalize role names for matching between algorithm output and role list
 * Handles common variations in role naming
 * Maps algorithm outputs to actual role names in local data (roles.js)
 */
function normalizeRoleName(name) {
  // Convert to lowercase and remove extra whitespace
  let normalized = name.toLowerCase().trim();

  // COMPREHENSIVE MAPPING: Algorithm outputs → Local roles.js names
  // Each canonical name maps to the actual title in roles.js (42 total roles)
  const variations = {
    // FRONTEND & UI ROLES
    'frontend engineer': ['frontend engineer', 'frontend developer', 'frontend', 'web developer'],
    'mobile engineer': ['mobile engineer', 'mobile developer', 'mobile developer (ios/android)', 'mobile', 'ios developer', 'android developer', 'ios engineer', 'android engineer'],
    'product designer': ['product designer', 'designer', 'ui/ux designer', 'ui/ux designer (technical)'],
    'ux researcher': ['ux researcher', 'user researcher'],
    'design systems engineer': ['design systems engineer', 'design system engineer', 'ux engineer', 'ux engineer / design systems'],
    'animation engineer': ['animation engineer', 'motion designer', 'animation developer'],

    // BACKEND & API ROLES
    'backend engineer': ['backend engineer', 'backend developer', 'backend', 'api engineer', 'protocol engineer'],
    'full-stack engineer': ['full-stack engineer', 'full stack engineer', 'fullstack engineer', 'full stack developer', 'fullstack developer', 'full-stack developer'],
    'microservices engineer': ['microservices engineer', 'microservice engineer', 'distributed systems engineer'],
    'search engineer': ['search engineer', 'search', 'elasticsearch engineer'],

    // INFRASTRUCTURE & PLATFORM ROLES
    'devops / sre': ['devops / sre', 'devops engineer', 'devops', 'sre', 'site reliability engineer', 'site reliability engineer (sre)', 'devops/infrastructure', 'reliability engineer'],
    'platform engineer': ['platform engineer', 'platform', 'infrastructure engineer'],
    'systems engineer': ['systems engineer', 'systems', 'real-time systems engineer'],
    'cloud engineer': ['cloud engineer', 'cloud', 'cloud architect'],
    'kubernetes engineer': ['kubernetes engineer', 'k8s engineer', 'container platform engineer'],
    'ci/cd engineer': ['ci/cd engineer', 'cicd engineer', 'build engineer', 'release engineer'],

    // DATABASE ROLES
    'data engineer': ['data engineer', 'dataengineer', 'data pipeline engineer', 'streaming data engineer', 'etl developer', 'data warehouse engineer'],
    'database engineer': ['database engineer', 'db engineer', 'sql developer', 'nosql engineer'],
    'database administrator': ['database administrator', 'dba', 'database administrator (dba)'],

    // MACHINE LEARNING & AI ROLES
    'ml engineer': ['ml engineer', 'machine learning engineer', 'ai engineer', 'applied machine learning engineer'],
    'data scientist': ['data scientist', 'datascientist', 'data analyst'],
    'research scientist': ['research scientist', 'researcher', 'research engineer', 'ml research engineer'],
    'mlops engineer': ['mlops engineer', 'mlops', 'ml platform engineer'],
    'computer vision engineer': ['computer vision engineer', 'cv engineer', 'vision engineer'],
    'nlp engineer': ['nlp engineer', 'natural language processing engineer', 'deep learning engineer'],
    'llm engineer': ['llm engineer', 'large language model engineer', 'generative ai engineer'],

    // SECURITY ROLES
    'security engineer': ['security engineer', 'security', 'infrastructure security engineer', 'network security engineer', 'cloud security engineer'],
    'application security engineer': ['application security engineer', 'appsec engineer', 'appsec'],
    'devsecops engineer': ['devsecops engineer', 'devsecops'],
    'penetration tester': ['penetration tester', 'pentester', 'ethical hacker'],
    'security researcher': ['security researcher', 'security research engineer'],

    // QA & TESTING ROLES
    'qa / test engineer': ['qa / test engineer', 'qa engineer', 'qa/sdet', 'qa engineer / sdet', 'sdet', 'test engineer', 'software test engineer (sdet)', 'qa/test automation engineer', 'performance test engineer', 'test infrastructure engineer'],
    'test automation engineer': ['test automation engineer', 'automation engineer', 'test automation'],
    'mobile qa engineer': ['mobile qa engineer', 'mobile tester', 'mobile test engineer'],

    // PRODUCT & MANAGEMENT ROLES
    'product manager': ['product manager', 'pm', 'product manager (technical)'],
    'technical pm': ['technical pm', 'technical product manager', 'tech pm'],

    // ARCHITECTURE & STRATEGY ROLES
    'solutions architect': ['solutions architect', 'architect', 'systems architect'],

    // GROWTH & ADVOCACY ROLES
    'growth engineer': ['growth engineer', 'growth', 'experimentation engineer', 'a/b testing engineer'],
    'developer advocate': ['developer advocate', 'devrel', 'developer relations', 'developer relations engineer', 'developer advocate engineer'],

    // SPECIALIZED ROLES
    'blockchain engineer': ['blockchain engineer', 'blockchain', 'blockchain developer', 'smart contract engineer', 'web3 engineer', 'web3 developer', 'blockchain/web3'],
    'game developer': ['game developer', 'game', 'game engineer', 'unity developer', 'unreal engine developer', 'game engine programmer', 'gameplay engineer', 'graphics engineer'],
    'embedded software engineer': ['embedded software engineer', 'embedded engineer', 'firmware engineer', 'iot engineer', 'robotics engineer', 'robotics/iot'],
  };

  // FALLBACK MAPPINGS: Map truly non-existent roles to closest actual role
  // Most roles now exist, so only a few fallbacks needed
  const fallbackMappings = {
    'product engineer': 'frontend engineer',  // Product-focused frontend work
    'product': 'growth engineer',  // Product + growth overlap
    'performance engineer': 'systems engineer',  // System performance work
    'devex engineer': 'platform engineer',  // Developer experience = platform
    'developer experience engineer': 'platform engineer',
    'devex': 'platform engineer',
    'developer tools engineer': 'platform engineer',  // DevTools = platform
    'sdk engineer': 'platform engineer',  // SDK development = platform
    'observability engineer': 'devops / sre',  // Observability = SRE work
    'compiler engineer': 'systems engineer',  // Low-level systems work
  };

  // Find canonical name
  for (const [canonical, aliases] of Object.entries(variations)) {
    if (aliases.includes(normalized)) {
      return canonical;
    }
  }

  // Check fallback mappings for non-existent roles
  if (fallbackMappings[normalized]) {
    console.log(`Mapping non-existent role "${name}" to "${fallbackMappings[normalized]}"`);
    return fallbackMappings[normalized];
  }

  return normalized;
}

// For backward compatibility with existing test files
export { rankRolesByMatch as default };
