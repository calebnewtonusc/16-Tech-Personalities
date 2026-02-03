-- Migration: Convert personality codes from F-I-C-D-E to I-C-D-E-F format
-- Date: 2026-02-03
-- Reason: Focus (B/A) is now the 5th modifier dimension, not the 1st routing dimension

-- Update personality_profiles table
UPDATE personality_profiles SET type_code = 'U-E-V-A' WHERE type_code = 'B-U-E-V-A';
UPDATE personality_profiles SET type_code = 'U-E-V-T' WHERE type_code = 'B-U-E-V-T';
UPDATE personality_profiles SET type_code = 'U-E-L-A' WHERE type_code = 'B-U-E-L-A';
UPDATE personality_profiles SET type_code = 'U-E-L-T' WHERE type_code = 'B-U-E-L-T';
UPDATE personality_profiles SET type_code = 'U-O-V-A' WHERE type_code = 'B-U-O-V-A';
UPDATE personality_profiles SET type_code = 'U-O-V-T' WHERE type_code = 'B-U-O-V-T';
UPDATE personality_profiles SET type_code = 'U-O-L-A' WHERE type_code = 'B-U-O-L-A';
UPDATE personality_profiles SET type_code = 'U-O-L-T' WHERE type_code = 'B-U-O-L-T';
UPDATE personality_profiles SET type_code = 'S-E-V-A' WHERE type_code = 'B-S-E-V-A';
UPDATE personality_profiles SET type_code = 'S-E-V-T' WHERE type_code = 'B-S-E-V-T';
UPDATE personality_profiles SET type_code = 'S-E-L-A' WHERE type_code = 'B-S-E-L-A';
UPDATE personality_profiles SET type_code = 'S-E-L-T' WHERE type_code = 'B-S-E-L-T';
UPDATE personality_profiles SET type_code = 'S-O-V-A' WHERE type_code = 'B-S-O-V-A';
UPDATE personality_profiles SET type_code = 'S-O-V-T' WHERE type_code = 'B-S-O-V-T';
UPDATE personality_profiles SET type_code = 'S-O-L-A' WHERE type_code = 'B-S-O-L-A';
UPDATE personality_profiles SET type_code = 'S-O-L-T' WHERE type_code = 'B-S-O-L-T';

-- Also update Analyzer variants (A-*)
UPDATE personality_profiles SET type_code = 'U-E-V-A' WHERE type_code = 'A-U-E-V-A';
UPDATE personality_profiles SET type_code = 'U-E-V-T' WHERE type_code = 'A-U-E-V-T';
UPDATE personality_profiles SET type_code = 'U-E-L-A' WHERE type_code = 'A-U-E-L-A';
UPDATE personality_profiles SET type_code = 'U-E-L-T' WHERE type_code = 'A-U-E-L-T';
UPDATE personality_profiles SET type_code = 'U-O-V-A' WHERE type_code = 'A-U-O-V-A';
UPDATE personality_profiles SET type_code = 'U-O-V-T' WHERE type_code = 'A-U-O-V-T';
UPDATE personality_profiles SET type_code = 'U-O-L-A' WHERE type_code = 'A-U-O-L-A';
UPDATE personality_profiles SET type_code = 'U-O-L-T' WHERE type_code = 'A-U-O-L-T';
UPDATE personality_profiles SET type_code = 'S-E-V-A' WHERE type_code = 'A-S-E-V-A';
UPDATE personality_profiles SET type_code = 'S-E-V-T' WHERE type_code = 'A-S-E-V-T';
UPDATE personality_profiles SET type_code = 'S-E-L-A' WHERE type_code = 'A-S-E-L-A';
UPDATE personality_profiles SET type_code = 'S-E-L-T' WHERE type_code = 'A-S-E-L-T';
UPDATE personality_profiles SET type_code = 'S-O-V-A' WHERE type_code = 'A-S-O-V-A';
UPDATE personality_profiles SET type_code = 'S-O-V-T' WHERE type_code = 'A-S-O-V-T';
UPDATE personality_profiles SET type_code = 'S-O-L-A' WHERE type_code = 'A-S-O-L-A';
UPDATE personality_profiles SET type_code = 'S-O-L-T' WHERE type_code = 'A-S-O-L-T';

