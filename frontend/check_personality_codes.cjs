// Check what personality type codes exist in the database
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCodes() {
  const { data: personalities, error } = await supabase
    .from('personality_profiles')
    .select('type_code, name')
    .order('type_code');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== PERSONALITY TYPE CODES IN DATABASE ===\n');
  console.log(`Total: ${personalities.length} types\n`);

  personalities.forEach(p => {
    console.log(`${p.type_code.padEnd(12)} - ${p.name}`);
  });

  console.log('\n=== EXPECTED vs ACTUAL ===\n');

  const expectedTypes = [
    'U-E-V-A', 'U-E-V-L', 'U-E-O-A', 'U-E-O-L',
    'U-O-V-A', 'U-O-V-L', 'U-O-O-A', 'U-O-O-L',
    'S-E-V-A', 'S-E-V-L', 'S-E-O-A', 'S-E-O-L',
    'S-O-V-A', 'S-O-V-L', 'S-O-O-A', 'S-O-O-L',
  ];

  const actualCodes = personalities.map(p => p.type_code);

  console.log('Expected codes NOT in database:');
  expectedTypes.forEach(code => {
    if (!actualCodes.includes(code)) {
      console.log(`  ✗ ${code}`);
    }
  });

  console.log('\nActual codes NOT in expected list:');
  actualCodes.forEach(code => {
    if (!expectedTypes.includes(code)) {
      console.log(`  ✗ ${code}`);
    }
  });

  console.log('\n=== CODE FORMAT ANALYSIS ===\n');
  console.log('Format: [Interface]-[Change]-[Decision]-[Execution]');
  console.log('- Interface: U (User) or S (Systems)');
  console.log('- Change: E (Exploratory) or O (Operational)');
  console.log('- Decision: V (Vision) or L (Logic)');
  console.log('- Execution: A (Adaptive) or T (Structured)\n');

  console.log('Note: Focus dimension is a MODIFIER, not part of base type code');
  console.log('32 total types = 16 base types × 2 focus variants (Builder/Analyzer)\n');
}

checkCodes();
