-- Fix Tech16 Personality Type Codes (SAFE VERSION)
-- Handles existing 4-letter codes and prevents duplicates

-- Step 1: Delete duplicates, keeping only one row per base type
-- We'll keep the first occurrence of each base type (lowest id)
DELETE FROM personality_profiles
WHERE id NOT IN (
  SELECT MIN(id)
  FROM personality_profiles
  GROUP BY
    CASE
      -- Convert 5-letter codes to 4-letter base codes
      WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4
      THEN SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)  -- Remove last 2 chars (-X)
      ELSE type_code  -- Already 4-letter
    END
);

-- Step 2: Update any remaining 5-letter codes to 4-letter codes
UPDATE personality_profiles
SET type_code = SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
WHERE LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4;

-- Step 3: Do the same for role_scoring_weights
DELETE FROM role_scoring_weights
WHERE id NOT IN (
  SELECT MIN(id)
  FROM role_scoring_weights
  GROUP BY
    role_id,
    CASE
      WHEN LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4
      THEN SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
      ELSE personality_type
    END
);

UPDATE role_scoring_weights
SET personality_type = SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
WHERE LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4;

-- Verify the updates
SELECT
  type_code,
  name,
  tagline,
  category,
  LENGTH(type_code) as code_length,
  LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) as dash_count
FROM personality_profiles
ORDER BY type_code;

-- Show count
SELECT COUNT(*) as total_personalities FROM personality_profiles;
