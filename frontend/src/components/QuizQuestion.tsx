'use client';

import { QuizQuestionProps } from '@/types';
import { cn } from '@/lib/utils';

const LIKERT_OPTIONS = [
  { value: 0, label: 'Strongly Disagree' },
  { value: 1, label: 'Disagree' },
  { value: 2, label: 'Neutral' },
  { value: 3, label: 'Agree' },
  { value: 4, label: 'Strongly Agree' },
];

export default function QuizQuestion({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {Math.round((questionNumber / totalQuestions) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question text */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
          {question.text}
        </h2>
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          Select the option that best describes you
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {LIKERT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={cn(
              'w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200',
              'hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              currentAnswer === option.value
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 shadow-md'
                : 'border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-secondary-900 dark:text-white">
                {option.label}
              </span>
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 transition-all',
                  currentAnswer === option.value
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-secondary-300 dark:border-secondary-600'
                )}
              >
                {currentAnswer === option.value && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
