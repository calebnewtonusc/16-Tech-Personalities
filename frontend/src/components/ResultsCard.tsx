'use client';

import { ResultsCardProps } from '@/types';
import RadarChart from './RadarChart';
import { Award, Sparkles } from 'lucide-react';

export default function ResultsCard({
  result,
  profile,
  topRole,
}: ResultsCardProps) {
  return (
    <div
      id="results-card"
      className="bg-gradient-to-br from-primary-50 to-white dark:from-secondary-900 dark:to-secondary-800 rounded-2xl p-8 max-w-2xl mx-auto border-2 border-primary-200 dark:border-primary-800"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-primary-500" />
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white">
            {result.personality_type}
          </h1>
        </div>
        <h2 className="text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
          {profile.name}
        </h2>
        <p className="text-secondary-700 dark:text-secondary-300 max-w-lg mx-auto">
          {profile.description}
        </p>
      </div>

      {/* Radar Chart */}
      <div className="mb-8 bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-md">
        <RadarChart scores={result} height={300} />
      </div>

      {/* Key Traits */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-3">
          Top Strengths
        </h3>
        <div className="space-y-2">
          {profile.strengths.slice(0, 3).map((strength, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-secondary-700 dark:text-secondary-300"
            >
              <span className="text-primary-500 mt-1">✓</span>
              <span className="text-sm">{strength}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Role Recommendation */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5" />
          <h3 className="text-lg font-bold">Top Career Match</h3>
        </div>
        <h4 className="text-2xl font-bold mb-2">{topRole.role.name}</h4>
        <p className="text-primary-100 text-sm mb-3">
          {topRole.fitScore}% compatibility
        </p>
        <p className="text-sm text-white/90">{topRole.matchReason}</p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-secondary-500 dark:text-secondary-400">
          Tech 16 Personalities • Discover Your Tech Type
        </p>
      </div>
    </div>
  );
}
