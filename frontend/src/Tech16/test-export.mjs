// Test if generateScoresFromType can be imported
import { generateScoresFromType } from './scoringSupabase.js';

console.log('✓ generateScoresFromType imported successfully');
console.log('Testing with type code U-E-V-A:');
const scores = generateScoresFromType('U-E-V-A');
console.log(scores);
