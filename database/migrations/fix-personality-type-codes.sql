-- Fix Tech16 Personality Type Codes
-- Convert from 5-letter codes (B-U-E-V-A) to 4-letter base codes (B-U-E-V)
-- The Execution dimension (5th position: Adaptive/Structured) is a modifier, not a separate personality type

-- Update personality_profiles table to use 4-letter codes
UPDATE personality_profiles SET type_code = 'B-U-E-V' WHERE type_code = 'B-U-E-V-A' OR type_code = 'B-U-E-V-T';
UPDATE personality_profiles SET type_code = 'B-U-E-L' WHERE type_code = 'B-U-E-L-A' OR type_code = 'B-U-E-L-T';
UPDATE personality_profiles SET type_code = 'B-U-O-V' WHERE type_code = 'B-U-O-V-A' OR type_code = 'B-U-O-V-T';
UPDATE personality_profiles SET type_code = 'B-U-O-L' WHERE type_code = 'B-U-O-L-A' OR type_code = 'B-U-O-L-T';
UPDATE personality_profiles SET type_code = 'B-S-E-V' WHERE type_code = 'B-S-E-V-A' OR type_code = 'B-S-E-V-T';
UPDATE personality_profiles SET type_code = 'B-S-E-L' WHERE type_code = 'B-S-E-L-A' OR type_code = 'B-S-E-L-T';
UPDATE personality_profiles SET type_code = 'B-S-O-V' WHERE type_code = 'B-S-O-V-A' OR type_code = 'B-S-O-V-T';
UPDATE personality_profiles SET type_code = 'B-S-O-L' WHERE type_code = 'B-S-O-L-A' OR type_code = 'B-S-O-L-T';
UPDATE personality_profiles SET type_code = 'A-U-E-V' WHERE type_code = 'A-U-E-V-A' OR type_code = 'A-U-E-V-T';
UPDATE personality_profiles SET type_code = 'A-U-E-L' WHERE type_code = 'A-U-E-L-A' OR type_code = 'A-U-E-L-T';
UPDATE personality_profiles SET type_code = 'A-U-O-V' WHERE type_code = 'A-U-O-V-A' OR type_code = 'A-U-O-V-T';
UPDATE personality_profiles SET type_code = 'A-U-O-L' WHERE type_code = 'A-U-O-L-A' OR type_code = 'A-U-O-L-T';
UPDATE personality_profiles SET type_code = 'A-S-E-V' WHERE type_code = 'A-S-E-V-A' OR type_code = 'A-S-E-V-T';
UPDATE personality_profiles SET type_code = 'A-S-E-L' WHERE type_code = 'A-S-E-L-A' OR type_code = 'A-S-E-L-T';
UPDATE personality_profiles SET type_code = 'A-S-O-V' WHERE type_code = 'A-S-O-V-A' OR type_code = 'A-S-O-V-T';
UPDATE personality_profiles SET type_code = 'A-S-O-L' WHERE type_code = 'A-S-O-L-A' OR type_code = 'A-S-O-L-T';

-- Update role_scoring_weights table to use 4-letter codes
UPDATE role_scoring_weights SET personality_type = 'B-U-E-V' WHERE personality_type = 'B-U-E-V-A' OR personality_type = 'B-U-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'B-U-E-L' WHERE personality_type = 'B-U-E-L-A' OR personality_type = 'B-U-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'B-U-O-V' WHERE personality_type = 'B-U-O-V-A' OR personality_type = 'B-U-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'B-U-O-L' WHERE personality_type = 'B-U-O-L-A' OR personality_type = 'B-U-O-L-T';
UPDATE role_scoring_weights SET personality_type = 'B-S-E-V' WHERE personality_type = 'B-S-E-V-A' OR personality_type = 'B-S-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'B-S-E-L' WHERE personality_type = 'B-S-E-L-A' OR personality_type = 'B-S-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'B-S-O-V' WHERE personality_type = 'B-S-O-V-A' OR personality_type = 'B-S-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'B-S-O-L' WHERE personality_type = 'B-S-O-L-A' OR personality_type = 'B-S-O-L-T';
UPDATE role_scoring_weights SET personality_type = 'A-U-E-V' WHERE personality_type = 'A-U-E-V-A' OR personality_type = 'A-U-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'A-U-E-L' WHERE personality_type = 'A-U-E-L-A' OR personality_type = 'A-U-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'A-U-O-V' WHERE personality_type = 'A-U-O-V-A' OR personality_type = 'A-U-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'A-U-O-L' WHERE personality_type = 'A-U-O-L-A' OR personality_type = 'A-U-O-L-T';
UPDATE role_scoring_weights SET personality_type = 'A-S-E-V' WHERE personality_type = 'A-S-E-V-A' OR personality_type = 'A-S-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'A-S-E-L' WHERE personality_type = 'A-S-E-L-A' OR personality_type = 'A-S-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'A-S-O-V' WHERE personality_type = 'A-S-O-V-A' OR personality_type = 'A-S-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'A-S-O-L' WHERE personality_type = 'A-S-O-L-A' OR personality_type = 'A-S-O-L-T';

-- Delete duplicate personality profiles (keeping only first occurrence for each base type)
-- First, let's add a temporary column to mark which row to keep
ALTER TABLE personality_profiles ADD COLUMN IF NOT EXISTS temp_keep BOOLEAN DEFAULT FALSE;

-- Mark the first occurrence of each 4-letter code to keep
WITH ranked AS (
  SELECT id, type_code, ROW_NUMBER() OVER (PARTITION BY type_code ORDER BY id) as rn
  FROM personality_profiles
)
UPDATE personality_profiles
SET temp_keep = TRUE
WHERE id IN (SELECT id FROM ranked WHERE rn = 1);

-- Delete duplicates (where temp_keep is FALSE)
DELETE FROM personality_profiles WHERE temp_keep = FALSE;

-- Drop the temporary column
ALTER TABLE personality_profiles DROP COLUMN temp_keep;

-- Verify the updates
SELECT type_code, name, tagline, category FROM personality_profiles ORDER BY type_code;
