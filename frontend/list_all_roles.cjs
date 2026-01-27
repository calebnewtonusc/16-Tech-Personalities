// List all roles sorted by category
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listAllRoles() {
  const { data: roles, error } = await supabase
    .from('tech_roles')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== ALL TECH ROLES (Alphabetical) ===\n');
  console.log(`Total: ${roles.length} roles\n`);

  roles.forEach((role, i) => {
    console.log(`${i + 1}. ${role.name}`);
  });
}

listAllRoles();
