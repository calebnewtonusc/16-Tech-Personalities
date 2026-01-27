// Check question distribution by spectrum and direction
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkQuestions() {
  // Fetch quiz version 1
  const { data, error } = await supabase
    .from('quiz_versions')
    .select('questions')
    .eq('version', 1)
    .single();

  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }

  const questions = data.questions;

  // Count by spectrum and direction
  const distribution = {};

  questions.forEach(q => {
    const key = `${q.spectrum}-${q.direction}`;
    if (!distribution[key]) {
      distribution[key] = { spectrum: q.spectrum, direction: q.direction, count: 0, questions: [] };
    }
    distribution[key].count++;
    distribution[key].questions.push(q.id);
  });

  console.log('\nQuestion Distribution by Spectrum and Direction:');
  console.log('================================================\n');

  // Group by spectrum
  const spectrums = ['focus', 'interface', 'change', 'decision', 'execution'];

  spectrums.forEach(spectrum => {
    console.log(`\n${spectrum.toUpperCase()}:`);
    const spectrumData = Object.values(distribution).filter(d => d.spectrum === spectrum);
    spectrumData.forEach(d => {
      console.log(`  ${d.direction}: ${d.count} questions (IDs: ${d.questions.join(', ')})`);
    });
  });

  console.log('\n\nPROBLEM ANALYSIS:');
  console.log('================\n');

  spectrums.forEach(spectrum => {
    const spectrumData = Object.values(distribution).filter(d => d.spectrum === spectrum);
    if (spectrumData.length > 1) {
      console.log(`⚠️  ${spectrum}: Has ${spectrumData.length} different directions - questions alternate!`);
      spectrumData.forEach(d => {
        console.log(`    - ${d.direction}: ${d.count} questions`);
      });
    } else if (spectrumData.length === 1) {
      console.log(`✓  ${spectrum}: All ${spectrumData[0].count} questions point to ${spectrumData[0].direction} (consistent)`);
    }
  });
}

checkQuestions();
