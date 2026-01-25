-- Tech 16 Personalities Database Schema
-- PostgreSQL / Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Quiz versions table (for integrity)
CREATE TABLE quiz_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  questions JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Quiz results table
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  quiz_version_id UUID REFERENCES quiz_versions(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- 5 spectrum scores (0-100)
  focus_score INTEGER NOT NULL CHECK (focus_score >= 0 AND focus_score <= 100),
  interface_score INTEGER NOT NULL CHECK (interface_score >= 0 AND interface_score <= 100),
  change_score INTEGER NOT NULL CHECK (change_score >= 0 AND change_score <= 100),
  decision_score INTEGER NOT NULL CHECK (decision_score >= 0 AND decision_score <= 100),
  execution_score INTEGER NOT NULL CHECK (execution_score >= 0 AND execution_score <= 100),

  -- Generated personality type
  personality_type VARCHAR(10) NOT NULL,

  -- Raw responses
  responses JSONB NOT NULL,

  -- Privacy
  is_public BOOLEAN DEFAULT false
);

-- Personality profiles (CMS content)
CREATE TABLE personality_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type_code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  strengths TEXT[] NOT NULL,
  challenges TEXT[] NOT NULL,
  work_preferences TEXT[] NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tech roles (CMS content)
CREATE TABLE tech_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  roadmap JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role scoring weights (trait-weighted RoleScore)
CREATE TABLE role_scoring_weights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES tech_roles(id) ON DELETE CASCADE,
  personality_type VARCHAR(10) NOT NULL,
  weight DECIMAL(3,2) NOT NULL CHECK (weight >= 0.00 AND weight <= 1.00),
  UNIQUE(role_id, personality_type)
);

-- Create indexes for better query performance
CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at DESC);
CREATE INDEX idx_quiz_results_personality_type ON quiz_results(personality_type);
CREATE INDEX idx_quiz_results_public ON quiz_results(is_public) WHERE is_public = true;
CREATE INDEX idx_role_scoring_weights_role_id ON role_scoring_weights(role_id);
CREATE INDEX idx_role_scoring_weights_personality_type ON role_scoring_weights(personality_type);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE personality_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_scoring_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_versions ENABLE ROW LEVEL SECURITY;

-- Quiz results policies
-- Users can read their own results
CREATE POLICY "Users can view own quiz results"
  ON quiz_results FOR SELECT
  USING (auth.uid() = user_id);

-- Users can view public results
CREATE POLICY "Anyone can view public quiz results"
  ON quiz_results FOR SELECT
  USING (is_public = true);

-- Users can insert their own results
CREATE POLICY "Users can insert own quiz results"
  ON quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can update their own results
CREATE POLICY "Users can update own quiz results"
  ON quiz_results FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own results
CREATE POLICY "Users can delete own quiz results"
  ON quiz_results FOR DELETE
  USING (auth.uid() = user_id);

-- Personality profiles policies (read-only for regular users)
CREATE POLICY "Anyone can view personality profiles"
  ON personality_profiles FOR SELECT
  TO public
  USING (true);

-- Tech roles policies (read-only for regular users)
CREATE POLICY "Anyone can view tech roles"
  ON tech_roles FOR SELECT
  TO public
  USING (true);

-- Role scoring weights policies (read-only for regular users)
CREATE POLICY "Anyone can view role scoring weights"
  ON role_scoring_weights FOR SELECT
  TO public
  USING (true);

-- Quiz versions policies
CREATE POLICY "Anyone can view active quiz versions"
  ON quiz_versions FOR SELECT
  USING (is_active = true);

-- Admin policies (requires custom claims or separate admin table)
-- For now, we'll handle admin operations through service role key

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_personality_profiles_updated_at
  BEFORE UPDATE ON personality_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tech_roles_updated_at
  BEFORE UPDATE ON tech_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create a view for analytics
CREATE OR REPLACE VIEW quiz_analytics AS
SELECT
  personality_type,
  COUNT(*) as count,
  AVG(focus_score) as avg_focus,
  AVG(interface_score) as avg_interface,
  AVG(change_score) as avg_change,
  AVG(decision_score) as avg_decision,
  AVG(execution_score) as avg_execution,
  DATE_TRUNC('day', created_at) as date
FROM quiz_results
GROUP BY personality_type, DATE_TRUNC('day', created_at);
