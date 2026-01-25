'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import RadarChart from '@/components/RadarChart';
import SpectrumBar from '@/components/SpectrumBar';
import RoleCard from '@/components/RoleCard';
import ResultsCard from '@/components/ResultsCard';
import { QuizResult, PersonalityProfile, RoleRecommendation } from '@/types';
import { createClient } from '@/lib/supabase';
import { getRoleRecommendations } from '@/lib/roleMapping';
import { Share2, Download, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { copyToClipboard, generateShareLink } from '@/lib/utils';

export default function ResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const resultId = params.id as string;
  const isPublic = searchParams.get('public') === 'true';

  const [result, setResult] = useState<QuizResult | null>(null);
  const [profile, setProfile] = useState<PersonalityProfile | null>(null);
  const [recommendations, setRecommendations] = useState<RoleRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function loadResults() {
      const supabase = createClient();

      // Fetch quiz result
      const { data: resultData, error: resultError } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('id', resultId)
        .single();

      if (resultError || !resultData) {
        console.error('Error loading result:', resultError);
        setLoading(false);
        return;
      }

      setResult(resultData);

      // Fetch personality profile
      const { data: profileData, error: profileError } = await supabase
        .from('personality_profiles')
        .select('*')
        .eq('type_code', resultData.personality_type)
        .single();

      if (profileError || !profileData) {
        console.error('Error loading profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Get role recommendations
      const recs = await getRoleRecommendations(
        resultData.personality_type,
        resultData,
        3
      );
      setRecommendations(recs);

      setLoading(false);
    }

    loadResults();
  }, [resultId]);

  const handleShare = async () => {
    const shareUrl = generateShareLink(resultId, true);
    const copied = await copyToClipboard(shareUrl);
    if (copied) {
      alert('Share link copied to clipboard!');
    }
  };

  const handleDownloadPDF = async () => {
    setExporting(true);
    try {
      const element = document.getElementById('results-card');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`tech-personality-${result?.personality_type}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            Results not found.
          </p>
          <Link
            href="/quiz"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Take the quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                Your Tech Personality Results
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400">
                {new Date(result.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={exporting}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {exporting ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Card (for PDF export) */}
        <div className="mb-8">
          {recommendations.length > 0 && (
            <ResultsCard
              result={result}
              profile={profile}
              topRole={recommendations[0]}
            />
          )}
        </div>

        {/* Detailed Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Personality Profile
            </h2>
            <RadarChart scores={result} height={350} />
          </div>

          {/* Spectrum Scores */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Spectrum Breakdown
            </h2>
            <div className="space-y-6">
              <SpectrumBar
                label="Focus"
                score={result.focus_score}
                lowLabel="Builder"
                highLabel="Analyzer"
              />
              <SpectrumBar
                label="Interface"
                score={result.interface_score}
                lowLabel="User-Facing"
                highLabel="Systems-Facing"
              />
              <SpectrumBar
                label="Change Style"
                score={result.change_score}
                lowLabel="Exploratory"
                highLabel="Operational"
              />
              <SpectrumBar
                label="Decision Driver"
                score={result.decision_score}
                lowLabel="Vision-Led"
                highLabel="Logic-Led"
              />
              <SpectrumBar
                label="Execution"
                score={result.execution_score}
                lowLabel="Adaptive"
                highLabel="Structured"
              />
            </div>
          </div>
        </div>

        {/* Personality Details */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Your Strengths
            </h2>
            <ul className="space-y-3">
              {profile.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
                >
                  <span className="text-primary-500 font-bold">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Growth Areas
            </h2>
            <ul className="space-y-3">
              {profile.challenges.map((challenge, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
                >
                  <span className="text-accent-500 font-bold">→</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Work Preferences */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
            Ideal Work Environment
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {profile.work_preferences.map((pref, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
              >
                <span className="text-primary-500">•</span>
                <span>{pref}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Role Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
            Top Career Matches
          </h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <RoleCard
                key={rec.role.id}
                role={rec.role}
                fitScore={rec.fitScore}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Compare CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center">
          <Users className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Compare with Others</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Share your results with friends or colleagues and see how your tech personalities compare!
          </p>
          <Link
            href={`/compare?id1=${resultId}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-primary-50 text-primary-600 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Users className="w-5 h-5" />
            Compare Results
          </Link>
        </div>
      </div>
    </div>
  );
}
