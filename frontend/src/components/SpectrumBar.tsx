'use client';

import { SpectrumBarProps } from '@/types';
import { cn } from '@/lib/utils';

export default function SpectrumBar({
  label,
  score,
  lowLabel,
  highLabel,
}: SpectrumBarProps) {
  // Determine which side the score leans toward
  const leaningLow = score < 50;
  const percentage = Math.abs(score - 50) * 2; // Convert to 0-100% leaning

  return (
    <div className="w-full">
      {/* Label */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-secondary-900 dark:text-white">
          {label}
        </span>
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
          {score}%
        </span>
      </div>

      {/* Spectrum labels */}
      <div className="flex justify-between text-xs text-secondary-600 dark:text-secondary-400 mb-1">
        <span className={cn(leaningLow && 'font-bold text-primary-600 dark:text-primary-400')}>
          {lowLabel}
        </span>
        <span className={cn(!leaningLow && 'font-bold text-primary-600 dark:text-primary-400')}>
          {highLabel}
        </span>
      </div>

      {/* Bar */}
      <div className="relative w-full h-8 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-secondary-400 dark:bg-secondary-500 z-10" />

        {/* Filled portion */}
        <div
          className={cn(
            'absolute top-0 h-full bg-gradient-to-r transition-all duration-500',
            leaningLow
              ? 'from-primary-500 to-primary-400 right-1/2'
              : 'from-primary-400 to-primary-500 left-1/2'
          )}
          style={{
            width: `${percentage / 2}%`,
          }}
        />

        {/* Score indicator */}
        <div
          className="absolute top-0 h-full w-1 bg-primary-700 dark:bg-primary-300 shadow-lg z-20 transition-all duration-500"
          style={{
            left: `${score}%`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Leaning description */}
      <div className="mt-1 text-center">
        <span className="text-xs text-secondary-600 dark:text-secondary-400">
          {percentage < 10 && 'Balanced'}
          {percentage >= 10 && percentage < 30 && `Slight ${leaningLow ? lowLabel : highLabel}`}
          {percentage >= 30 && percentage < 50 && `Moderate ${leaningLow ? lowLabel : highLabel}`}
          {percentage >= 50 && percentage < 70 && `Strong ${leaningLow ? lowLabel : highLabel}`}
          {percentage >= 70 && `Very Strong ${leaningLow ? lowLabel : highLabel}`}
        </span>
      </div>
    </div>
  );
}
