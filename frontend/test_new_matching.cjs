const { calculateRoleMatch, rankRolesByMatch } = require('./src/Tech16/roleMatching.js');

// Test with the personality from screenshot: S-O-L-A-A
const testScores = {
  focus_score: 97,
  interface_score: 100,
  change_score: 100,
  decision_score: 75,
  execution_score: 9
};

console.log('Testing Role Matching Algorithm');
console.log('================================\n');
console.log('Personality Scores:');
console.log('  Focus: 97% (Analyzer)');
console.log('  Interface: 100% (Systems-Facing)');
console.log('  Change: 100% (Operational)');
console.log('  Decision: 75% (Logic-Led)');
console.log('  Execution: 9% (Adaptive)');
console.log('\nTop 10 Role Matches:\n');

const testRoles = [
  { name: 'Frontend Engineer' },
  { name: 'Backend Engineer' },
  { name: 'DevOps Engineer' },
  { name: 'Site Reliability Engineer (SRE)' },
  { name: 'Database Administrator (DBA)' },
  { name: 'Security Engineer' },
  { name: 'Machine Learning Engineer' },
  { name: 'Data Engineer' },
  { name: 'Full Stack Engineer' },
  { name: 'Cloud Engineer' },
  { name: 'Systems Engineer' },
  { name: 'Infrastructure Engineer' },
  { name: 'Platform Engineer' },
  { name: 'Distributed Systems Engineer' },
  { name: 'Performance Engineer' },
  { name: 'QA Engineer' },
];

const rankedRoles = rankRolesByMatch(testScores, testRoles);

rankedRoles.slice(0, 10).forEach((role, idx) => {
  console.log((idx + 1) + '. ' + role.name);
  console.log('   ' + role.matchPercentage + '% match');
  console.log('');
});

const zeroMatches = rankedRoles.filter(r => r.matchPercentage === 0);
if (zeroMatches.length > 0) {
  console.log('ERROR: Found roles with 0% match!');
} else {
  console.log('✅ All roles have non-zero match percentages\n');
}

const frontendMatch = rankedRoles.find(r => r.name === 'Frontend Engineer').matchPercentage;
const backendMatch = rankedRoles.find(r => r.name === 'Backend Engineer').matchPercentage;

console.log('Frontend vs Backend comparison:');
console.log('  Frontend Engineer: ' + frontendMatch + '%');
console.log('  Backend Engineer: ' + backendMatch + '%');

if (backendMatch > frontendMatch) {
  console.log('✅ Backend scored higher (correct for S-O-L-A-A personality)');
} else {
  console.log('ERROR: Backend should score higher than Frontend!');
}
