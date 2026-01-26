// Tech 16 Color Theme System
// Inspired by 16 Personalities' color-coded approach

// Color palettes for the 4 personality categories (based on Interface × Scope)
export const categoryColorPalettes = {
  // Innovators: User-Facing + Exploratory
  innovators: {
    primary: '#9b59b6', // Purple
    light: '#c39bd3',
    lighter: '#e8daef',
    dark: '#7d3c98',
  },
  // Crafters: User-Facing + Operational
  crafters: {
    primary: '#27ae60', // Teal Green (keeping distinct from blue)
    light: '#52be80',
    lighter: '#d5f4e6',
    dark: '#1e8449',
  },
  // Architects: Systems-Facing + Exploratory
  architects: {
    primary: '#3498db', // Blue
    light: '#5dade2',
    lighter: '#d6eaf8',
    dark: '#2471a3',
  },
  // Engineers: Systems-Facing + Operational
  engineers: {
    primary: '#e67e22', // Orange
    light: '#eb984e',
    lighter: '#fae5d3',
    dark: '#af601a',
  },
};

// Legacy dimension-based colors (kept for backward compatibility)
export const personalityColors = {
  'U': categoryColorPalettes.innovators, // User-Facing defaults to purple
  'S': categoryColorPalettes.architects,  // Systems-Facing defaults to blue
  'A': categoryColorPalettes.crafters,    // Adaptive -> green
  'T': categoryColorPalettes.engineers,   // Structured -> orange
};

// Get color scheme based on personality type code (using category)
export function getPersonalityColor(typeCode) {
  if (!typeCode) return categoryColorPalettes.innovators;

  const parts = typeCode.split('-');
  const interfaceDimension = parts[1]; // U or S
  const scopeDimension = parts[2]; // E or O

  // Determine category based on Interface × Scope
  if (interfaceDimension === 'U' && scopeDimension === 'E') {
    return categoryColorPalettes.innovators; // Purple
  } else if (interfaceDimension === 'U' && scopeDimension === 'O') {
    return categoryColorPalettes.crafters; // Green
  } else if (interfaceDimension === 'S' && scopeDimension === 'E') {
    return categoryColorPalettes.architects; // Blue
  } else if (interfaceDimension === 'S' && scopeDimension === 'O') {
    return categoryColorPalettes.engineers; // Orange
  }

  return categoryColorPalettes.innovators; // Default
}

// Get accent color based on execution style (5th letter)
export function getAccentColor(typeCode) {
  if (!typeCode) return personalityColors['A'];

  const executionDimension = typeCode.split('-')[4];
  return personalityColors[executionDimension] || personalityColors['A'];
}

// Role category colors
export const roleCategoryColors = {
  frontend: {
    primary: '#9b59b6',
    gradient: 'linear-gradient(135deg, #9b59b6, #c39bd3)',
  },
  backend: {
    primary: '#3498db',
    gradient: 'linear-gradient(135deg, #3498db, #5dade2)',
  },
  fullstack: {
    primary: '#16a085',
    gradient: 'linear-gradient(135deg, #16a085, #48c9b0)',
  },
  infrastructure: {
    primary: '#e67e22',
    gradient: 'linear-gradient(135deg, #e67e22, #eb984e)',
  },
  data: {
    primary: '#e74c3c',
    gradient: 'linear-gradient(135deg, #e74c3c, #ec7063)',
  },
  product: {
    primary: '#f39c12',
    gradient: 'linear-gradient(135deg, #f39c12, #f5b041)',
  },
};

// Get role color based on role name
export function getRoleColor(roleName) {
  const name = roleName.toLowerCase();

  if (name.includes('frontend') || name.includes('ui') || name.includes('ux')) {
    return roleCategoryColors.frontend;
  }
  if (name.includes('backend') || name.includes('api') || name.includes('server')) {
    return roleCategoryColors.backend;
  }
  if (name.includes('full') || name.includes('fullstack') || name.includes('full-stack')) {
    return roleCategoryColors.fullstack;
  }
  if (name.includes('devops') || name.includes('infrastructure') || name.includes('sre') || name.includes('cloud')) {
    return roleCategoryColors.infrastructure;
  }
  if (name.includes('data') || name.includes('ml') || name.includes('machine learning') || name.includes('ai')) {
    return roleCategoryColors.data;
  }
  if (name.includes('product') || name.includes('design') || name.includes('mobile')) {
    return roleCategoryColors.product;
  }

  return roleCategoryColors.fullstack; // default
}