-- Update role_scoring_weights table (personality_type column)
UPDATE role_scoring_weights SET personality_type = 'U-E-V-A' WHERE personality_type = 'B-U-E-V-A';
UPDATE role_scoring_weights SET personality_type = 'U-E-V-T' WHERE personality_type = 'B-U-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'U-E-L-A' WHERE personality_type = 'B-U-E-L-A';
UPDATE role_scoring_weights SET personality_type = 'U-E-L-T' WHERE personality_type = 'B-U-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'U-O-V-A' WHERE personality_type = 'B-U-O-V-A';
UPDATE role_scoring_weights SET personality_type = 'U-O-V-T' WHERE personality_type = 'B-U-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'U-O-L-A' WHERE personality_type = 'B-U-O-L-A';
UPDATE role_scoring_weights SET personality_type = 'U-O-L-T' WHERE personality_type = 'B-U-O-L-T';
UPDATE role_scoring_weights SET personality_type = 'S-E-V-A' WHERE personality_type = 'B-S-E-V-A';
UPDATE role_scoring_weights SET personality_type = 'S-E-V-T' WHERE personality_type = 'B-S-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'S-E-L-A' WHERE personality_type = 'B-S-E-L-A';
UPDATE role_scoring_weights SET personality_type = 'S-E-L-T' WHERE personality_type = 'B-S-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'S-O-V-A' WHERE personality_type = 'B-S-O-V-A';
UPDATE role_scoring_weights SET personality_type = 'S-O-V-T' WHERE personality_type = 'B-S-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'S-O-L-A' WHERE personality_type = 'B-S-O-L-A';
UPDATE role_scoring_weights SET personality_type = 'S-O-L-T' WHERE personality_type = 'B-S-O-L-T';

-- Also update Analyzer variants
UPDATE role_scoring_weights SET personality_type = 'U-E-V-A' WHERE personality_type = 'A-U-E-V-A';
UPDATE role_scoring_weights SET personality_type = 'U-E-V-T' WHERE personality_type = 'A-U-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'U-E-L-A' WHERE personality_type = 'A-U-E-L-A';
UPDATE role_scoring_weights SET personality_type = 'U-E-L-T' WHERE personality_type = 'A-U-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'U-O-V-A' WHERE personality_type = 'A-U-O-V-A';
UPDATE role_scoring_weights SET personality_type = 'U-O-V-T' WHERE personality_type = 'A-U-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'U-O-L-A' WHERE personality_type = 'A-U-O-L-A';
UPDATE role_scoring_weights SET personality_type = 'U-O-L-T' WHERE personality_type = 'A-U-O-L-T';
UPDATE role_scoring_weights SET personality_type = 'S-E-V-A' WHERE personality_type = 'A-S-E-V-A';
UPDATE role_scoring_weights SET personality_type = 'S-E-V-T' WHERE personality_type = 'A-S-E-V-T';
UPDATE role_scoring_weights SET personality_type = 'S-E-L-A' WHERE personality_type = 'A-S-E-L-A';
UPDATE role_scoring_weights SET personality_type = 'S-E-L-T' WHERE personality_type = 'A-S-E-L-T';
UPDATE role_scoring_weights SET personality_type = 'S-O-V-A' WHERE personality_type = 'A-S-O-V-A';
UPDATE role_scoring_weights SET personality_type = 'S-O-V-T' WHERE personality_type = 'A-S-O-V-T';
UPDATE role_scoring_weights SET personality_type = 'S-O-L-A' WHERE personality_type = 'A-S-O-L-A';
UPDATE role_scoring_weights SET personality_type = 'S-O-L-T' WHERE personality_type = 'A-S-O-L-T';

-- Update quiz_results table if it exists and has personality_type column
UPDATE quiz_results
SET personality_type = CONCAT(
  SPLIT_PART(personality_type, '-', 2), '-',  -- Interface
  SPLIT_PART(personality_type, '-', 3), '-',  -- Change
  SPLIT_PART(personality_type, '-', 4), '-',  -- Decision
  SPLIT_PART(personality_type, '-', 5), '-',  -- Execution
  SPLIT_PART(personality_type, '-', 1)        -- Focus (moved to end)
)
WHERE personality_type LIKE '_-_-_-_-_';  -- Only update 5-part codes

-- Verify the changes
SELECT type_code, name FROM personality_profiles ORDER BY type_code;
