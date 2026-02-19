// Scoring algorithm for Tech 16 Personalities Quiz (Supabase version)

/**
 * Calculate quiz progress percentage
 */
export const getQuizProgress = (responses, totalQuestions) => {
  const answeredCount = Object.keys(responses).length;
  return totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
};

/**
 * Calculate spectrum scores from quiz responses
 * Each spectrum is scored 0-100:
 * - 0 represents the "low" end (Builder, User-Facing, Exploratory, Vision-Led, Adaptive)
 * - 100 represents the "high" end (Analyzer, Systems-Facing, Operational, Logic-Led, Structured)
 */
export function calculateScores(responses, questions) {
  // Initialize spectrum tallies
  const spectrumTallies = {
    focus: { total: 0, count: 0 },
    interface: { total: 0, count: 0 },
    change: { total: 0, count: 0 },
    decision: { total: 0, count: 0 },
    execution: { total: 0, count: 0 },
  };

  // Process each response
  questions.forEach((question) => {
    const answer = responses[question.id];
    if (answer === undefined) return;

    const spectrum = question.spectrum;
    let direction = question.direction;

    // Skip if required fields are missing
    if (!spectrum || !direction) return;

    // Skip if spectrum is not recognized
    if (!spectrumTallies[spectrum]) {
      console.warn(`Unknown spectrum: ${spectrum} for question ${question.id}`);
      return;
    }

    // Normalize direction to single letter if it's a full word (from database)
    const directionMap = {
      'builder': 'B',
      'analyzer': 'A',
      'user': 'U',
      'systems': 'S',
      'exploratory': 'E',
      'operational': 'O',
      'vision': 'V',
      'logic': 'L',
      'adaptive': 'A',
      'structured': 'T',
    };

    // Convert full word to letter code if needed
    if (direction.length > 1) {
      direction = directionMap[direction.toLowerCase()] || direction;
    }

    // Determine if this question pushes toward the high end of the spectrum
    // High end: A (Analyzer), S (Systems), O (Operational), L (Logic), T (Structured)
    const isHighDirection = ['A', 'S', 'O', 'L', 'T'].includes(direction);

    // Calculate contribution (0-100 scale)
    // answer is 0-4 (index of selected option)
    let contribution;
    if (isHighDirection) {
      // Agreeing pushes toward high end (100)
      contribution = answer * 25; // 0, 25, 50, 75, 100
    } else {
      // Agreeing pushes toward low end (0)
      contribution = (4 - answer) * 25; // 100, 75, 50, 25, 0
    }

    spectrumTallies[spectrum].total += contribution;
    spectrumTallies[spectrum].count += 1;
  });

  // Calculate average scores for each spectrum
  const scores = {
    focus_score: Math.round(
      spectrumTallies.focus.count > 0
        ? spectrumTallies.focus.total / spectrumTallies.focus.count
        : 50
    ),
    interface_score: Math.round(
      spectrumTallies.interface.count > 0
        ? spectrumTallies.interface.total / spectrumTallies.interface.count
        : 50
    ),
    change_score: Math.round(
      spectrumTallies.change.count > 0
        ? spectrumTallies.change.total / spectrumTallies.change.count
        : 50
    ),
    decision_score: Math.round(
      spectrumTallies.decision.count > 0
        ? spectrumTallies.decision.total / spectrumTallies.decision.count
        : 50
    ),
    execution_score: Math.round(
      spectrumTallies.execution.count > 0
        ? spectrumTallies.execution.total / spectrumTallies.execution.count
        : 50
    ),
  };

  return scores;
}

/**
 * Generate personality type code from spectrum scores
 * Format: [Interface]-[Change]-[Decision]-[Execution]-[Focus]
 * Example: U-E-V-A-B or S-O-L-T-A
 * There are 16 base types (Interface × Change × Decision × Execution)
 * With Focus as the 5th dimension SUFFIX MODIFIER, creating 32 total types
 */
