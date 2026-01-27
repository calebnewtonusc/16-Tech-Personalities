#!/usr/bin/env node
// Comprehensive verification of all function/variable references

const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║         COMPREHENSIVE REFERENCE VERIFICATION                   ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Test 1: Verify scoringSupabase.js exports
console.log('📦 TEST 1: Verify scoringSupabase.js exports\n');
try {
  const scoringModule = require('./src/Tech16/scoringSupabase');
  const exports = Object.keys(scoringModule);
  console.log('✓ Exports found:', exports.join(', '));

  // Check specific exports
  const requiredExports = ['calculateScores', 'generatePersonalityType', 'getBasePersonalityType', 'generateScoresFromType'];
  requiredExports.forEach(exportName => {
    if (scoringModule[exportName]) {
      console.log(`  ✓ ${exportName} exported`);
    } else {
      console.log(`  ✗ ${exportName} NOT exported`);
    }
  });
} catch (error) {
  console.log('✗ Error loading scoringSupabase:', error.message);
}

// Test 2: Verify roleMatching.js exports
console.log('\n📦 TEST 2: Verify roleMatching.js exports\n');
try {
  const roleMatchingModule = require('./src/Tech16/roleMatching');
  const exports = Object.keys(roleMatchingModule);
  console.log('✓ Exports found:', exports.join(', '));

  if (roleMatchingModule.calculateRoleMatch) {
    console.log('  ✓ calculateRoleMatch exported');
  }
  if (roleMatchingModule.rankRolesByMatch) {
    console.log('  ✓ rankRolesByMatch exported');
  }
} catch (error) {
  console.log('✗ Error loading roleMatching:', error.message);
}

// Test 3: Verify PersonalityTypeDetail.js imports
console.log('\n📄 TEST 3: Verify PersonalityTypeDetail.js imports\n');
const personalityTypeDetailPath = './src/Tech16/PersonalityTypeDetail.js';
const personalityTypeDetailContent = fs.readFileSync(personalityTypeDetailPath, 'utf-8');

// Check imports
const imports = [
  { name: 'getBasePersonalityType', from: './scoringSupabase', line: 4 },
  { name: 'generateScoresFromType', from: './scoringSupabase', line: 4 },
  { name: 'rankRolesByMatch', from: './roleMatching', line: 6 },
];

imports.forEach(imp => {
  const regex = new RegExp(`import.*${imp.name}.*from.*['"]${imp.from}['"]`);
  if (regex.test(personalityTypeDetailContent)) {
    console.log(`  ✓ ${imp.name} imported from ${imp.from}`);
  } else {
    console.log(`  ✗ ${imp.name} NOT found in imports`);
  }
});

// Check usage
console.log('\n🔍 TEST 4: Verify function usage in PersonalityTypeDetail.js\n');
const usages = [
  { name: 'getBasePersonalityType', expectedLine: 407 },
  { name: 'generateScoresFromType', expectedLine: 427 },
  { name: 'rankRolesByMatch', expectedLine: 430 },
];

usages.forEach(usage => {
  const regex = new RegExp(`${usage.name}\\s*\\(`);
  if (regex.test(personalityTypeDetailContent)) {
    console.log(`  ✓ ${usage.name} is called`);
  } else {
    console.log(`  ✗ ${usage.name} NOT called`);
  }
});

// Test 5: Verify generateScoresFromType implementation
console.log('\n🧪 TEST 5: Verify generateScoresFromType functionality\n');
try {
  const { generateScoresFromType } = require('./src/Tech16/scoringSupabase');

  const testCases = [
    { input: 'U-E-V-A', expected: { interface_score: 30, change_score: 30, decision_score: 30, execution_score: 30, focus_score: 50 } },
    { input: 'S-O-L-T', expected: { interface_score: 70, change_score: 70, decision_score: 70, execution_score: 70, focus_score: 50 } },
  ];

  testCases.forEach(test => {
    const result = generateScoresFromType(test.input);
    const match = JSON.stringify(result) === JSON.stringify(test.expected);
    if (match) {
      console.log(`  ✓ generateScoresFromType("${test.input}") returns correct scores`);
    } else {
      console.log(`  ✗ generateScoresFromType("${test.input}") returned:`, result);
      console.log(`    Expected:`, test.expected);
    }
  });
} catch (error) {
  console.log('✗ Error testing generateScoresFromType:', error.message);
}

// Test 6: Verify rankRolesByMatch functionality
console.log('\n🧪 TEST 6: Verify rankRolesByMatch functionality\n');
try {
  const { rankRolesByMatch } = require('./src/Tech16/roleMatching');

  const testScores = { focus_score: 70, interface_score: 85, change_score: 65, decision_score: 70, execution_score: 75 };
  const testRoles = [
    { id: 1, name: 'Frontend Engineer' },
    { id: 2, name: 'Security Engineer' },
    { id: 3, name: 'Full Stack Engineer' },
  ];

  const result = rankRolesByMatch(testScores, testRoles);

  if (result && result.length === 3) {
    console.log('  ✓ rankRolesByMatch returns array of roles');
    result.forEach((role, idx) => {
      if (role.matchPercentage !== undefined && role.fitScore !== undefined) {
        console.log(`    ✓ Role #${idx + 1}: ${role.name} - ${role.matchPercentage}% (fitScore: ${role.fitScore})`);
      } else {
        console.log(`    ✗ Role #${idx + 1} missing matchPercentage or fitScore`);
      }
    });

    // Verify minimum 15%
    const minMatch = Math.min(...result.map(r => r.matchPercentage));
    if (minMatch >= 15) {
      console.log(`  ✓ All matches ≥ 15% (min: ${minMatch}%)`);
    } else {
      console.log(`  ✗ Found match < 15%: ${minMatch}%`);
    }
  } else {
    console.log('  ✗ rankRolesByMatch did not return expected array');
  }
} catch (error) {
  console.log('✗ Error testing rankRolesByMatch:', error.message);
}

// Test 7: File syntax check
console.log('\n📝 TEST 7: JavaScript syntax validation\n');
const filesToCheck = [
  './src/Tech16/scoringSupabase.js',
  './src/Tech16/roleMatching.js',
  './src/Tech16/PersonalityTypeDetail.js',
];

filesToCheck.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    // Simple syntax check - look for obvious errors
    const braceCount = (content.match(/{/g) || []).length - (content.match(/}/g) || []).length;
    const parenCount = (content.match(/\(/g) || []).length - (content.match(/\)/g) || []).length;

    if (braceCount === 0 && parenCount === 0) {
      console.log(`  ✓ ${path.basename(file)} - balanced braces and parens`);
    } else {
      console.log(`  ⚠ ${path.basename(file)} - braces: ${braceCount}, parens: ${parenCount}`);
    }
  } catch (error) {
    console.log(`  ✗ ${path.basename(file)} - ${error.message}`);
  }
});

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║                    VERIFICATION COMPLETE                       ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');
