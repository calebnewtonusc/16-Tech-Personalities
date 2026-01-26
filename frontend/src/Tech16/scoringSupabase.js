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
    changeStyle: { total: 0, count: 0 },
    decisionDriver: { total: 0, count: 0 },
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
      spectrumTallies.changeStyle.count > 0
        ? spectrumTallies.changeStyle.total / spectrumTallies.changeStyle.count
        : 50
    ),
    decision_score: Math.round(
      spectrumTallies.decisionDriver.count > 0
        ? spectrumTallies.decisionDriver.total / spectrumTallies.decisionDriver.count
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
 * Format: [Focus]-[Interface]-[Change]-[Decision]-[Execution]
 * Example: B-U-E-V-A or A-S-O-L-T
 * There are 16 base types (Focus × Interface × Change × Decision)
 * With Execution as the 5th dimension suffix, creating 32 total types
 */
export function generatePersonalityType(scores) {
  // Determine each letter based on which side of 50 the score falls
  const focus = scores.focus_score < 50 ? 'B' : 'A'; // Builder vs Analyzer
  const interface_ = scores.interface_score < 50 ? 'U' : 'S'; // User-Facing vs Systems-Facing
  const change = scores.change_score < 50 ? 'E' : 'O'; // Exploratory vs Operational
  const decision = scores.decision_score < 50 ? 'V' : 'L'; // Vision-Led vs Logic-Led
  const execution = scores.execution_score < 50 ? 'A' : 'T'; // Adaptive vs Structured

  return `${focus}-${interface_}-${change}-${decision}-${execution}`;
}

/**
 * Get focus tendency (Builder vs Analyzer) as separate metadata
 */
export function getFocusTendency(scores) {
  return scores.focus_score < 50 ? 'Builder' : 'Analyzer';
}

/**
 * Get spectrum label for a given score
 */
export function getSpectrumLabel(spectrum, score) {
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
export function getSpectrumPercentage(score) {
  // Convert 0-100 score to 0-100% leaning
  // Score of 50 = 0% (neutral)
  // Score of 0 or 100 = 100% (strong leaning)
  return Math.abs(score - 50) * 2;
}

/**
 * Get descriptive strength label
 */
export function getStrengthLabel(percentage) {
  if (percentage < 10) return 'Balanced';
  if (percentage < 30) return 'Slight';
  if (percentage < 50) return 'Moderate';
  if (percentage < 70) return 'Strong';
  return 'Very Strong';
}

/**
 * Get base personality type (4-letter code) for profile lookup
 * Removes the Execution suffix to match the 16 base personality profiles in the database
 * Example: B-U-E-V-A -> B-U-E-V
 */
export function getBasePersonalityType(fullTypeCode) {
  const parts = fullTypeCode.split('-');
  // Return first 4 parts (Focus-Interface-Change-Decision)
  return parts.slice(0, 4).join('-');
}