// Convert 5-letter type code to 4-letter display code (removes Execution modifier)
// The 4 letters are: Focus-Interface-Change-Decision
// The 5th letter (Execution: A/T) is the modifier that gets excluded
export function getDisplayTypeCode(fullTypeCode) {
  if (!fullTypeCode) return '';

  // Split on dashes: ['B', 'U', 'E', 'V', 'A']
  const parts = fullTypeCode.split('-');

  // Return first 4 letters (exclude 5th Execution modifier): 'B-U-E-V'
  return parts.slice(0, 4).join('-');
}

// Personality categories - groups of 4 types based on Interface × Scope
// Inspired by 16 Personalities' 4-category system
export const personalityCategories = {
  innovators: {
    name: 'Innovators',
    description: 'User-Facing (U) and Exploratory (E) personality types, known for exploring new user experiences and cutting-edge frontend technologies.',
    color: '#9b59b6', // Purple
    gradient: 'linear-gradient(135deg, #9b59b6, #c39bd3)',
    filter: { interface: 'U', scope: 'E' },
  },
  crafters: {
    name: 'Crafters',
    description: 'User-Facing (U) and Operational (O) personality types, known for building polished, production-ready user experiences.',
    color: '#27ae60', // Teal Green
    gradient: 'linear-gradient(135deg, #27ae60, #52be80)',
    filter: { interface: 'U', scope: 'O' },
  },
  architects: {
    name: 'Architects',
    description: 'Systems-Facing (S) and Exploratory (E) personality types, known for designing innovative architectures and platform solutions.',
    color: '#3498db', // Blue
    gradient: 'linear-gradient(135deg, #3498db, #5dade2)',
    filter: { interface: 'S', scope: 'E' },
  },
  engineers: {
    name: 'Engineers',
    description: 'Systems-Facing (S) and Operational (O) personality types, known for building reliable infrastructure and scalable systems.',
    color: '#e67e22', // Orange
    gradient: 'linear-gradient(135deg, #e67e22, #eb984e)',
    filter: { interface: 'S', scope: 'O' },
  },
};

// Get personality category based on type code
export function getPersonalityCategory(typeCode) {
  if (!typeCode) return null;

  const parts = typeCode.split('-');
  const interfaceDimension = parts[1]; // U or S
  const scopeDimension = parts[2]; // E or O

  // Find matching category
  for (const [key, category] of Object.entries(personalityCategories)) {
    if (
      category.filter.interface === interfaceDimension &&
      category.filter.scope === scopeDimension
    ) {
      return { key, ...category };
    }
  }

  return null;
}

// Letter colors for the 10 distinct dimension values
export const letterColors = {
  // Focus dimension (Position 1)
  B: '#00bcd4', // Bright Cyan - Builder
  A_FOCUS: '#7b1fa2', // Deep Purple - Analyzer (Focus)
  // Interface dimension (Position 2)
  U: '#2196f3', // Bright Blue - User-Facing
  S: '#37474f', // Dark Slate Gray - Systems-Facing
  // Change/Scope dimension (Position 3)
  E: '#4caf50', // Bright Green - Exploratory
  O: '#795548', // Brown - Operational
  // Decision dimension (Position 4)
  V: '#e91e63', // Hot Pink/Magenta - Vision-Led
  L: '#c62828', // Deep Red - Logic-Led
  // Execution dimension (Position 5)
  A_EXEC: '#ff9800', // Bright Orange - Adaptive (Execution)
  T: '#5d4037', // Dark Brown - Structured
};

// Get color for a specific letter at a given position in the personality code
// Position: 0=Focus, 1=Interface, 2=Change, 3=Decision, 4=Execution
export function getLetterColor(letter, position) {
  if (letter === 'A') {
    // A can be either Focus (position 0) or Execution (position 4)
    return position === 0 ? letterColors.A_FOCUS : letterColors.A_EXEC;
  }

  // For all other letters, use the direct mapping
  const colorMap = {
    B: letterColors.B,
    U: letterColors.U,
    S: letterColors.S,
    E: letterColors.E,
    O: letterColors.O,
    V: letterColors.V,
    L: letterColors.L,
    T: letterColors.T,
  };

  return colorMap[letter] || '#333333';
}
