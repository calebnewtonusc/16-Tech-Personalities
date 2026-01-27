#!/usr/bin/env node
// Execute deletion of redundant roles

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTI5MjQxNCwiZXhwIjoyMDg0ODY4NDE0fQ.ywAQNCd8iFMQGJWgzpL2FXLe_6EsuGX5hqZYt8FSUJw';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const REDUNDANT_ROLES = [
  // Testing Overlap (3)
  'Mobile QA Engineer',
  'Test Infrastructure Engineer',
  'SDET',

  // Security Overlap (4)
  'Application Security Engineer',
  'DevSecOps Engineer',
  'Penetration Tester',
  'Security Researcher',

  // ML/AI Overlap (5)
  'AI Engineer',
  'Deep Learning Engineer',
  'LLM Engineer',
  'ML Platform Engineer',
  'Research Scientist',

  // Data Engineering Overlap (2)
  'ETL Developer',
  'Data Platform Engineer',

  // Infrastructure Overlap (4)
  'Kubernetes Engineer',
  'CI/CD Engineer',
  'Build Engineer',
  'Release Engineer',

  // Database Overlap (1)
  'Database Administrator (DBA)',

  // Web Overlap (1)
  'Web Developer',

  // Specialized Overlap (2)
  'Graphics Engineer',
  'Observability Engineer',
];

async function deleteRedundantRoles() {
  console.log('Starting deletion of redundant roles...\n');

  // Get initial count
  const { count: initialCount } = await supabase
    .from('tech_roles')
    .select('*', { count: 'exact', head: true });
  console.log(`Initial role count: ${initialCount}`);

  let deletedCount = 0;
  let notFoundCount = 0;

  for (const roleName of REDUNDANT_ROLES) {
    const { data, error } = await supabase
      .from('tech_roles')
      .delete()
      .eq('name', roleName)
      .select();

    if (error) {
      console.error(`❌ Error deleting "${roleName}":`, error.message);
    } else if (data && data.length > 0) {
      console.log(`✓ Deleted: ${roleName}`);
      deletedCount++;
    } else {
      console.log(`⚠ Not found: ${roleName}`);
      notFoundCount++;
    }
  }

  // Get final count
  const { count: finalCount } = await supabase
    .from('tech_roles')
    .select('*', { count: 'exact', head: true });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Roles deleted: ${deletedCount}`);
  console.log(`Roles not found: ${notFoundCount}`);
  console.log(`Initial count: ${initialCount}`);
  console.log(`Final count: ${finalCount}`);
  console.log(`Expected: ~38 roles`);
}

deleteRedundantRoles()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
