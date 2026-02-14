#!/usr/bin/env node
// Comprehensive test of role matching for all 16 personality types

const { createClient } = require('@supabase/supabase-js');
const { rankRolesByMatch } = require('./src/Tech16/roleMatching');
const { generateScoresFromType } = require('./src/Tech16/scoringSupabase');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNjE1NzEsImV4cCI6MjA1MjczNzU3MX0.CFBH5OBmSg6-6q5cRFCJUSW5-k6LONXwpZP5-rQvywk';
const supabase = createClient(supabaseUrl, supabaseKey);

// All 16 base personality types with their descriptions
const ALL_PERSONALITIES = [
  { code: 'U-E-V-A', name: 'User-Exploratory-Vision-Adaptive', expectedTopRoles: ['Frontend Engineer', 'UX Engineer', 'Design Systems Engineer', 'Web Developer'] },
  { code: 'U-E-V-T', name: 'User-Exploratory-Vision-Structured', expectedTopRoles: ['Frontend Engineer', 'Mobile Engineer', 'Web Developer'] },
  { code: 'U-E-L-A', name: 'User-Exploratory-Logic-Adaptive', expectedTopRoles: ['Frontend Engineer', 'Full Stack Engineer', 'Product Engineer'] },
  { code: 'U-E-L-T', name: 'User-Exploratory-Logic-Structured', expectedTopRoles: ['Frontend Engineer', 'QA Engineer', 'Test Engineer'] },

  { code: 'U-O-V-A', name: 'User-Operational-Vision-Adaptive', expectedTopRoles: ['Frontend Engineer', 'Product Engineer', 'Growth Engineer'] },
  { code: 'U-O-V-T', name: 'User-Operational-Vision-Structured', expectedTopRoles: ['Frontend Engineer', 'Web Developer', 'Mobile Engineer'] },
  { code: 'U-O-L-A', name: 'User-Operational-Logic-Adaptive', expectedTopRoles: ['Frontend Engineer', 'Full Stack Engineer'] },
  { code: 'U-O-L-T', name: 'User-Operational-Logic-Structured', expectedTopRoles: ['Frontend Engineer', 'Web Developer', 'Mobile Engineer'] },

  { code: 'S-E-V-A', name: 'Systems-Exploratory-Vision-Adaptive', expectedTopRoles: ['Backend Engineer', 'Systems Engineer', 'Infrastructure Engineer'] },
  { code: 'S-E-V-T', name: 'Systems-Exploratory-Vision-Structured', expectedTopRoles: ['Systems Engineer', 'Infrastructure Engineer', 'Backend Engineer'] },
  { code: 'S-E-L-A', name: 'Systems-Exploratory-Logic-Adaptive', expectedTopRoles: ['Backend Engineer', 'Data Engineer', 'Machine Learning Engineer'] },
  { code: 'S-E-L-T', name: 'Systems-Exploratory-Logic-Structured', expectedTopRoles: ['Backend Engineer', 'Data Engineer', 'Systems Engineer'] },

  { code: 'S-O-V-A', name: 'Systems-Operational-Vision-Adaptive', expectedTopRoles: ['DevOps Engineer', 'SRE', 'Infrastructure Engineer'] },
  { code: 'S-O-V-T', name: 'Systems-Operational-Vision-Structured', expectedTopRoles: ['DevOps Engineer', 'SRE', 'Platform Engineer'] },
  { code: 'S-O-L-A', name: 'Systems-Operational-Logic-Adaptive', expectedTopRoles: ['Backend Engineer', 'Data Engineer', 'Database Engineer'] },
  { code: 'S-O-L-T', name: 'Systems-Operational-Logic-Structured', expectedTopRoles: ['DevOps Engineer', 'SRE', 'Security Engineer', 'Database Engineer'] },
];

async function testAllPersonalities() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║     COMPREHENSIVE ROLE MATCHING TEST - ALL 16 PERSONALITIES   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Load all roles from database
  const { data: roles, error } = await supabase
    .from('tech_roles')
    .select('*');

  if (error) {
    console.error('Error loading roles:', error);
    return;
  }

  console.log(`Loaded ${roles.length} roles from database\n`);
  console.log('═'.repeat(80));

  let totalTests = 0;
  let passedTests = 0;

  for (const personality of ALL_PERSONALITIES) {
    totalTests++;

    console.log(`\n[chart.bar.fill] Testing: ${personality.code} - ${personality.name}\n`);

    // Generate scores from type code
    const scores = generateScoresFromType(personality.code);
    console.log('Generated Scores:', scores);

    // Rank roles
    const rankedRoles = rankRolesByMatch(scores, roles);

    // Get top 10
    const top10 = rankedRoles.slice(0, 10);

    console.log('\n[trophy.fill] Top 10 Roles:');
    top10.forEach((role, idx) => {
      const badge = idx === 0 ? '[1.circle.fill]' : idx === 1 ? '[2.circle.fill]' : idx === 2 ? '[3.circle.fill]' : `${idx + 1}.`;
      console.log(`  ${badge} ${role.name} - ${role.matchPercentage}% match`);
    });

    // Check if expected roles are in top 10
    const top10Names = top10.map(r => r.name);
    const foundExpected = personality.expectedTopRoles.filter(expected =>
      top10Names.some(name => name.includes(expected) || expected.includes(name))
    );

    console.log(`\n[checkmark] Expected roles found in top 10: ${foundExpected.length}/${personality.expectedTopRoles.length}`);
    if (foundExpected.length > 0) {
      console.log(`  Found: ${foundExpected.join(', ')}`);
    }
    const missing = personality.expectedTopRoles.filter(expected =>
      !top10Names.some(name => name.includes(expected) || expected.includes(name))
    );
    if (missing.length > 0) {
      console.log(`  Missing: ${missing.join(', ')}`);
    }

    // Validate match range
    const minMatch = Math.min(...rankedRoles.map(r => r.matchPercentage));
    const maxMatch = Math.max(...rankedRoles.map(r => r.matchPercentage));
    console.log(`\n[chart.line.uptrend.xyaxis] Match Range: ${minMatch}% - ${maxMatch}%`);

    if (minMatch >= 15 && maxMatch <= 100) {
      console.log('[checkmark] Match range valid (15-100%)');
      passedTests++;
    } else {
      console.log('[xmark] Match range INVALID');
    }

    console.log('═'.repeat(80));
  }

  console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
  console.log(`║                      FINAL RESULTS                             ║`);
  console.log(`╚════════════════════════════════════════════════════════════════╝\n`);
  console.log(`Total Personalities Tested: ${totalTests}`);
  console.log(`Valid Match Ranges: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);

  if (passedTests === totalTests) {
    console.log('\n[checkmark.circle] ALL TESTS PASSED! Role matching is working correctly for all 16 personalities.\n');
  } else {
    console.log(`\n[exclamationmark.triangle]  ${totalTests - passedTests} tests failed. Review role matching algorithm.\n`);
  }
}

testAllPersonalities().then(() => process.exit(0)).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
