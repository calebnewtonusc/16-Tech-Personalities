-- Fix personality type codes from 5-letter to 4-letter (SCHEMA CORRECTED)
-- Handles duplicates using DISTINCT ON

-- Step 1: Create temporary table with deduplicated personality profiles
CREATE TEMP TABLE temp_personality_profiles AS
SELECT DISTINCT ON (
  CASE
    WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4
    THEN SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
    ELSE type_code
  END
)
  id,
  CASE
    WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4
    THEN SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
    ELSE type_code
  END as new_type_code,
  name,
  description,
  strengths,
  challenges,
  work_preferences,
  updated_at,
  category,
  tagline
FROM personality_profiles
ORDER BY
  CASE
    WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4
    THEN SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
    ELSE type_code
  END,
  id;

-- Step 2: Create temporary table with deduplicated role weights
CREATE TEMP TABLE temp_role_weights AS
SELECT DISTINCT ON (
  role_id,
  CASE
    WHEN LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4
    THEN SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
    ELSE personality_type
  END
)
  id,
  role_id,
  CASE
    WHEN LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4
    THEN SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
    ELSE personality_type
  END as new_personality_type,
  weight
FROM role_scoring_weights
ORDER BY
  role_id,
  CASE
    WHEN LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4
    THEN SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
    ELSE personality_type
  END,
  id;

-- Step 3: Delete all existing records
DELETE FROM role_scoring_weights;
DELETE FROM personality_profiles;

-- Step 4: Insert deduplicated records with new 4-letter codes
INSERT INTO personality_profiles (id, type_code, name, description, strengths, challenges, work_preferences, updated_at, category, tagline)
SELECT id, new_type_code, name, description, strengths, challenges, work_preferences, updated_at, category, tagline
FROM temp_personality_profiles;

INSERT INTO role_scoring_weights (id, role_id, personality_type, weight)
SELECT id, role_id, new_personality_type, weight
FROM temp_role_weights;

-- Step 5: Verify
SELECT 'Personality Profiles:' as table_name, COUNT(*) as count, MIN(LENGTH(type_code)) as min_length, MAX(LENGTH(type_code)) as max_length
FROM personality_profiles
UNION ALL
SELECT 'Role Weights:', COUNT(*), NULL, NULL
FROM role_scoring_weights;