export function generatePersonalityType(scores) {
  // Determine each letter based on which side of 50 the score falls
  // If exactly 50, we need to pick one side - use < 50 to favor low side for true neutrals

  // Core 4-letter type code: Interface-Change-Decision-Execution
  const interface_ = scores.interface_score < 50 ? 'U' : 'S'; // User-Facing vs Systems-Facing
  const change = scores.change_score < 50 ? 'E' : 'O'; // Exploratory vs Operational
  const decision = scores.decision_score < 50 ? 'V' : 'L'; // Vision-Led vs Logic-Led
  const execution = scores.execution_score < 50 ? 'A' : 'T'; // Adaptive vs Structured

  // Focus modifier (5th dimension)
  const focus = scores.focus_score < 50 ? 'B' : 'A'; // Builder vs Analyzer

  // Format: U/S-E/O-V/L-A/T-B/A (e.g., "U-E-V-A-B")
  // The first 4 letters determine the personality type (16 types)
  // The 5th letter (focus) is a modifier that adds nuance
  return `${interface_}-${change}-${decision}-${execution}-${focus}`;
}

/**
 * Get focus tendency (Builder vs Analyzer) as separate metadata
 */
function getFocusTendency(scores) {
  return scores.focus_score < 50 ? 'Builder' : 'Analyzer';
}

/**
 * Get spectrum label for a given score
 */
function getSpectrumLabel(spectrum, score) {
  const labels = {
    focus: {
      low: { label: 'Builder', code: 'B' },
      high: { label: 'Analyzer', code: 'A' },
    },
    interface: {
      low: { label: 'User-Facing', code: 'U' },
      high: { label: 'Systems-Facing', code: 'S' },
    },
    change: {
      low: { label: 'Exploratory', code: 'E' },
      high: { label: 'Operational', code: 'O' },
    },
    decision: {
      low: { label: 'Vision-Led', code: 'V' },
      high: { label: 'Logic-Led', code: 'L' },
    },
    execution: {
      low: { label: 'Adaptive', code: 'A' },
      high: { label: 'Structured', code: 'T' },
    },
  };

  return score < 50 ? labels[spectrum].low : labels[spectrum].high;
}

/**
 * Calculate percentage for display (how strongly you lean toward one side)
 */
function getSpectrumPercentage(score) {
  // Convert 0-100 score to 0-100% leaning
  // Score of 50 = 0% (neutral)
  // Score of 0 or 100 = 100% (strong leaning)
  return Math.abs(score - 50) * 2;
}

/**
 * Get descriptive strength label
 */
function getStrengthLabel(percentage) {
  if (percentage < 10) return 'Balanced';
  if (percentage < 30) return 'Slight';
  if (percentage < 50) return 'Moderate';
  if (percentage < 70) return 'Strong';
  return 'Very Strong';
}

/**
 * Get base personality type (4-letter code) for profile lookup
 * Removes the Focus suffix to match the 16 base personality profiles
 * The focus dimension (Builder/Analyzer) is a modifier, not a base type
 *
 * Format: Interface-Change-Decision-Execution(-Focus)
 * Example: U-E-V-A-B -> U-E-V-A
 * Example: U-E-V-A -> U-E-V-A (already base code)
 */
export function getBasePersonalityType(fullTypeCode) {
  const parts = fullTypeCode.split('-');
  // Return first 4 parts (Interface-Change-Decision-Execution), exclude Focus suffix if present
  return parts.slice(0, 4).join('-');
}

/**
 * Generate approximate scores from a personality type code
 * This reverse-engineers the scoring logic to create representative scores
 * Used for displaying role matches on personality type detail pages
 *
 * @param {string} typeCode - 4-letter base type code (e.g., "U-E-V-A") or 5-letter with focus (e.g., "U-E-V-A-B")
 * @returns {Object} Scores object with all 5 dimensions
 */
export function generateScoresFromType(typeCode) {
  const parts = typeCode.split('-');
  // Format: Interface-Change-Decision-Execution(-Focus optional)
  // U-E-V-A or U-E-V-A-B
  const [interface_, change, decision, execution, focus] = parts;

  // Generate scores that would produce this type code
  // Low side (U/E/V/A/B) → 30 (clearly < 50)
  // High side (S/O/L/T/A) → 70 (clearly > 50)
  const scores = {
    interface_score: interface_ === 'U' ? 30 : 70,  // U (User-facing) vs S (Systems)
    change_score: change === 'E' ? 30 : 70,         // E (Exploratory) vs O (Operational)
    decision_score: decision === 'V' ? 30 : 70,     // V (Vision-led) vs L (Logic-led)
    execution_score: execution === 'A' ? 30 : 70,   // A (Adaptive) vs T (Structured)
    focus_score: focus === 'B' ? 30 : focus === 'A' ? 70 : 50, // B (Builder) vs A (Analyzer), default neutral (50) if missing
  };

  return scores;
}
