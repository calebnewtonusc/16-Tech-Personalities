-- Verify Tech16 Database Migrations

-- Check personality profiles count and codes
SELECT
  COUNT(*) as total_personalities,
  COUNT(DISTINCT type_code) as unique_codes
FROM personality_profiles;

-- Show all personality type codes (should be 16 with 4-letter format)
SELECT
  type_code,
  name,
  category,
  LENGTH(type_code) as code_length,
  LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) as dash_count
FROM personality_profiles
ORDER BY type_code;

-- Check quiz questions
SELECT
  id,
  version,
  is_active,
  jsonb_array_length(questions->'questions') as question_count
FROM quiz_versions
WHERE is_active = true;

-- Sample first 3 questions to verify format
SELECT
  jsonb_array_elements(questions->'questions')->>'id' as question_id,
  jsonb_array_elements(questions->'questions')->>'spectrum' as spectrum,
  jsonb_array_elements(questions->'questions')->>'direction' as direction,
  LEFT(jsonb_array_elements(questions->'questions')->>'text', 60) as question_text_preview
FROM quiz_versions
WHERE is_active = true
LIMIT 3;

-- Check role_scoring_weights uses 4-letter codes
SELECT
  COUNT(*) as total_weights,
  COUNT(DISTINCT personality_type) as unique_personality_types,
  COUNT(DISTINCT role_id) as unique_roles
FROM role_scoring_weights;

-- Sample role weights
SELECT
  personality_type,
  role_id,
  weight
FROM role_scoring_weights
ORDER BY personality_type, weight DESC
LIMIT 10;
