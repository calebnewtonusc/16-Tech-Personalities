-- Check Tech16 System Structure: 4 Pillars + 1 Modifier

-- The 5 dimensions are:
-- 1. Focus (B/A) - Builder vs Analyzer [POSITION 1 - PREFIX]
-- 2. Interface (U/S) - User-facing vs Systems [POSITION 2]
-- 3. Change (E/O) - Exploratory vs Operational [POSITION 3]
-- 4. Decision (V/L) - Vision-led vs Logic-led [POSITION 4]
-- 5. Execution (A/T) - Adaptive vs Structured [POSITION 5 - SUFFIX MODIFIER]

-- Database should store 4-letter BASE codes: Focus-Interface-Change-Decision (B-U-E-V)
-- Full personality is 5-letter: Focus-Interface-Change-Decision-Execution (B-U-E-V-A)

-- Check current personality codes
SELECT
  type_code,
  name,
  LENGTH(type_code) as code_length,
  SUBSTRING(type_code FROM 1 FOR 1) as focus_letter,
  SUBSTRING(type_code FROM 3 FOR 1) as interface_letter,
  SUBSTRING(type_code FROM 5 FOR 1) as change_letter,
  SUBSTRING(type_code FROM 7 FOR 1) as decision_letter
FROM personality_profiles
ORDER BY type_code;

-- Count by Focus dimension (should be 8 Builder, 8 Analyzer)
SELECT
  SUBSTRING(type_code FROM 1 FOR 1) as focus,
  CASE
    WHEN SUBSTRING(type_code FROM 1 FOR 1) = 'B' THEN 'Builder'
    WHEN SUBSTRING(type_code FROM 1 FOR 1) = 'A' THEN 'Analyzer'
  END as focus_name,
  COUNT(*) as count
FROM personality_profiles
GROUP BY SUBSTRING(type_code FROM 1 FOR 1)
ORDER BY focus;

-- Verify we have all 16 combinations
SELECT COUNT(*) as total_base_types FROM personality_profiles;

-- Check quiz questions structure
SELECT
  (questions->'questions'->0->>'spectrum') as q1_spectrum,
  (questions->'questions'->0->>'direction') as q1_direction,
  (questions->'questions'->8->>'spectrum') as q9_spectrum,
  (questions->'questions'->8->>'direction') as q9_direction,
  (questions->'questions'->16->>'spectrum') as q17_spectrum,
  (questions->'questions'->16->>'direction') as q17_direction,
  (questions->'questions'->24->>'spectrum') as q25_spectrum,
  (questions->'questions'->24->>'direction') as q25_direction,
  (questions->'questions'->32->>'spectrum') as q33_spectrum,
  (questions->'questions'->32->>'direction') as q33_direction,
  jsonb_array_length(questions->'questions') as total_questions
FROM quiz_versions
WHERE is_active = true;
