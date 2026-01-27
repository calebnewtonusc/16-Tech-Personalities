-- Fix personality type codes from 5-letter to 4-letter (FINAL VERSION)
-- Handles duplicates using DISTINCT ON

-- Step 1: Create temporary tables with deduplicated data
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
  tagline,
  category,
  characteristics,
  communication_style,
  ideal_environment,
  growth_areas,
  famous_examples
FROM personality_profiles
ORDER BY
  CASE
    WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4
    THEN SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
    ELSE type_code
  END,
  created_at;

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
  created_at;

-- Step 2: Delete all existing records
DELETE FROM role_scoring_weights;
DELETE FROM personality_profiles;

-- Step 3: Insert deduplicated records with new codes
INSERT INTO personality_profiles (id, type_code, name, description, tagline, category, characteristics, communication_style, ideal_environment, growth_areas, famous_examples)
SELECT id, new_type_code, name, description, tagline, category, characteristics, communication_style, ideal_environment, growth_areas, famous_examples
FROM temp_personality_profiles;

INSERT INTO role_scoring_weights (id, role_id, personality_type, weight)
SELECT id, role_id, new_personality_type, weight
FROM temp_role_weights;

-- Verify
SELECT COUNT(*) as personality_count,
       MIN(LENGTH(type_code)) as min_code_length,
       MAX(LENGTH(type_code)) as max_code_length
FROM personality_profiles;

SELECT COUNT(*) as weights_count,
       COUNT(DISTINCT personality_type) as unique_types,
       COUNT(DISTINCT role_id) as unique_roles
FROM role_scoring_weights;
