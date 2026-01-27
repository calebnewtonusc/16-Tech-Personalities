// Run migration via Supabase client
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('Running migration 002_redesigned_questions...\n');

  try {
    // Step 1: Deactivate version 1
    console.log('Step 1: Deactivating version 1...');
    const { error: deactivateError } = await supabase
      .from('quiz_versions')
      .update({ is_active: false })
      .eq('version', 1);

    if (deactivateError) {
      console.error('❌ Error deactivating version 1:', deactivateError);
      return;
    }
    console.log('✓ Version 1 deactivated\n');

    // Step 2: Read migration SQL to get questions JSON
    const migrationPath = '../database/migrations/002_redesigned_questions.sql';
    console.log('Step 2: Reading questions from migration file...');

    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Extract the JSON from the migration file
    const jsonMatch = sql.match(/'{[\s\S]*?}'::jsonb/);
    if (!jsonMatch) {
      console.error('❌ Could not extract questions JSON from migration file');
      return;
    }

    const jsonString = jsonMatch[0].replace(/^'|'::jsonb$/g, '');
    const questionsData = JSON.parse(jsonString);

    console.log(`✓ Loaded ${questionsData.questions.length} questions\n`);

    // Step 3: Insert version 2
    console.log('Step 3: Inserting version 2...');
    const { error: insertError } = await supabase
      .from('quiz_versions')
      .insert({
        version: 2,
        questions: questionsData,
        is_active: true
      });

    if (insertError) {
      console.error('❌ Error inserting version 2:', insertError);
      // Rollback: reactivate version 1
      console.log('\nRolling back...');
      await supabase.from('quiz_versions').update({ is_active: true }).eq('version', 1);
      return;
    }

    console.log('✓ Version 2 inserted and activated\n');

    // Step 4: Verify
    console.log('Step 4: Verifying migration...');
    const { data: versions, error: verifyError } = await supabase
      .from('quiz_versions')
      .select('version, is_active')
      .order('version');

    if (verifyError) {
      console.error('❌ Error verifying:', verifyError);
      return;
    }

    console.log('\nCurrent quiz versions:');
    versions.forEach(v => {
      console.log(`  Version ${v.version}: ${v.is_active ? '✓ ACTIVE' : 'inactive'}`);
    });

    console.log('\n✅ MIGRATION COMPLETED SUCCESSFULLY\n');
    console.log('Next steps:');
    console.log('  1. Run: node check_distribution.cjs');
    console.log('  2. Run: node test_scoring_v2.cjs');
    console.log('  3. Test in browser: Take quiz with all "Strongly Agree"\n');

  } catch (err) {
    console.error('❌ Migration failed:', err);
    console.log('\nRolling back...');
    await supabase.from('quiz_versions').update({ is_active: true }).eq('version', 1);
  }
}

runMigration();
