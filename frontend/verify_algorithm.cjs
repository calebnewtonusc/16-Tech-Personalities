// Comprehensive verification of role matching algorithm
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Copy of the role matching algorithm from roleMatching.js
const ROLE_CATEGORIES = {
  frontend: {
    keywords: ['frontend', 'web developer', 'react', 'vue', 'angular', 'ui ', 'web3'],
    idealTraits: {
      interface_score: 15,
      focus_score: 45,
      change_score: 35,
      decision_score: 45,
      execution_score: 50,
    },
    flexibility: 35,
  },
  backend: {
    keywords: ['backend', 'api engineer', 'microservices', 'protocol'],
    idealTraits: {
      interface_score: 80,
      focus_score: 55,
      change_score: 55,
      decision_score: 60,
      execution_score: 60,
    },
    flexibility: 30,
  },
  infrastructure: {
    keywords: ['devops', 'infrastructure', 'platform engineer', 'sre', 'site reliability', 'kubernetes', 'cloud engineer'],
    idealTraits: {
      interface_score: 90,
      focus_score: 60,
      change_score: 70,
      decision_score: 65,
      execution_score: 75,
    },
    flexibility: 25,
  },
  security: {
    keywords: ['security', 'penetration', 'devsecops', 'appsec'],
    idealTraits: {
      interface_score: 85,
      focus_score: 70,
      change_score: 70,
      decision_score: 75,
      execution_score: 80,
    },
    flexibility: 25,
  },
  fullstack: {
    keywords: ['full stack', 'fullstack', 'product engineer'],
    idealTraits: {
      interface_score: 50,
      focus_score: 50,
      change_score: 50,
      decision_score: 50,
      execution_score: 55,
    },
    flexibility: 45,
  },
};

function findRoleCategory(roleName) {
  const lowerName = roleName.toLowerCase();
  for (const [categoryName, category] of Object.entries(ROLE_CATEGORIES)) {
    for (const keyword of category.keywords) {
      if (lowerName.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }
  return ROLE_CATEGORIES.fullstack;
}

function calculateRoleMatch(scores, roleName) {
  const category = findRoleCategory(roleName);
  const { idealTraits, flexibility } = category;
  const traits = ['focus_score', 'interface_score', 'change_score', 'decision_score', 'execution_score'];

  let totalSquaredDistance = 0;
  traits.forEach(trait => {
    const userScore = scores[trait] || 50;
    const idealScore = idealTraits[trait];
    const rawDistance = Math.abs(userScore - idealScore);

    let adjustedDistance;
    if (rawDistance <= flexibility) {
      adjustedDistance = (rawDistance / flexibility) * (rawDistance / flexibility) * flexibility * 0.5;
    } else {
      adjustedDistance = (flexibility * 0.5) + (rawDistance - flexibility);
    }
    totalSquaredDistance += adjustedDistance * adjustedDistance;
  });

  const distance = Math.sqrt(totalSquaredDistance);
  const maxDistance = Math.sqrt(5 * 100 * 100);
  let matchPercentage = (1 - (distance / maxDistance)) * 100;
  matchPercentage = Math.max(15, matchPercentage);
  return Math.round(matchPercentage);
}

function rankRolesByMatch(scores, roles) {
  const rolesWithMatch = roles.map(role => {
    const matchPercentage = calculateRoleMatch(scores, role.name);
    return {
      ...role,
      matchPercentage,
      fitScore: matchPercentage / 100,
    };
  });
  return rolesWithMatch.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

async function verifyAlgorithm() {
  console.log('\n=== ROLE MATCHING VERIFICATION ===\n');

  // Fetch roles from database
  const { data: roles, error } = await supabase
    .from('tech_roles')
    .select('*');

  if (error) {
    console.error('Error fetching roles:', error);
    return;
  }

  console.log(`✓ Loaded ${roles.length} roles from database\n`);

  // Test Case 1: Systems-oriented personality (high interface_score)
  const systemsScores = {
    focus_score: 75,      // Analyzer
    interface_score: 85,  // Systems
    change_score: 70,     // Operational
    decision_score: 75,   // Logic
    execution_score: 80,  // Structured
  };

  console.log('TEST 1: Systems-oriented personality (S-O-L-T-A)');
  console.log('Scores:', systemsScores);
  const systemsRanked = rankRolesByMatch(systemsScores, roles);
  console.log('\nTop 10 Matches:');
  systemsRanked.slice(0, 10).forEach((role, i) => {
    console.log(`  ${i + 1}. ${role.name}: ${role.matchPercentage}%`);
  });

  // Check for 0% matches
  const zeroMatches = systemsRanked.filter(r => r.matchPercentage === 0);
  if (zeroMatches.length > 0) {
    console.log(`\n⚠️  WARNING: ${zeroMatches.length} roles have 0% match!`);
    zeroMatches.slice(0, 5).forEach(role => {
      console.log(`    - ${role.name}`);
    });
  } else {
    console.log('\n✓ No 0% matches found');
  }

  // Test Case 2: User-facing personality (low interface_score)
  const userScores = {
    focus_score: 45,      // Builder
    interface_score: 20,  // User-facing
    change_score: 35,     // Exploratory
    decision_score: 45,   // Vision
    execution_score: 50,  // Balanced
  };

  console.log('\n\nTEST 2: User-facing personality (U-E-V-A-B)');
  console.log('Scores:', userScores);
  const userRanked = rankRolesByMatch(userScores, roles);
  console.log('\nTop 10 Matches:');
  userRanked.slice(0, 10).forEach((role, i) => {
    console.log(`  ${i + 1}. ${role.name}: ${role.matchPercentage}%`);
  });

  // Statistical summary
  console.log('\n\n=== STATISTICAL SUMMARY ===\n');
  const percentages = systemsRanked.map(r => r.matchPercentage);
  const min = Math.min(...percentages);
  const max = Math.max(...percentages);
  const avg = percentages.reduce((a, b) => a + b, 0) / percentages.length;

  console.log(`Min match: ${min}%`);
  console.log(`Max match: ${max}%`);
  console.log(`Avg match: ${avg.toFixed(1)}%`);
  console.log(`Total roles: ${roles.length}`);
  console.log(`Roles with 0%: ${zeroMatches.length}`);

  // Category coverage
  console.log('\n\n=== CATEGORY COVERAGE ===\n');
  const categoryCounts = {};
  roles.forEach(role => {
    const category = findRoleCategory(role.name);
    const categoryName = Object.entries(ROLE_CATEGORIES).find(([name, cat]) => cat === category)?.[0] || 'fullstack';
    categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
  });

  Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} roles`);
  });

  console.log('\n=== VERIFICATION COMPLETE ===\n');
}

verifyAlgorithm();
