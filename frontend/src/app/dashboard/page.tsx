'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { QuizResult, PersonalityProfile } from '@/types';
import { createClient } from '@/lib/supabase';
import { Brain, Clock, Eye, LogOut, PlusCircle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut, loading: authLoading } = useAuth();
  const [results, setResults] = useState<(QuizResult & { profile?: PersonalityProfile })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      loadResults();
    }
  }, [user, authLoading, router]);

  async function loadResults() {
    const supabase = createClient();

    const { data: resultsData } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (resultsData) {
      // Fetch profiles for each result
      const resultsWithProfiles = await Promise.all(
        resultsData.map(async (result) => {
          const { data: profile } = await supabase
            .from('personality_profiles')
            .select('*')
            .eq('type_code', result.personality_type)
            .single();

          return { ...result, profile };
        })
      );

      setResults(resultsWithProfiles);
    }

    setLoading(false);
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
              My Dashboard
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400">
              Welcome back, {user?.email}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/quiz"
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              Retake Quiz
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Quizzes Taken
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {results.length}
                </p>
              </div>
            </div>
          </div>

          {results.length > 0 && (
            <>
              <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-8 h-8 text-primary-500" />
                  <div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Latest Result
                    </p>
                    <p className="text-lg font-bold text-secondary-900 dark:text-white">
                      {results[0].personality_type}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="w-8 h-8 text-primary-500" />
                  <div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Latest Type
                    </p>
                    <p className="text-lg font-bold text-secondary-900 dark:text-white">
                      {results[0].profile?.name}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Results List */}
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
            Your Quiz Results
          </h2>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-secondary-300 dark:text-secondary-600 mx-auto mb-4" />
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                You haven't taken the quiz yet
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Take Your First Quiz
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/results/${result.id}`}
                  className="block p-6 bg-secondary-50 dark:bg-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {result.personality_type}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            result.is_public
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-secondary-200 dark:bg-secondary-600 text-secondary-700 dark:text-secondary-300'
                          }`}
                        >
                          {result.is_public ? 'Public' : 'Private'}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-secondary-900 dark:text-white mb-1">
                        {result.profile?.name}
                      </p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {formatRelativeTime(result.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                        Spectrum Scores
                      </p>
                      <div className="text-xs text-secondary-500 dark:text-secondary-500 space-y-1">
                        <div>Focus: {result.focus_score}%</div>
                        <div>Interface: {result.interface_score}%</div>
                        <div>Change: {result.change_score}%</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
