// Role mapping and recommendation logic
import {
  TechRole,
  RoleScoringWeight,
  RoleRecommendation,
  SpectrumScores,
} from '@/types';
import { createClient } from './supabase';

/**
 * Get top role recommendations based on personality type and scores
 */
export async function getRoleRecommendations(
  personalityType: string,
  scores: SpectrumScores,
  limit: number = 3
): Promise<RoleRecommendation[]> {
  const supabase = createClient();

  try {
    // Fetch all roles with their weights for this personality type
    const { data: weights, error: weightsError } = await supabase
      .from('role_scoring_weights')
      .select('role_id, weight')
      .eq('personality_type', personalityType)
      .order('weight', { ascending: false });

    if (weightsError) throw weightsError;
    if (!weights || weights.length === 0) {
      return [];
    }

    // Fetch role details for the top weighted roles
    const roleIds = weights.map((w) => w.role_id);
    const { data: roles, error: rolesError } = await supabase
      .from('tech_roles')
      .select('*')
      .in('id', roleIds);

    if (rolesError) throw rolesError;
    if (!roles) return [];

    // Create role map for easy lookup
    const roleMap = new Map<string, TechRole>(
      roles.map((role) => [role.id, role])
    );

    // Calculate recommendations
    const recommendations: RoleRecommendation[] = weights
      .map((weight) => {
        const role = roleMap.get(weight.role_id);
        if (!role) return null;

        // Calculate fit score (convert weight to percentage)
        const baseFitScore = weight.weight * 100;

        // Apply score modifiers based on spectrum scores
        const modifiedFitScore = applyScoreModifiers(
          baseFitScore,
          role,
          scores
        );

        // Generate match reason
        const matchReason = generateMatchReason(role, personalityType, scores);

        return {
          role,
          fitScore: Math.round(modifiedFitScore),
          matchReason,
        };
      })
      .filter((rec): rec is RoleRecommendation => rec !== null)
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, limit);

    return recommendations;
  } catch (error) {
    console.error('Error getting role recommendations:', error);
    return [];
  }
}

/**
 * Apply modifiers to base fit score based on spectrum scores
 */
function applyScoreModifiers(
  baseFitScore: number,
  role: TechRole,
  scores: SpectrumScores
): number {
  let modifiedScore = baseFitScore;

  // Role-specific modifiers based on spectrum scores
  const roleName = role.name.toLowerCase();

  // Frontend/UI roles benefit from User-Facing score
  if (
    roleName.includes('frontend') ||
    roleName.includes('ui') ||
    roleName.includes('ux')
  ) {
    const userFacingBonus = (50 - scores.interface_score) / 10; // Max +5% bonus
    modifiedScore += userFacingBonus;
  }

  // Backend/Infrastructure roles benefit from Systems-Facing score
  if (
    roleName.includes('backend') ||
    roleName.includes('infrastructure') ||
    roleName.includes('devops') ||
    roleName.includes('sre')
  ) {
    const systemsFacingBonus = (scores.interface_score - 50) / 10; // Max +5% bonus
    modifiedScore += systemsFacingBonus;
  }

  // Innovation-focused roles benefit from Exploratory score
  if (
    roleName.includes('architect') ||
    roleName.includes('machine learning') ||
    roleName.includes('product')
  ) {
    const exploratoryBonus = (50 - scores.change_score) / 10; // Max +5% bonus
    modifiedScore += exploratoryBonus;
  }

  // Operational roles benefit from Operational score
  if (
    roleName.includes('sre') ||
    roleName.includes('database') ||
    roleName.includes('qa')
  ) {
    const operationalBonus = (scores.change_score - 50) / 10; // Max +5% bonus
    modifiedScore += operationalBonus;
  }

  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, modifiedScore));
}

/**
 * Generate a personalized match reason
 */
