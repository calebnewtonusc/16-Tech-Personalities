'use client';

import { RoleCardProps } from '@/types';
import { ChevronRight, Award } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function RoleCard({ role, fitScore, rank }: RoleCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400';
      case 2:
        return 'bg-gray-100 dark:bg-gray-800 border-gray-400';
      case 3:
        return 'bg-orange-100 dark:bg-orange-900/30 border-orange-400';
      default:
        return 'bg-secondary-100 dark:bg-secondary-800 border-secondary-300';
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border-2 transition-all duration-200',
        getRankColor(rank),
        'hover:shadow-lg'
      )}
    >
      <div
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            {rank <= 3 && (
              <div className="mt-1">
                <Award
                  className={cn(
                    'w-6 h-6',
                    rank === 1 && 'text-yellow-500',
                    rank === 2 && 'text-gray-500',
                    rank === 3 && 'text-orange-500'
                  )}
                />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                {role.name}
              </h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                {fitScore}% Match
              </p>
            </div>
          </div>
          <ChevronRight
            className={cn(
              'w-5 h-5 text-secondary-400 transition-transform',
              expanded && 'rotate-90'
            )}
          />
        </div>

        {/* Fit score bar */}
        <div className="mb-4">
          <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                rank === 1 && 'bg-yellow-500',
                rank === 2 && 'bg-gray-500',
                rank === 3 && 'bg-orange-500',
                rank > 3 && 'bg-primary-500'
              )}
              style={{ width: `${fitScore}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary-700 dark:text-secondary-300 text-sm">
          {role.description}
        </p>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-6 pt-6 border-t border-secondary-300 dark:border-secondary-600 space-y-4 animate-slide-up">
            {/* Skills */}
            <div>
              <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning roadmap preview */}
            <div>
              <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                Learning Roadmap
              </h4>
              <div className="space-y-2">
                {Object.entries(role.roadmap).map(([level, items]) => (
                  <div key={level}>
                    <h5 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 capitalize mb-1">
                      {level}
                    </h5>
                    <ul className="text-sm text-secondary-600 dark:text-secondary-400 space-y-1 ml-4">
                      {(items as string[]).slice(0, 2).map((item, idx) => (
                        <li key={idx} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
