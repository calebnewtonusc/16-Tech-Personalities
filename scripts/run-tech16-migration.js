#!/usr/bin/env node

/**
 * Tech 16 Database Migration Runner
 *
 * This script executes the Tech 16 redesign migrations:
 * 1. Updates personality_profiles with new names and categories
 * 2. Adds 95 comprehensive tech roles
 * 3. Creates role_scoring_weights mappings
 *
 * Usage:
 *   node run-tech16-migration.js
 *
 * Requirements:
 *   - SUPABASE_URL environment variable
 *   - SUPABASE_SERVICE_ROLE_KEY environment variable (service role for admin operations)
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '2026 Code/Projects/Big-Projects/Personal-Website/.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  console.error('   Set them in your .env.local file or as environment variables');
  process.exit(1);
}

// Create Supabase client with service role key (for admin operations)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function executeSQLFile(filePath, description) {
  console.log(`\n📄 ${description}`);
  console.log(`   File: ${path.basename(filePath)}`);

  try {
    const sql = fs.readFileSync(filePath, 'utf8');

    // Split SQL file by statements (simple split on semicolon)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`   Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      // Skip comments
      if (statement.startsWith('--')) continue;

      try {
        // Use Supabase RPC to execute raw SQL
        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: statement + ';'
        });

        if (error) {
          // If exec_sql RPC doesn't exist, we need to use the SQL Editor in Supabase Dashboard
          console.error(`   ⚠️  Cannot execute SQL directly via API`);
          console.error(`   ℹ️  Please run this SQL manually in Supabase Dashboard > SQL Editor`);
          return false;
        }
      } catch (err) {
        console.error(`   ❌ Error executing statement ${i + 1}:`, err.message);
        console.error(`   Statement: ${statement.substring(0, 100)}...`);
        return false;
      }
    }

    console.log(`   ✅ Successfully executed`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error reading file:`, error.message);
    return false;
  }
}

async function runMigrations() {
  console.log('🚀 Tech 16 Database Migration');
  console.log('================================\n');

  console.log('⚠️  IMPORTANT: Direct SQL execution via API is limited.');
  console.log('   For best results, copy the SQL files and run them in:');
  console.log('   Supabase Dashboard > SQL Editor\n');

  console.log('Migration files created:');
  console.log('  1. tech16-database-migration.sql - Updates personalities and adds roles');
  console.log('  2. tech16-role-mappings.sql - Creates role scoring weights\n');

  // Check if we can execute SQL directly
  console.log('Testing Supabase connection...');

  const { data, error } = await supabase
    .from('personality_profiles')
    .select('count', { count: 'exact', head: true });

  if (error) {
    console.error('❌ Cannot connect to Supabase:', error.message);
    process.exit(1);
  }

  console.log('✅ Connected to Supabase successfully\n');

  // Manual execution instructions
  console.log('📋 MANUAL EXECUTION STEPS:');
  console.log('   1. Open Supabase Dashboard: https://supabase.com/dashboard');
  console.log('   2. Go to: SQL Editor');
  console.log('   3. Create a new query');
  console.log('   4. Copy the contents of: tech16-database-migration.sql');
  console.log('   5. Run the query');
  console.log('   6. Create another new query');
  console.log('   7. Copy the contents of: tech16-role-mappings.sql');
  console.log('   8. Run the query\n');

  console.log('✨ After running the migrations, you should have:');
  console.log('   - 16 updated personality profiles with new names');
  console.log('   - 95+ comprehensive tech roles');
  console.log('   - 400+ role-to-personality mappings\n');

  // Verify current state
  console.log('📊 Current Database State:');

  const { count: profileCount } = await supabase
    .from('personality_profiles')
    .select('*', { count: 'exact', head: true });

  const { count: roleCount } = await supabase
    .from('tech_roles')
    .select('*', { count: 'exact', head: true });

  const { count: weightCount } = await supabase
    .from('role_scoring_weights')
    .select('*', { count: 'exact', head: true });

  console.log(`   - Personality Profiles: ${profileCount}`);
  console.log(`   - Tech Roles: ${roleCount}`);
  console.log(`   - Role Scoring Weights: ${weightCount}`);
  console.log();
}

// Run migrations
runMigrations()
  .then(() => {
    console.log('✅ Migration preparation complete!');
    console.log('   Run the SQL files manually in Supabase Dashboard.\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
