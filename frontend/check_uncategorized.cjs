// Find roles that don't match any specific category
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qpjgeuonakbnhdkmkrhl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwamdldW9uYWtibmhka21rcmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI0MTQsImV4cCI6MjA4NDg2ODQxNH0.8HIXdQeAcjNilHFXNxy0h_Ti8qMqoe8rtbJyGpexC1A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ROLE_CATEGORIES = {
  frontend: {
    keywords: ['frontend', 'web developer', 'react', 'vue', 'angular', 'ui ', 'web3'],
  },
  mobile: {
    keywords: ['mobile', 'ios', 'android', 'flutter', 'react native', 'cross-platform'],
  },
  design: {
    keywords: ['design system', 'accessibility', 'animation', 'graphics', 'ux'],
  },
  backend: {
    keywords: ['backend', 'api engineer', 'microservices', 'protocol'],
  },
  fullstack: {
    keywords: ['full stack', 'fullstack', 'product engineer'],
  },
  infrastructure: {
    keywords: ['devops', 'infrastructure', 'platform engineer', 'sre', 'site reliability', 'kubernetes', 'cloud engineer', 'ci/cd', 'build engineer', 'release engineer'],
  },
  security: {
    keywords: ['security', 'penetration', 'devsecops', 'appsec'],
  },
  database: {
    keywords: ['database', 'dba', 'sql', 'nosql', 'data warehouse', 'etl'],
  },
  dataEngineering: {
    keywords: ['data engineer', 'data pipeline', 'data platform', 'streaming data', 'analytics engineer'],
  },
  dataScience: {
    keywords: ['data scientist', 'ml research', 'research scientist', 'research engineer'],
  },
  mlEngineering: {
    keywords: ['machine learning engineer', 'ml engineer', 'mlops', 'ml platform', 'ai engineer', 'llm engineer', 'generative ai', 'computer vision', 'nlp engineer', 'deep learning'],
  },
  systems: {
    keywords: ['systems engineer', 'systems architect', 'distributed systems', 'real-time systems', 'embedded', 'firmware'],
  },
  qa: {
    keywords: ['qa engineer', 'test', 'sdet', 'quality', 'automation engineer'],
  },
  performance: {
    keywords: ['performance', 'observability', 'reliability engineer', 'monitoring'],
  },
  devex: {
    keywords: ['developer experience', 'devex', 'developer tools', 'sdk engineer', 'build engineer'],
  },
  advocacy: {
    keywords: ['developer advocate', 'developer relations', 'devrel'],
  },
  growth: {
    keywords: ['growth engineer', 'experimentation', 'a/b testing'],
  },
  blockchain: {
    keywords: ['blockchain', 'smart contract', 'web3'],
  },
  game: {
    keywords: ['game', 'unity', 'unreal', 'gameplay'],
  },
  robotics: {
    keywords: ['robotics', 'iot ', 'iot engineer'],
  },
};

function findRoleCategory(roleName) {
  const lowerName = roleName.toLowerCase();
  for (const [categoryName, category] of Object.entries(ROLE_CATEGORIES)) {
    for (const keyword of category.keywords) {
      if (lowerName.includes(keyword.toLowerCase())) {
        return categoryName;
      }
    }
  }
  return 'fullstack'; // default
}

async function checkUncategorized() {
  const { data: roles, error } = await supabase
    .from('tech_roles')
    .select('*');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== ROLE CATEGORIZATION ANALYSIS ===\n');

  const categoryGroups = {};
  roles.forEach(role => {
    const category = findRoleCategory(role.name);
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(role.name);
  });

  // Show categorized roles
  console.log('CATEGORIZED ROLES:\n');
  Object.entries(categoryGroups)
    .filter(([cat]) => cat !== 'fullstack')
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([cat, roles]) => {
      console.log(`${cat} (${roles.length} roles):`);
      roles.forEach(r => console.log(`  - ${r}`));
      console.log();
    });

  // Show uncategorized (defaulting to fullstack)
  console.log('\n=== UNCATEGORIZED (defaulting to fullstack) ===\n');
  if (categoryGroups['fullstack']) {
    categoryGroups['fullstack'].forEach(r => console.log(`  - ${r}`));
    console.log(`\nTotal: ${categoryGroups['fullstack'].length} roles\n`);
  }
}

checkUncategorized();
