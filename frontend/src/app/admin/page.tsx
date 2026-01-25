'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { PersonalityProfile, TechRole, AnalyticsData } from '@/types';
import { Settings, Users, TrendingUp, Edit, Save } from 'lucide-react';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profiles' | 'roles' | 'analytics'>('analytics');
  const [profiles, setProfiles] = useState<PersonalityProfile[]>([]);
  const [roles, setRoles] = useState<TechRole[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, you'd check for admin role here
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      loadData();
    }
  }, [user, authLoading, router]);

  async function loadData() {
    const supabase = createClient();

    // Load profiles
    const { data: profilesData } = await supabase
      .from('personality_profiles')
      .select('*')
      .order('type_code');

    if (profilesData) setProfiles(profilesData);

    // Load roles
    const { data: rolesData } = await supabase
      .from('tech_roles')
      .select('*')
      .order('name');

    if (rolesData) setRoles(rolesData);

    // Load analytics
    const { data: resultsData } = await supabase
      .from('quiz_results')
      .select('personality_type, created_at');

    if (resultsData) {
      // Calculate type distribution
      const typeCounts: Record<string, number> = {};
      resultsData.forEach((r) => {
        typeCounts[r.personality_type] = (typeCounts[r.personality_type] || 0) + 1;
      });

      setAnalytics({
        totalResults: resultsData.length,
        typeDistribution: Object.entries(typeCounts)
          .map(([type, count]) => ({ type, count }))
          .sort((a, b) => b.count - a.count),
        recentResults: resultsData.slice(0, 10),
      });
    }

    setLoading(false);
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-primary-500" />
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Admin Dashboard
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-secondary-200 dark:border-secondary-700">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'analytics'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-secondary-600 dark:text-secondary-400 hover:text-primary-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Analytics
            </div>
          </button>
          <button
            onClick={() => setActiveTab('profiles')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'profiles'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-secondary-600 dark:text-secondary-400 hover:text-primary-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Profiles ({profiles.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'roles'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-secondary-600 dark:text-secondary-400 hover:text-primary-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Roles ({roles.length})
            </div>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                  Total Quiz Results
                </p>
                <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                  {analytics.totalResults}
                </p>
              </div>
              <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                  Unique Types
                </p>
                <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                  {analytics.typeDistribution.length}
                </p>
              </div>
              <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-6">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                  Most Common Type
                </p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {analytics.typeDistribution[0]?.type || 'N/A'}
                </p>
              </div>
            </div>

            {/* Type Distribution */}
            <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                Personality Type Distribution
              </h2>
              <div className="space-y-3">
                {analytics.typeDistribution.map(
                  (item: { type: string; count: number }) => (
                    <div key={item.type}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-secondary-900 dark:text-white">
                          {item.type}
                        </span>
                        <span className="text-secondary-600 dark:text-secondary-400">
                          {item.count} ({((item.count / analytics.totalResults) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${(item.count / analytics.totalResults) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profiles' && (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                Personality Profiles
              </h2>
              <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold">
                Add New Profile
              </button>
            </div>
            <div className="space-y-4">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="p-6 bg-secondary-50 dark:bg-secondary-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                        {profile.type_code}
                      </h3>
                      <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                        {profile.name}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-secondary-600 text-secondary-700 dark:text-secondary-300 rounded-lg text-sm font-medium hover:shadow-md transition-all">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                    {profile.description}
                  </p>
                  <div className="flex gap-2 text-xs text-secondary-500 dark:text-secondary-500">
                    <span>{profile.strengths.length} strengths</span>
                    <span>•</span>
                    <span>{profile.challenges.length} challenges</span>
                    <span>•</span>
                    <span>{profile.work_preferences.length} preferences</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                Tech Roles
              </h2>
              <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold">
                Add New Role
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="p-6 bg-secondary-50 dark:bg-secondary-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                      {role.name}
                    </h3>
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {role.skills.length > 3 && (
                      <span className="px-2 py-1 text-secondary-500 text-xs">
                        +{role.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
