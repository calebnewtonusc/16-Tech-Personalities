// Scoring engine for Tech 16 Personalities
// Converts Likert scale responses (1-5) to personality type codes

import { questions, spectrums } from './data/questions';

/**
 * Calculate scores for each dimension
 * @param {Object} responses - Map of questionId -> rating (1-5)
 * @returns {Object} Scores for each spectrum
 */
export const calculateScores = (responses) => {
  const scores = {
    focus: { left: 0, right: 0 },
    interface: { left: 0, right: 0 },
    changeStyle: { left: 0, right: 0 },
    decisionDriver: { left: 0, right: 0 },
    execution: { left: 0, right: 0 },
  };

  questions.forEach((question) => {
    const response = responses[question.id];
    if (!response) return;

    const spectrum = question.spectrum;
    const direction = question.direction;

    // Likert scale: 1 = Strongly Disagree, 5 = Strongly Agree
    // Convert to points: 1=-2, 2=-1, 3=0, 4=1, 5=2
    const points = response - 3;

    // Determine which pole of the spectrum (based on question direction)
    const leftPole = spectrums[spectrum].poles.leftCode;
    const rightPole = spectrums[spectrum].poles.rightCode;

    if (direction === leftPole) {
      // Agreement with this question favors left pole
      scores[spectrum].left += points;
    } else {
      // Agreement with this question favors right pole
      scores[spectrum].right += points;
    }
  });

  return scores;
};

/**
 * Convert raw scores to percentages (0-100 for each pole)
 * @param {Object} scores - Raw scores from calculateScores
 * @returns {Object} Percentage scores for each spectrum
 */
export const calculatePercentages = (scores) => {
  const percentages = {};

  Object.keys(scores).forEach((spectrum) => {
    const { left, right } = scores[spectrum];
    const total = Math.abs(left) + Math.abs(right);

    if (total === 0) {
      // Neutral - 50/50
      percentages[spectrum] = {
        left: 50,
        right: 50,
      };
    } else {
      // Calculate percentages
      const leftPercent = ((left + total / 2) / total) * 100;
      const rightPercent = 100 - leftPercent;

      percentages[spectrum] = {
        left: Math.round(leftPercent),
        right: Math.round(rightPercent),
      };
    }
  });

  return percentages;
};

/**
 * Determine personality type code based on scores
 * @param {Object} scores - Raw scores from calculateScores
 * @returns {String} 4-letter personality code (e.g., "B-U-E-V")
 */
export const determinePersonalityType = (scores) => {
  const codes = [];

  // First 4 dimensions go into the code
  const dimensions = ['focus', 'interface', 'changeStyle', 'decisionDriver'];

  dimensions.forEach((spectrum) => {
    const { left, right } = scores[spectrum];
    const leftCode = spectrums[spectrum].poles.leftCode;
    const rightCode = spectrums[spectrum].poles.rightCode;

    // If scores are tied, default to left (arbitrary choice for consistency)
    const code = left >= right ? leftCode : rightCode;
    codes.push(code);
  });

  // 5th dimension (execution) is the suffix
  const executionLeft = scores.execution.left;
  const executionRight = scores.execution.right;
  const executionCode = executionLeft >= executionRight
    ? spectrums.execution.poles.leftCode
    : spectrums.execution.poles.rightCode;

  // Return as hyphenated code (e.g., "B-U-E-V-A")
  return `${codes.join('-')}-${executionCode}`;
};

/**
 * Get 4-letter code without suffix (for personality lookup)
 * @param {String} fullCode - Full 5-letter code
 * @returns {String} 4-letter code
 */
export const getFourLetterCode = (fullCode) => {
  const parts = fullCode.split('-');
  return parts.slice(0, 4).join('-');
};

/**
 * Calculate full results
 * @param {Object} responses - Map of questionId -> rating (1-5)
 * @returns {Object} Complete results including type, percentages, and raw scores
 */
export const calculateResults = (responses) => {
  const rawScores = calculateScores(responses);
  const percentages = calculatePercentages(rawScores);
  const fullTypeCode = determinePersonalityType(rawScores);
  const personalityCode = getFourLetterCode(fullTypeCode);

  return {
    personalityCode,
    fullTypeCode,
    percentages,
    rawScores,
    spectrumBreakdown: Object.keys(spectrums).map((spectrum) => {
      const { left, right } = percentages[spectrum];
      const leftPole = spectrums[spectrum].poles.left;
      const rightPole = spectrums[spectrum].poles.right;
      const leftCode = spectrums[spectrum].poles.leftCode;
      const rightCode = spectrums[spectrum].poles.rightCode;

      return {
        spectrum,
        name: spectrums[spectrum].name,
        leftPole,
        rightPole,
        leftCode,
        rightCode,
        leftPercent: left,
        rightPercent: right,
        dominantPole: left >= right ? leftPole : rightPole,
        dominantCode: left >= right ? leftCode : rightCode,
        dominantPercent: Math.max(left, right),
      };
    }),
  };
};

/**
 * Validate that all questions are answered
 * @param {Object} responses - Map of questionId -> rating
 * @returns {Boolean} True if all questions answered
 */
export const isQuizComplete = (responses) => {
  return questions.every((q) => responses[q.id] !== undefined && responses[q.id] !== null);
};

/**
 * Get quiz progress percentage
 * @param {Object} responses - Map of questionId -> rating
 * @returns {Number} Percentage (0-100)
 */
export const getQuizProgress = (responses) => {
  const answeredCount = questions.filter((q) => responses[q.id] !== undefined && responses[q.id] !== null).length;
  return Math.round((answeredCount / questions.length) * 100);
};

/**
 * Get unanswered question IDs
 * @param {Object} responses - Map of questionId -> rating
 * @returns {Array} Array of question IDs
 */
export const getUnansweredQuestions = (responses) => {
  return questions
    .filter((q) => responses[q.id] === undefined || responses[q.id] === null)
    .map((q) => q.id);
};
