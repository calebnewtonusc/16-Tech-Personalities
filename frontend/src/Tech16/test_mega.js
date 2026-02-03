import { rankRolesByMatch } from './megaAlgorithm.js';

const roles = [
  { id: 1, name: 'Frontend Developer' },
  { id: 2, name: 'Backend Engineer' },
  { id: 3, name: 'Full Stack Engineer' },
  { id: 4, name: 'Mobile Developer (iOS/Android)' },
  { id: 5, name: 'DevOps Engineer' },
  { id: 6, name: 'Data Engineer' },
  { id: 7, name: 'ML Engineer' },
  { id: 8, name: 'Security Engineer' },
  { id: 9, name: 'QA Engineer / SDET' },
  { id: 10, name: 'Site Reliability Engineer (SRE)' },
  { id: 11, name: 'Database Administrator' },
  { id: 12, name: 'UX Engineer / Design Systems' },
  { id: 13, name: 'Product Engineer' },
  { id: 14, name: 'Platform Engineer' },
  { id: 15, name: 'Growth Engineer' },
  { id: 16, name: 'Data Scientist' },
  { id: 17, name: 'Systems Engineer' },
  { id: 18, name: 'Performance Engineer' },
  { id: 19, name: 'Search Engineer' },
  { id: 20, name: 'Developer Advocate' },
];

// Expected top 3 for each type
const expectedTop3 = {
  'B-U-E-V': ['Frontend Developer', 'Mobile Developer (iOS/Android)', 'UX Engineer / Design Systems'],
  'B-U-E-L': ['Frontend Developer', 'Growth Engineer', 'Product Engineer'],
  'B-U-O-V': ['Frontend Developer', 'Product Engineer', 'Mobile Developer (iOS/Android)'],
  'B-U-O-L': ['Frontend Developer', 'Mobile Developer (iOS/Android)', 'QA Engineer / SDET'],
  'B-S-E-V': ['Backend Engineer', 'DevOps Engineer', 'Platform Engineer'],
  'B-S-E-L': ['Backend Engineer', 'Data Engineer', 'ML Engineer'],
  'B-S-O-V': ['DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
  'B-S-O-L': ['DevOps Engineer', 'Database Administrator', 'Data Engineer'],
  'A-U-E-V': ['UX Engineer / Design Systems', 'Frontend Developer', 'Product Engineer'],
  'A-U-E-L': ['Growth Engineer', 'Product Engineer', 'Frontend Developer'],
  'A-U-O-V': ['Frontend Developer', 'Product Engineer', 'UX Engineer / Design Systems'],
  'A-U-O-L': ['QA Engineer / SDET', 'Frontend Developer', 'Full Stack Engineer'],
  'A-S-E-V': ['Backend Engineer', 'Platform Engineer', 'Site Reliability Engineer (SRE)'],
  'A-S-E-L': ['ML Engineer', 'Data Engineer', 'Backend Engineer'],
  'A-S-O-V': ['Site Reliability Engineer (SRE)', 'DevOps Engineer', 'Platform Engineer'],
  'A-S-O-L': ['Security Engineer', 'Database Administrator', 'Data Engineer'],
};

// Strength levels to test
const strengthLevels = [
  { name: 'Extreme', low: 5, high: 95 },
  { name: 'VeryStrong', low: 10, high: 90 },
  { name: 'Strong', low: 20, high: 80 },
  { name: 'Medium', low: 30, high: 70 },
  { name: 'Moderate', low: 40, high: 60 },
  { name: 'Slight', low: 45, high: 55 },
  { name: 'Weak', low: 49, high: 51 },
];

// Generate all test cases
const testCases = [];
Object.entries(expectedTop3).forEach(([type, expected]) => {
  strengthLevels.forEach(({ name, low, high }) => {
    // Parse type (e.g., 'B-U-E-V' -> B=low, U=low, E=low, V=low)
    const [focus, interface_, change, decision] = type.split('-');

    const scores = {
      focus_score: focus === 'B' ? low : high,
      interface_score: interface_ === 'U' ? low : high,
      change_score: change === 'E' ? low : high,
      decision_score: decision === 'V' ? low : high,
      execution_score: decision === 'V' ? low : high, // V or L determines execution
    };

    testCases.push({
      type,
      strengthName: name,
      scores,
      expected,
    });
  });
});

console.log(`=== MEGA-ALGORITHM TEST: ${testCases.length} test cases ===\n`);

// Track results by strength level
const resultsByStrength = {};
strengthLevels.forEach(({ name }) => {
  resultsByStrength[name] = { perfect: 0, partial: 0, weak: 0, wrong: 0, total: 0 };
});

let totalPerfect = 0;
let totalPartial = 0;
let totalWeak = 0;
let totalWrong = 0;

// Run all tests
testCases.forEach(({ type, strengthName, scores, expected }) => {
  const ranked = rankRolesByMatch(scores, roles);
  const top3Actual = ranked.slice(0, 3).map(r => r.name);
  const matches = top3Actual.filter(role => expected.includes(role)).length;

  const status = matches === 3 ? 'PERFECT' : matches === 2 ? 'PARTIAL' : matches === 1 ? 'WEAK' : 'WRONG';

  // Update counters
  resultsByStrength[strengthName].total++;
  if (matches === 3) {
    totalPerfect++;
    resultsByStrength[strengthName].perfect++;
  } else if (matches === 2) {
    totalPartial++;
    resultsByStrength[strengthName].partial++;
  } else if (matches === 1) {
    totalWeak++;
    resultsByStrength[strengthName].weak++;
  } else {
    totalWrong++;
    resultsByStrength[strengthName].wrong++;
  }

  // Only print failures
  if (matches < 3) {
    console.log(`${status}: ${type} @ ${strengthName} (${matches}/3)`);
    console.log(`  Expected: ${expected.join(', ')}`);
    console.log(`  Actual:   ${top3Actual.join(', ')}`);
    console.log('');
  }
});

// Summary by strength level
console.log('=== RESULTS BY STRENGTH LEVEL ===');
strengthLevels.forEach(({ name }) => {
  const stats = resultsByStrength[name];
  const accuracy = ((stats.perfect * 3 + stats.partial * 2 + stats.weak * 1) / (stats.total * 3) * 100).toFixed(1);
  console.log(`${name.padEnd(12)} ${accuracy}%  (Perfect: ${stats.perfect}/${stats.total}, Partial: ${stats.partial}, Weak: ${stats.weak}, Wrong: ${stats.wrong})`);
});

// Overall summary
const totalTests = testCases.length;
const overallAccuracy = ((totalPerfect * 3 + totalPartial * 2 + totalWeak * 1) / (totalTests * 3) * 100).toFixed(1);

console.log('\n=== OVERALL SUMMARY ===');
console.log(`Total tests: ${totalTests}`);
console.log(`Perfect (3/3): ${totalPerfect} (${(totalPerfect/totalTests*100).toFixed(1)}%)`);
console.log(`Partial (2/3): ${totalPartial} (${(totalPartial/totalTests*100).toFixed(1)}%)`);
console.log(`Weak (1/3):    ${totalWeak} (${(totalWeak/totalTests*100).toFixed(1)}%)`);
console.log(`Wrong (0/3):   ${totalWrong} (${(totalWrong/totalTests*100).toFixed(1)}%)`);
console.log(`\nOverall Accuracy: ${overallAccuracy}%`);

// Compare to old algorithm (75.3%)
const improvement = (parseFloat(overallAccuracy) - 75.3).toFixed(1);
console.log(`\nImprovement over old algorithm: ${improvement > 0 ? '+' : ''}${improvement}%`);
