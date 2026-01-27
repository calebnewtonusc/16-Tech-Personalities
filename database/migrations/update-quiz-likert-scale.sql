-- Update quiz questions to use proper Likert scale format
-- "Strongly Disagree" → "Disagree" → "Neutral" → "Agree" → "Strongly Agree"

-- This will update the active quiz version with Likert scale options
UPDATE quiz_versions
SET questions = jsonb_set(
  questions,
  '{questions}',
  (
    SELECT jsonb_agg(
      jsonb_set(
        jsonb_set(
          question,
          '{options}',
          '["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]'::jsonb
        ),
        '{optionScores}',
        '[0, 1, 2, 3, 4]'::jsonb
      )
    )
    FROM jsonb_array_elements(questions->'questions') AS question
  )
)
WHERE is_active = true;

-- Verify the update
SELECT 
  id,
  version,
  is_active,
  jsonb_array_length(questions->'questions') as question_count,
  questions->'questions'->0->'options' as sample_options
FROM quiz_versions
WHERE is_active = true;
