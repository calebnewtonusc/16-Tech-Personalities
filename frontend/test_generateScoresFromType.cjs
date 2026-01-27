// Test generateScoresFromType function
const { calculateScores, generatePersonalityType, getBasePersonalityType } = require('./src/Tech16/scoringSupabase');

// Try to import generateScoresFromType
try {
  const scoringModule = require('./src/Tech16/scoringSupabase');
  console.log('\n📦 Available exports from scoringSupabase.js:');
  console.log(Object.keys(scoringModule).join(', '));

  if (scoringModule.generateScoresFromType) {
    console.log('\n✅ generateScoresFromType IS exported!');
    console.log('\nTesting generateScoresFromType("U-E-V-A"):');
    const scores = scoringModule.generateScoresFromType('U-E-V-A');
    console.log(scores);
    console.log('\nExpected: {interface_score: 30, change_score: 30, decision_score: 30, execution_score: 30, focus_score: 50}');
  } else {
    console.log('\n❌ generateScoresFromType is NOT exported!');
  }
} catch (error) {
  console.error('Error importing scoringSupabase:', error.message);
}