function generateMatchReason(
  role: TechRole,
  personalityType: string,
  scores: SpectrumScores
): string {
  const reasons: string[] = [];

  // Get dominant traits
  const traits = {
    focus: scores.focus_score < 50 ? 'builder' : 'analyzer',
    interface: scores.interface_score < 50 ? 'user-facing' : 'systems-facing',
    change: scores.change_score < 50 ? 'exploratory' : 'operational',
    decision: scores.decision_score < 50 ? 'vision-led' : 'logic-led',
    execution: scores.execution_score < 50 ? 'adaptive' : 'structured',
  };

  const roleName = role.name.toLowerCase();

  // Generate reasons based on role and traits
  if (roleName.includes('frontend') || roleName.includes('ui')) {
    if (traits.focus === 'builder') {
      reasons.push('Your builder mindset excels at rapid UI prototyping');
    }
    if (traits.interface === 'user-facing') {
      reasons.push('Your user-facing focus aligns perfectly with frontend work');
    }
  }

  if (roleName.includes('backend') || roleName.includes('infrastructure')) {
    if (traits.interface === 'systems-facing') {
      reasons.push('Your systems-facing approach is ideal for backend architecture');
    }
    if (traits.decision === 'logic-led') {
      reasons.push('Your logic-driven decisions suit technical infrastructure work');
    }
  }

  if (roleName.includes('full-stack')) {
    if (traits.focus === 'builder') {
      reasons.push('Your ability to build quickly suits full-stack development');
    }
    if (traits.execution === 'adaptive') {
      reasons.push('Your adaptive execution style thrives in full-stack environments');
    }
  }

  if (roleName.includes('product')) {
    if (traits.decision === 'vision-led') {
      reasons.push('Your vision-led approach is essential for product management');
    }
    if (traits.interface === 'user-facing') {
      reasons.push('Your user focus drives great product decisions');
    }
  }

  if (roleName.includes('architect')) {
    if (traits.focus === 'analyzer') {
      reasons.push('Your analytical mindset is perfect for architecture design');
    }
    if (traits.execution === 'structured') {
      reasons.push('Your structured approach ensures robust system design');
    }
  }

  if (roleName.includes('devops') || roleName.includes('sre')) {
    if (traits.change === 'operational') {
      reasons.push('Your operational focus ensures reliable systems');
    }
    if (traits.execution === 'structured') {
      reasons.push('Your structured execution prevents outages');
    }
  }

  // Default reason if no specific matches
  if (reasons.length === 0) {
    reasons.push(`Your ${personalityType} type shows strong compatibility with this role`);
  }

  return reasons[0]; // Return the first (most relevant) reason
}

/**
 * Calculate compatibility score between two personality types
 */
export function calculateCompatibility(
  scores1: SpectrumScores,
  scores2: SpectrumScores
): number {
  // Calculate average difference across all spectrums
  const differences = [
    Math.abs(scores1.focus_score - scores2.focus_score),
    Math.abs(scores1.interface_score - scores2.interface_score),
    Math.abs(scores1.change_score - scores2.change_score),
    Math.abs(scores1.decision_score - scores2.decision_score),
    Math.abs(scores1.execution_score - scores2.execution_score),
  ];

  const averageDifference =
    differences.reduce((a, b) => a + b, 0) / differences.length;

  // Convert to compatibility score (0-100, where 100 is most compatible)
  // Max difference is 100, so we invert it
  const compatibilityScore = 100 - averageDifference;

  return Math.round(compatibilityScore);
}

/**
 * Get similarities and differences between two results
 */
export function getComparisonInsights(
  scores1: SpectrumScores,
  scores2: SpectrumScores
): { similarities: string[]; differences: string[] } {
  const similarities: string[] = [];
  const differences: string[] = [];

  const spectrums = [
    { key: 'focus_score', name: 'Focus', low: 'Builder', high: 'Analyzer' },
    {
      key: 'interface_score',
      name: 'Interface',
      low: 'User-Facing',
      high: 'Systems-Facing',
    },
    {
      key: 'change_score',
      name: 'Change Style',
      low: 'Exploratory',
      high: 'Operational',
    },
    {
      key: 'decision_score',
      name: 'Decision Driver',
      low: 'Vision-Led',
      high: 'Logic-Led',
    },
    {
      key: 'execution_score',
      name: 'Execution',
      low: 'Adaptive',
      high: 'Structured',
    },
  ] as const;

  spectrums.forEach((spectrum) => {
    const score1 = scores1[spectrum.key];
    const score2 = scores2[spectrum.key];
    const difference = Math.abs(score1 - score2);

    if (difference < 20) {
      // Similar scores
      const side1 = score1 < 50 ? spectrum.low : spectrum.high;
      const side2 = score2 < 50 ? spectrum.low : spectrum.high;

      if (side1 === side2) {
        similarities.push(
          `Both lean toward ${side1} in ${spectrum.name}`
        );
      } else {
        similarities.push(
          `Both have balanced ${spectrum.name} preferences`
        );
      }
    } else {
      // Different scores
      const side1 = score1 < 50 ? spectrum.low : spectrum.high;
      const side2 = score2 < 50 ? spectrum.low : spectrum.high;

      differences.push(
        `Person 1 is more ${side1}, Person 2 is more ${side2}`
      );
    }
  });

  return { similarities, differences };
}
