// Scoring algorithm for Tech 16 Personalities Quiz
import { QuizResponse, QuizQuestion, SpectrumScores, SpectrumType } from '@/types';

/**
 * Calculate spectrum scores from quiz responses
 * Each spectrum is scored 0-100:
 * - 0 represents the "low" end (Builder, User-Facing, Exploratory, Vision-Led, Adaptive)
 * - 100 represents the "high" end (Analyzer, Systems-Facing, Operational, Logic-Led, Structured)
 */
export function calculateScores(
  responses: QuizResponse[],
  questions: QuizQuestion[]
): SpectrumScores {
  // Initialize spectrum tallies
  const spectrumTallies: Record<SpectrumType, { total: number; count: number }> = {
    focus: { total: 0, count: 0 },
    interface: { total: 0, count: 0 },
    change: { total: 0, count: 0 },
    decision: { total: 0, count: 0 },
    execution: { total: 0, count: 0 },
  };

  // Process each response
  responses.forEach((response) => {
    const question = questions.find((q) => q.id === response.questionId);
    if (!question) return;

    const spectrum = question.spectrum;
    const direction = question.direction;

    // Skip if required fields are missing
    if (!spectrum || !direction) return;

    // Map answer (0-4) to a score contribution
    // 0 = Strongly Disagree, 1 = Disagree, 2 = Neutral, 3 = Agree, 4 = Strongly Agree
    const answerValue = response.answer;

    // Determine if this question pushes toward the high end of the spectrum
    const isHighDirection = [
      'analyzer',
      'systems',
      'operational',
      'logic',
      'structured',
    ].includes(direction);

    // Calculate contribution (0-100 scale)
    let contribution: number;
    if (isHighDirection) {
      // Agreeing pushes toward high end (100)
      contribution = answerValue * 25; // 0, 25, 50, 75, 100
    } else {
      // Agreeing pushes toward low end (0)
      contribution = (4 - answerValue) * 25; // 100, 75, 50, 25, 0
    }

    spectrumTallies[spectrum].total += contribution;
    spectrumTallies[spectrum].count += 1;
  });

  // Calculate average scores for each spectrum
  const scores: SpectrumScores = {
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
 * Format: [Focus]-[Interface]-[Change]-[Decision]-[Suffix]
 * Example: B-U-E-V-A
 */
export function generatePersonalityType(scores: SpectrumScores): string {
  // Determine each letter based on which side of 50 the score falls
  const focus = scores.focus_score < 50 ? 'B' : 'A'; // Builder vs Analyzer
  const interface_ = scores.interface_score < 50 ? 'U' : 'S'; // User-Facing vs Systems-Facing
  const change = scores.change_score < 50 ? 'E' : 'O'; // Exploratory vs Operational
  const decision = scores.decision_score < 50 ? 'V' : 'L'; // Vision-Led vs Logic-Led
  const suffix = scores.execution_score < 50 ? 'A' : 'T'; // Adaptive vs Structured

  return `${focus}-${interface_}-${change}-${decision}-${suffix}`;
}

/**
 * Validate quiz responses
 */
export function validateResponses(
  responses: QuizResponse[],
  expectedQuestionCount: number
): { valid: boolean; error?: string } {
  if (responses.length !== expectedQuestionCount) {
    return {
      valid: false,
      error: `Expected ${expectedQuestionCount} responses, got ${responses.length}`,
    };
  }

  for (const response of responses) {
    if (typeof response.questionId !== 'number' || response.questionId < 1) {
      return { valid: false, error: 'Invalid question ID' };
    }
    if (
      typeof response.answer !== 'number' ||
      response.answer < 0 ||
      response.answer > 4
    ) {
      return { valid: false, error: 'Answer must be between 0 and 4' };
    }
  }

  return { valid: true };
}

/**
 * Get spectrum label for a given score
 */
export function getSpectrumLabel(
  spectrum: SpectrumType,
  score: number
): { label: string; code: string } {
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
export function getSpectrumPercentage(score: number): number {
  // Convert 0-100 score to 0-100% leaning
  // Score of 50 = 0% (neutral)
  // Score of 0 or 100 = 100% (strong leaning)
  return Math.abs(score - 50) * 2;
}

/**
 * Get descriptive strength label
 */
export function getStrengthLabel(percentage: number): string {
  if (percentage < 10) return 'Balanced';
  if (percentage < 30) return 'Slight';
  if (percentage < 50) return 'Moderate';
  if (percentage < 70) return 'Strong';
  return 'Very Strong';
}
