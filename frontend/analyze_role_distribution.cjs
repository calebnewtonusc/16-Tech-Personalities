#!/usr/bin/env node
// Analyze role distribution across all 16 personality types

const { createClient } = require('@supabase/supabase-js');
const { rankRolesByMatch } = require('./src/Tech16/roleMatching');
const { generateScoresFromType } = require('./src/Tech16/scoringSupabase');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';
const supabase = createClient(supabaseUrl, supabaseKey);

const ALL_16_TYPES = [
  'U-E-V-A', 'U-E-V-T', 'U-E-L-A', 'U-E-L-T',
  'U-O-V-A', 'U-O-V-T', 'U-O-L-A', 'U-O-L-T',
  'S-E-V-A', 'S-E-V-T', 'S-E-L-A', 'S-E-L-T',
  'S-O-V-A', 'S-O-V-T', 'S-O-L-A', 'S-O-L-T',
];

async function analyzeDistribution() {
  const { data: roles, error } = await supabase.from('tech_roles').select('*');

  if (error) {
    console.error('Supabase error:', error);
    process.exit(1);
  }

  if (!roles) {
    console.error('No roles data returned');
    process.exit(1);
  }

  const roleAppearances = {};
  const personalityTop3 = {};

  console.log('Analyzing all 16 personality types...\n');

  for (const typeCode of ALL_16_TYPES) {
    const scores = generateScoresFromType(typeCode);
    const rankedRoles = rankRolesByMatch(scores, roles);
    const top3 = rankedRoles.slice(0, 3);

    personalityTop3[typeCode] = top3.map(r => ({ name: r.name, match: r.matchPercentage }));

    top3.forEach(role => {
      roleAppearances[role.name] = (roleAppearances[role.name] || 0) + 1;
    });
  }

  // Show top 3 for each personality
  console.log('=== TOP 3 FOR EACH PERSONALITY ===\n');
  for (const [type, top3] of Object.entries(personalityTop3)) {
    console.log(`${type}:`);
    top3.forEach((r, i) => console.log(`  ${i+1}. ${r.name} - ${r.match}%`));
    console.log('');
  }

  // Roles appearing most frequently
  console.log('\n=== ROLES APPEARING MOST IN TOP 3 ===\n');
  const sorted = Object.entries(roleAppearances).sort((a, b) => b[1] - a[1]);
  sorted.forEach(([role, count]) => {
    console.log(`${count}x - ${role}`);
  });

  // Roles NEVER appearing
  const neverAppearing = roles.filter(role => !roleAppearances[role.name]);
  console.log(`\n=== ROLES NEVER IN TOP 3 (${neverAppearing.length} total) ===\n`);
  neverAppearing.forEach(role => {
    console.log(`- ${role.name}`);
  });

  // Summary
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total roles: ${roles.length}`);
  console.log(`Roles appearing in at least one top 3: ${Object.keys(roleAppearances).length}`);
  console.log(`Roles never appearing: ${neverAppearing.length}`);
  console.log(`Most common role: ${sorted[0][0]} (${sorted[0][1]}x)`);
}

analyzeDistribution().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
