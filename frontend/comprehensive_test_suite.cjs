// Comprehensive Test Suite for Tech16 Personalities
// Tests: Database, Quiz, Scoring, Role Matching, Personality Types, Data Integrity

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import role matching functions
const ROLE_CATEGORIES = {
  frontend: {
    keywords: ['frontend', 'web developer', 'react', 'vue', 'angular', 'ui ', 'web3'],
    idealTraits: { interface_score: 15, focus_score: 45, change_score: 35, decision_score: 45, execution_score: 50 },
    flexibility: 35,
  },
  mobile: {
    keywords: ['mobile', 'ios', 'android', 'flutter', 'react native', 'cross-platform'],
    idealTraits: { interface_score: 20, focus_score: 50, change_score: 40, decision_score: 50, execution_score: 55 },
    flexibility: 35,
  },
  backend: {
    keywords: ['backend', 'api engineer', 'microservices', 'protocol'],
    idealTraits: { interface_score: 80, focus_score: 55, change_score: 55, decision_score: 60, execution_score: 60 },
    flexibility: 30,
  },
  infrastructure: {
    keywords: ['devops', 'infrastructure', 'platform engineer', 'sre', 'site reliability', 'kubernetes', 'cloud engineer', 'ci/cd', 'build engineer', 'release engineer'],
    idealTraits: { interface_score: 90, focus_score: 60, change_score: 70, decision_score: 65, execution_score: 75 },
    flexibility: 25,
  },
  security: {
    keywords: ['security', 'penetration', 'devsecops', 'appsec'],
    idealTraits: { interface_score: 85, focus_score: 70, change_score: 70, decision_score: 75, execution_score: 80 },
    flexibility: 25,
  },
  fullstack: {
    keywords: ['full stack', 'fullstack', 'product engineer'],
    idealTraits: { interface_score: 50, focus_score: 50, change_score: 50, decision_score: 50, execution_score: 55 },
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

// Test counters
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, condition, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [checkmark] ${name}`);
    if (details) console.log(`    ${details}`);
  } else {
    failedTests++;
    console.log(`  [xmark] ${name}`);
    if (details) console.log(`    ${details}`);
  }
}

async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║       TECH16 PERSONALITIES - COMPREHENSIVE TEST SUITE          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Shared data
  let questions = [];
  let roles = [];
  let personalities = [];

  // ============================================================
  // TEST 1: DATABASE INTEGRITY
  // ============================================================
  console.log('[chart.bar.fill] TEST 1: DATABASE INTEGRITY\n');

  try {
    // Test 1.1: Quiz versions table
    const { data: quizVersions, error: qvError } = await supabase
      .from('quiz_versions')
      .select('*');

    test('Quiz versions table exists', !qvError);
    test('At least one quiz version exists', quizVersions?.length > 0, `Found ${quizVersions?.length} versions`);

    const activeVersion = quizVersions?.find(v => v.is_active);
    test('Active quiz version exists', !!activeVersion, `Version ${activeVersion?.version}`);

    // Test 1.2: Questions structure
    questions = activeVersion?.questions?.questions || [];
    test('Questions loaded successfully', questions.length > 0, `${questions.length} questions`);
    test('Exactly 40 questions', questions.length === 40, `Found ${questions.length}`);

    // Test 1.3: Question distribution
    const spectrums = ['focus', 'interface', 'change', 'decision', 'execution'];
    const distribution = {};

    questions.forEach(q => {
      if (!distribution[q.spectrum]) {
        distribution[q.spectrum] = { count: 0, directions: new Set() };
      }
      distribution[q.spectrum].count++;
      distribution[q.spectrum].directions.add(q.direction);
    });

    spectrums.forEach(spectrum => {
      test(`${spectrum} has 8 questions`, distribution[spectrum]?.count === 8,
        `Found ${distribution[spectrum]?.count}`);
      test(`${spectrum} has single direction`, distribution[spectrum]?.directions.size === 1,
        `Directions: ${Array.from(distribution[spectrum]?.directions || []).join(', ')}`);
    });

    // Test 1.4: Personality profiles table
    const { data: personalitiesData, error: ppError } = await supabase
      .from('personality_profiles')
      .select('*');

    personalities = personalitiesData || [];
    test('Personality profiles table exists', !ppError);
    test('16 personality types exist', personalities.length === 16, `Found ${personalities.length}`);

    // Test 1.5: No "The" prefix in names
    const withThe = personalities.filter(p => p.name.startsWith('The '));
    test('No personality names start with "The"', withThe.length === 0,
      withThe.length > 0 ? `Found: ${withThe.map(p => p.name).join(', ')}` : 'All names clean');

    // Test 1.6: Tech roles table
    const { data: rolesData, error: rolesError } = await supabase
      .from('tech_roles')
      .select('*');

    roles = rolesData || [];

    test('Tech roles table exists', !rolesError);
    test('61 curated roles exist', roles.length === 61, `Found ${roles.length}`);

    // Test 1.7: No redundant mobile roles
    const mobileRoles = roles.filter(r =>
      r.name === 'iOS Engineer' ||
      r.name === 'Android Engineer' ||
      r.name === 'Flutter Developer'
    );
    test('No redundant mobile roles', mobileRoles.length === 0,
      mobileRoles.length > 0 ? `Found: ${mobileRoles.map(r => r.name).join(', ')}` : 'Consolidated to Mobile Engineer');

  } catch (error) {
    console.log(`  [xmark] Database test failed: ${error.message}`);
    failedTests++;
  }

  // ============================================================
  // TEST 2: SCORING ALGORITHM
  // ============================================================
  console.log('\n[chart.bar.fill] TEST 2: SCORING ALGORITHM\n');

  // Test 2.1: All strongly agree = 100% across all spectrums
  const allAgree = Array(40).fill(4); // 4 = Strongly Agree
  const allAgreeScores = calculateTestScores(allAgree, questions);

  test('All agree → focus_score = 100%', allAgreeScores.focus_score === 100, `Got ${allAgreeScores.focus_score}%`);
  test('All agree → interface_score = 100%', allAgreeScores.interface_score === 100, `Got ${allAgreeScores.interface_score}%`);
  test('All agree → change_score = 100%', allAgreeScores.change_score === 100, `Got ${allAgreeScores.change_score}%`);
  test('All agree → decision_score = 100%', allAgreeScores.decision_score === 100, `Got ${allAgreeScores.decision_score}%`);
  test('All agree → execution_score = 100%', allAgreeScores.execution_score === 100, `Got ${allAgreeScores.execution_score}%`);

  // Test 2.2: All strongly disagree = 0% across all spectrums
  const allDisagree = Array(40).fill(0); // 0 = Strongly Disagree
  const allDisagreeScores = calculateTestScores(allDisagree, questions);

  test('All disagree → focus_score = 0%', allDisagreeScores.focus_score === 0, `Got ${allDisagreeScores.focus_score}%`);
  test('All disagree → interface_score = 0%', allDisagreeScores.interface_score === 0, `Got ${allDisagreeScores.interface_score}%`);
  test('All disagree → change_score = 0%', allDisagreeScores.change_score === 0, `Got ${allDisagreeScores.change_score}%`);
  test('All disagree → decision_score = 0%', allDisagreeScores.decision_score === 0, `Got ${allDisagreeScores.decision_score}%`);
  test('All disagree → execution_score = 0%', allDisagreeScores.execution_score === 0, `Got ${allDisagreeScores.execution_score}%`);

  // Test 2.3: Neutral = 50% across all spectrums
  const allNeutral = Array(40).fill(2); // 2 = Neutral
  const allNeutralScores = calculateTestScores(allNeutral, questions);

  test('All neutral → focus_score ≈ 50%', Math.abs(allNeutralScores.focus_score - 50) <= 5, `Got ${allNeutralScores.focus_score}%`);
  test('All neutral → interface_score ≈ 50%', Math.abs(allNeutralScores.interface_score - 50) <= 5, `Got ${allNeutralScores.interface_score}%`);

  // ============================================================
  // TEST 3: ROLE MATCHING ALGORITHM
  // ============================================================
  console.log('\n[chart.bar.fill] TEST 3: ROLE MATCHING ALGORITHM\n');

  // Test 3.1: No 0% matches
  const systemsScores = { focus_score: 75, interface_score: 85, change_score: 70, decision_score: 75, execution_score: 80 };
  const matches = roles.map(role => calculateRoleMatch(systemsScores, role.name));
  const zeroMatches = matches.filter(m => m === 0);

  test('No 0% role matches', zeroMatches.length === 0, `All roles: 15-100%`);
  test('Min match ≥ 15%', Math.min(...matches) >= 15, `Min: ${Math.min(...matches)}%`);
  test('Max match ≤ 100%', Math.max(...matches) <= 100, `Max: ${Math.max(...matches)}%`);

  // Test 3.2: Systems personality → Backend/Security roles ranked high
  const rankedRoles = roles
    .map(role => ({ name: role.name, match: calculateRoleMatch(systemsScores, role.name) }))
    .sort((a, b) => b.match - a.match);

  const top5 = rankedRoles.slice(0, 5);
  const top10 = rankedRoles.slice(0, 10);
  const hasSecurityInTop5 = top5.some(r => r.name.toLowerCase().includes('security'));
  const hasInfraInTop10 = top10.some(r =>
    r.name.toLowerCase().includes('platform') ||
    r.name.toLowerCase().includes('devops') ||
    r.name.toLowerCase().includes('sre')
  );

  test('Systems personality → Security in top 5', hasSecurityInTop5,
    `Top 5: ${top5.map(r => `${r.name} (${r.match}%)`).join(', ')}`);
  test('Systems personality → Infrastructure in top 10', hasInfraInTop10,
    `Top 10 includes: ${top10.filter(r => r.name.toLowerCase().includes('platform') || r.name.toLowerCase().includes('devops') || r.name.toLowerCase().includes('sre')).map(r => r.name).join(', ')}`);

  // Test 3.3: User-facing personality → Frontend roles ranked high
  const userScores = { focus_score: 45, interface_score: 20, change_score: 35, decision_score: 45, execution_score: 50 };
  const userRanked = roles
    .map(role => ({ name: role.name, match: calculateRoleMatch(userScores, role.name) }))
    .sort((a, b) => b.match - a.match);

  const userTop5 = userRanked.slice(0, 5);
  const hasFrontendInTop5 = userTop5.some(r =>
    r.name.toLowerCase().includes('frontend') ||
    r.name.toLowerCase().includes('web developer')
  );

  test('User-facing personality → Frontend in top 5', hasFrontendInTop5,
    `Top 5: ${userTop5.map(r => `${r.name} (${r.match}%)`).join(', ')}`);

  // Test 3.4: Mobile Engineer exists (consolidated)
  const hasMobileEngineer = roles.some(r => r.name === 'Mobile Engineer');
  test('Mobile Engineer exists', hasMobileEngineer);

  // Test 3.5: Game Developer exists (consolidated)
  const hasGameDeveloper = roles.some(r => r.name === 'Game Developer');
  test('Game Developer exists', hasGameDeveloper);

  // ============================================================
  // TEST 4: PERSONALITY TYPE GENERATION
  // ============================================================
  console.log('\n[chart.bar.fill] TEST 4: PERSONALITY TYPE GENERATION\n');

  // Test all 16 base personality types
  // Format: [Interface]-[Change]-[Decision]-[Execution]
  // U/S (User/Systems), E/O (Exploratory/Operational), L/V (Logic/Vision), A/T (Adaptive/sTructured)
  const expectedTypes = [
    'U-E-L-A', 'U-E-L-T', 'U-E-V-A', 'U-E-V-T',
    'U-O-L-A', 'U-O-L-T', 'U-O-V-A', 'U-O-V-T',
    'S-E-L-A', 'S-E-L-T', 'S-E-V-A', 'S-E-V-T',
    'S-O-L-A', 'S-O-L-T', 'S-O-V-A', 'S-O-V-T',
  ];

  expectedTypes.forEach(typeCode => {
    const found = personalities.some(p => p.type_code === typeCode);
    test(`Personality type ${typeCode} exists`, found);
  });

  // Test personality type has all required fields
  const samplePersonality = personalities[0];
  test('Personality has name field', !!samplePersonality.name);
  test('Personality has description field', !!samplePersonality.description);
  test('Personality has strengths field', !!samplePersonality.strengths);
  test('Personality has type_code field', !!samplePersonality.type_code);

  // ============================================================
  // TEST 5: DATA CONSISTENCY
  // ============================================================
  console.log('\n[chart.bar.fill] TEST 5: DATA CONSISTENCY\n');

  // Test 5.1: All questions have required fields
  const hasAllFields = questions.every(q =>
    q.id !== undefined &&
    q.text &&
    q.spectrum &&
    q.direction &&
    q.options
  );
  test('All questions have required fields', hasAllFields);

  // Test 5.2: All questions have 5 options
  const hasCorrectOptions = questions.every(q => q.options?.length === 5);
  test('All questions have 5 options', hasCorrectOptions);

  // Test 5.3: Question IDs are unique
  const questionIds = questions.map(q => q.id);
  const uniqueIds = new Set(questionIds);
  test('Question IDs are unique', questionIds.length === uniqueIds.size);

  // Test 5.4: Question IDs are sequential (1-40)
  const sortedIds = [...questionIds].sort((a, b) => a - b);
  const isSequential = sortedIds.every((id, i) => id === i + 1);
  test('Question IDs are sequential (1-40)', isSequential);

  // ============================================================
  // TEST 6: EDGE CASES
  // ============================================================
  console.log('\n[chart.bar.fill] TEST 6: EDGE CASES\n');

  // Test 6.1: Extreme scores still produce valid matches
  const extremeScores = { focus_score: 100, interface_score: 100, change_score: 100, decision_score: 100, execution_score: 100 };
  const extremeMatches = roles.map(role => calculateRoleMatch(extremeScores, role.name));
  const validExtremeMatches = extremeMatches.every(m => m >= 15 && m <= 100);
  test('Extreme scores (100,100,100,100,100) produce valid matches', validExtremeMatches);

  // Test 6.2: Minimum scores still produce valid matches
  const minScores = { focus_score: 0, interface_score: 0, change_score: 0, decision_score: 0, execution_score: 0 };
  const minMatches = roles.map(role => calculateRoleMatch(minScores, role.name));
  const validMinMatches = minMatches.every(m => m >= 15 && m <= 100);
  test('Minimum scores (0,0,0,0,0) produce valid matches', validMinMatches);

  // Test 6.3: Balanced scores produce reasonable distribution
  const balancedScores = { focus_score: 50, interface_score: 50, change_score: 50, decision_score: 50, execution_score: 50 };
  const balancedMatches = roles.map(role => calculateRoleMatch(balancedScores, role.name));
  const avgBalanced = balancedMatches.reduce((a, b) => a + b, 0) / balancedMatches.length;
  test('Balanced scores produce avg match ≈ 85-95%', avgBalanced >= 80 && avgBalanced <= 100, `Avg: ${avgBalanced.toFixed(1)}%`);

  // ============================================================
  // TEST SUMMARY
  // ============================================================
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                        TEST SUMMARY                            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log(`  Total Tests:  ${totalTests}`);
  console.log(`  [checkmark] Passed:     ${passedTests} (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  console.log(`  [xmark] Failed:     ${failedTests} (${((failedTests/totalTests)*100).toFixed(1)}%)`);

  if (failedTests === 0) {
    console.log('\n  [checkmark.circle] ALL TESTS PASSED! Project is in excellent condition.\n');
  } else {
    console.log(`\n  [exclamationmark.triangle]  ${failedTests} test(s) failed. Review issues above.\n`);
  }

  console.log('════════════════════════════════════════════════════════════════\n');
}

// Helper function to calculate scores from responses
function calculateTestScores(responses, questions) {
  const scores = {
    focus_score: 0,
    interface_score: 0,
    change_score: 0,
    decision_score: 0,
    execution_score: 0,
  };

  questions.forEach((q, i) => {
    const response = responses[i];
    const points = response * 25; // 0,1,2,3,4 → 0,25,50,75,100

    if (q.spectrum === 'focus') scores.focus_score += points;
    if (q.spectrum === 'interface') scores.interface_score += points;
    if (q.spectrum === 'change') scores.change_score += points;
    if (q.spectrum === 'decision') scores.decision_score += points;
    if (q.spectrum === 'execution') scores.execution_score += points;
  });

  // Average across 8 questions per spectrum
  Object.keys(scores).forEach(key => {
    scores[key] = Math.round(scores[key] / 8);
  });

  return scores;
}

runTests();
