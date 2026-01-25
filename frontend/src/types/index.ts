// Core types for Tech 16 Personalities application
// Aligned with Supabase/Postgres database schema

export type SpectrumType = 'focus' | 'interface' | 'change' | 'decision' | 'execution';

export type SpectrumDirection =
  | 'builder'
  | 'analyzer'
  | 'user'
  | 'systems'
  | 'exploratory'
  | 'operational'
  | 'vision'
  | 'logic'
  | 'adaptive'
  | 'structured';

export interface QuestionOption {
  value: number;
  text: string;
  direction: 'left' | 'right';
}

export interface QuizQuestion {
  id: number;
  text: string;
  spectrum?: SpectrumType;
  dimension?: string; // Alternative to spectrum
  direction?: SpectrumDirection;
  options: string[] | QuestionOption[];
}

// Alias for backwards compatibility
export type Question = QuizQuestion;

export interface QuizVersion {
  id: string;
  version: number;
  created_at: string;
  questions: {
    questions: QuizQuestion[];
  };
  is_active: boolean;
}

export interface QuizResponse {
  questionId: number;
  answer: number; // 0-4 (Strongly Disagree to Strongly Agree)
}

export interface SpectrumScores {
  focus_score: number; // 0-100: Builder(0) to Analyzer(100)
  interface_score: number; // 0-100: User-Facing(0) to Systems-Facing(100)
  change_score: number; // 0-100: Exploratory(0) to Operational(100)
  decision_score: number; // 0-100: Vision-Led(0) to Logic-Led(100)
  execution_score: number; // 0-100: Adaptive(0) to Structured(100)
}

export interface QuizResult extends SpectrumScores {
  id: string;
  user_id: string | null;
  quiz_version_id: string;
  created_at: string;
  personality_type: string; // e.g., "B-U-E-V-A"
  responses: QuizResponse[];
  is_public: boolean;
}

export interface PersonalityProfile {
  id: string;
  type_code: string;
  name: string;
  description: string;
  strengths: string[];
  challenges: string[];
  work_preferences: string[];
  updated_at: string;
}

export interface RoadmapLevel {
  beginner: string[];
  intermediate: string[];
  advanced: string[];
  expert: string[];
}

export interface TechRole {
  id: string;
  name: string;
  description: string;
  skills: string[];
  roadmap: RoadmapLevel;
  updated_at: string;
}

export interface RoleScoringWeight {
  id: string;
  role_id: string;
  personality_type: string;
  weight: number; // 0.00 to 1.00
}

export interface RoleRecommendation {
  role: TechRole;
  fitScore: number; // Percentage fit (0-100)
  matchReason: string;
}

export interface ComparisonData {
  result1: QuizResult;
  result2: QuizResult;
  profile1: PersonalityProfile;
  profile2: PersonalityProfile;
  similarities: string[];
  differences: string[];
  compatibilityScore: number;
}

export interface QuizProgress {
  currentQuestion: number;
  answers: QuizResponse[];
  startedAt: string;
  quizVersionId: string;
}

export interface AnalyticsData {
  personality_type: string;
  count: number;
  avg_focus: number;
  avg_interface: number;
  avg_change: number;
  avg_decision: number;
  avg_execution: number;
  date: string;
}

// UI Component Props Types
export interface QuizQuestionProps {
  question: QuizQuestion;
  currentAnswer?: number;
  onAnswer: (answer: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export interface RadarChartProps {
  scores: SpectrumScores;
  width?: number;
  height?: number;
}

export interface SpectrumBarProps {
  label: string;
  score: number;
  lowLabel: string;
  highLabel: string;
}

export interface RoleCardProps {
  role: TechRole;
  fitScore: number;
  rank: number;
}

export interface ResultsCardProps {
  result: QuizResult;
  profile: PersonalityProfile;
  topRole: RoleRecommendation;
}

// Auth types
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface QuizSubmitRequest {
  responses: QuizResponse[];
  quiz_version_id: string;
  user_id?: string;
}

export interface QuizSubmitResponse {
  result_id: string;
  personality_type: string;
  scores: SpectrumScores;
}

// Utility types
export type PersonalityTypeCode =
  | 'B-U-E-V-A' | 'B-U-E-V-T' | 'B-U-E-L-A' | 'B-U-E-L-T'
  | 'B-U-O-V-A' | 'B-U-O-V-T' | 'B-U-O-L-A' | 'B-U-O-L-T'
  | 'B-S-E-V-A' | 'B-S-E-V-T' | 'B-S-E-L-A' | 'B-S-E-L-T'
  | 'B-S-O-V-A' | 'B-S-O-V-T' | 'B-S-O-L-A' | 'B-S-O-L-T';

export type SuffixType = 'A' | 'T'; // Adaptive or Structured

// Spectrum definitions
export const SPECTRUMS = {
  focus: {
    type: 'focus' as SpectrumType,
    lowLabel: 'Builder',
    highLabel: 'Analyzer',
    lowCode: 'B',
    highCode: 'A',
    description: 'How you approach building and understanding systems',
  },
  interface: {
    type: 'interface' as SpectrumType,
    lowLabel: 'User-Facing',
    highLabel: 'Systems-Facing',
    lowCode: 'U',
    highCode: 'S',
    description: 'Where you prefer to work in the tech stack',
  },
  change: {
    type: 'change' as SpectrumType,
    lowLabel: 'Exploratory',
    highLabel: 'Operational',
    lowCode: 'E',
    highCode: 'O',
    description: 'Your approach to change and innovation',
  },
  decision: {
    type: 'decision' as SpectrumType,
    lowLabel: 'Vision-Led',
    highLabel: 'Logic-Led',
    lowCode: 'V',
    highCode: 'L',
    description: 'What drives your decision-making process',
  },
  execution: {
    type: 'execution' as SpectrumType,
    lowLabel: 'Adaptive',
    highLabel: 'Structured',
    lowCode: 'A',
    highCode: 'T',
    description: 'How you execute and organize work',
  },
} as const;
