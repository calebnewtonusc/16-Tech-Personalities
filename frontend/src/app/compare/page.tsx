'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import RadarChart from '@/components/RadarChart';
import { QuizResult, PersonalityProfile, ComparisonData } from '@/types';
import { createClient } from '@/lib/supabase';
import { calculateCompatibility, getComparisonInsights } from '@/lib/roleMapping';
import { Users, CheckCircle2, XCircle } from 'lucide-react';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const id1 = searchParams.get('id1');
  const id2 = searchParams.get('id2');

  const [result1, setResult1] = useState<QuizResult | null>(null);
  const [result2, setResult2] = useState<QuizResult | null>(null);
  const [profile1, setProfile1] = useState<PersonalityProfile | null>(null);
  const [profile2, setProfile2] = useState<PersonalityProfile | null>(null);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputId, setInputId] = useState('');

  useEffect(() => {
    async function loadResults() {
      if (!id1) {
        setLoading(false);
        return;
      }

      const supabase = createClient();

      // Load first result
      const { data: r1 } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('id', id1)
        .single();

      let p1Data = null;
      let p2Data = null;

      if (r1) {
        setResult1(r1);
        const { data: p1 } = await supabase
          .from('personality_profiles')
          .select('*')
          .eq('type_code', r1.personality_type)
          .single();
        if (p1) {
          setProfile1(p1);
          p1Data = p1;
        }
      }

      // Load second result if provided
      if (id2) {
        const { data: r2 } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('id', id2)
          .single();

        if (r2) {
          setResult2(r2);
          const { data: p2 } = await supabase
            .from('personality_profiles')
            .select('*')
            .eq('type_code', r2.personality_type)
            .single();
          if (p2) {
            setProfile2(p2);
            p2Data = p2;
          }

          // Generate comparison
          if (r1 && p1Data && p2Data) {
            const compatScore = calculateCompatibility(r1, r2);
            const insights = getComparisonInsights(r1, r2);
            setComparison({
              result1: r1,
              result2: r2,
              profile1: p1Data,
              profile2: p2Data,
              compatibilityScore: compatScore,
              similarities: insights.similarities,
              differences: insights.differences,
            });
          }
        }
      }

      setLoading(false);
    }

    loadResults();
  }, [id1, id2]);

  const handleAddComparison = () => {
    if (inputId && id1) {
      window.location.href = `/compare?id1=${id1}&id2=${inputId}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (!result1 || !profile1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <p className="text-secondary-600 dark:text-secondary-400">No results to compare.</p>
        </div>
      </div>
    );
  }

  // If only one result, show input for second
  if (!result2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <Users className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
              Compare Results
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400">
              Enter another result ID to compare personalities
            </p>
          </div>

          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                Your Result
              </h3>
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {result1.personality_type}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {profile1.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Enter Result ID to Compare
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
                  className="flex-1 px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleAddComparison}
                  disabled={!inputId}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Compare
                </button>
              </div>
              <p className="mt-2 text-xs text-secondary-500 dark:text-secondary-400">
                Ask a friend to share their result ID with you
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Personality Comparison
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400">
            See how your tech personalities align
          </p>
        </div>

        {/* Compatibility Score */}
        {comparison && (
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Compatibility Score</h2>
            <div className="text-6xl font-bold mb-4">
              {comparison.compatibilityScore}%
            </div>
            <p className="text-primary-100">
              {comparison.compatibilityScore >= 80 && 'Highly Compatible - Great synergy!'}
              {comparison.compatibilityScore >= 60 && comparison.compatibilityScore < 80 && 'Good Compatibility - Complementary strengths'}
              {comparison.compatibilityScore >= 40 && comparison.compatibilityScore < 60 && 'Moderate Compatibility - Some differences to navigate'}
              {comparison.compatibilityScore < 40 && 'Different Perspectives - Diverse approaches'}
            </p>
          </div>
        )}

        {/* Side-by-Side Profiles */}
        {result1 && profile1 && result2 && profile2 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Person 1 */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {result1.personality_type}
                </h2>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                  {profile1.name}
                </h3>
              </div>
              <RadarChart scores={result1} height={300} />
            </div>

            {/* Person 2 */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {result2.personality_type}
                </h2>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                  {profile2.name}
                </h3>
              </div>
              <RadarChart scores={result2} height={300} />
            </div>
          </div>
        )}

        {/* Insights */}
        {comparison && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Similarities */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                  Similarities
                </h2>
              </div>
              <ul className="space-y-3">
                {comparison.similarities.map((sim, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
                  >
                    <span className="text-green-500 font-bold">✓</span>
                    <span>{sim}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Differences */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-accent-500" />
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                  Differences
                </h2>
              </div>
              <ul className="space-y-3">
                {comparison.differences.map((diff, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
                  >
                    <span className="text-accent-500 font-bold">↔</span>
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
