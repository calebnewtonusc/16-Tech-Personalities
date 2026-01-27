const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkRoleNames() {
  const { data: roles, error } = await supabase
    .from('tech_roles')
    .select('name')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Role names in database:');
  console.log('======================');
  roles.forEach(role => console.log(`  "${role.name}"`));
  console.log(`\nTotal: ${roles.length} roles`);
}

checkRoleNames();
