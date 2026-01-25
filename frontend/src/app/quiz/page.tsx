'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from '@/components/QuizQuestion';
import { QuizQuestion as QuizQuestionType, QuizResponse, QuizProgress } from '@/types';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { storage } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

const STORAGE_KEY = 'quiz_progress';

export default function QuizPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResponse[]>([]);
  const [quizVersionId, setQuizVersionId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load quiz questions and restore progress
  useEffect(() => {
    async function loadQuiz() {
      const supabase = createClient();

      // Fetch latest active quiz version
      const { data: quizVersion, error } = await supabase
        .from('quiz_versions')
        .select('*')
        .eq('is_active', true)
        .order('version', { ascending: false })
        .limit(1)
        .single();

      if (error || !quizVersion) {
        console.error('Error loading quiz:', error);
        return;
      }

      const quizQuestions = quizVersion.questions.questions as QuizQuestionType[];
      setQuestions(quizQuestions);
      setQuizVersionId(quizVersion.id);

      // Restore progress from localStorage
      const savedProgress = storage.get<QuizProgress | null>(STORAGE_KEY, null);
      if (savedProgress && savedProgress.quizVersionId === quizVersion.id) {
        setAnswers(savedProgress.answers);
        setCurrentQuestionIndex(savedProgress.currentQuestion);
      }

      setLoading(false);
    }

    loadQuiz();
  }, []);

  // Auto-save progress
  useEffect(() => {
    if (questions.length > 0 && answers.length > 0) {
      const progress: QuizProgress = {
        currentQuestion: currentQuestionIndex,
        answers,
        startedAt: new Date().toISOString(),
        quizVersionId,
      };
      storage.set(STORAGE_KEY, progress);
    }
  }, [currentQuestionIndex, answers, questions, quizVersionId]);

  const handleAnswer = (answer: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = [...answers];

    // Update or add answer
    const existingIndex = newAnswers.findIndex(
      (a) => a.questionId === currentQuestion.id
    );

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: currentQuestion.id, answer };
    } else {
      newAnswers.push({ questionId: currentQuestion.id, answer });
    }

    setAnswers(newAnswers);

    // Auto-advance to next question
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responses: answers,
          quiz_version_id: quizVersionId,
          user_id: user?.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Clear saved progress
      storage.remove(STORAGE_KEY);

      // Redirect to results
      router.push(`/results/${data.result_id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="text-center">
          <p className="text-secondary-600 dark:text-secondary-400">
            No quiz available. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id
  )?.answer;
  const progress = ((answers.length / questions.length) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-secondary-950 dark:to-secondary-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Tech Personality Quiz
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Answer honestly - there are no right or wrong answers
          </p>
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8 mb-6">
          <QuizQuestion
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={answers.length !== questions.length || submitting}
                className="flex items-center gap-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex >= questions.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress summary */}
        <div className="mt-8 text-center text-sm text-secondary-600 dark:text-secondary-400">
          <p>
            {answers.length} of {questions.length} questions answered ({progress}%)
          </p>
          {!user && (
            <p className="mt-2 text-xs text-secondary-500 dark:text-secondary-500">
              Sign in to save your results and track your progress
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
