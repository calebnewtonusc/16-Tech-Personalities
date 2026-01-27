-- Manually update personality type codes from 5-letter to 4-letter
UPDATE personality_profiles
SET type_code = SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
WHERE LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4;

UPDATE role_scoring_weights
SET personality_type = SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
WHERE LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4;

-- Verify
SELECT type_code, LENGTH(type_code) as len FROM personality_profiles ORDER BY type_code;
