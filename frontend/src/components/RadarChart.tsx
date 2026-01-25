'use client';

import { RadarChartProps } from '@/types';
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

export default function RadarChart({
  scores,
  width = 400,
  height = 400,
}: RadarChartProps) {
  // Transform scores into radar chart data
  const data = [
    {
      spectrum: 'Focus',
      score: scores.focus_score,
      fullMark: 100,
    },
    {
      spectrum: 'Interface',
      score: scores.interface_score,
      fullMark: 100,
    },
    {
      spectrum: 'Change',
      score: scores.change_score,
      fullMark: 100,
    },
    {
      spectrum: 'Decision',
      score: scores.decision_score,
      fullMark: 100,
    },
    {
      spectrum: 'Execution',
      score: scores.execution_score,
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadar data={data}>
          <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="spectrum"
            tick={{ fill: '#64748b', fontSize: 14, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <Radar
            name="Your Profile"
            dataKey="score"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`${value}%`, 'Score']}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
