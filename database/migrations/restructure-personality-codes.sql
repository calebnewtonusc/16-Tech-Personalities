-- Restructure Tech16: Focus becomes SUFFIX modifier
-- Old format: Focus-Interface-Change-Decision (A-S-E-L, B-U-E-V)
-- New format: Interface-Change-Decision-Execution (S-E-L-T, U-E-V-A)
-- Focus will be position 5 suffix in full quiz results (5-letter code)

-- Strategy to maintain 16 unique types:
-- Analyzer (A) types → Execution = T (Structured - methodical)
-- Builder (B) types → Execution = A (Adaptive - flexible)

-- Step 1: Transform personality profile codes
UPDATE personality_profiles
SET type_code =
  SUBSTRING(type_code FROM 3 FOR 1) || '-' ||  -- Interface (position 2 → 1)
  SUBSTRING(type_code FROM 5 FOR 1) || '-' ||  -- Change (position 3 → 2)
  SUBSTRING(type_code FROM 7 FOR 1) || '-' ||  -- Decision (position 4 → 3)
  CASE
    WHEN SUBSTRING(type_code FROM 1 FOR 1) = 'A' THEN 'T'  -- Analyzer → Structured
    WHEN SUBSTRING(type_code FROM 1 FOR 1) = 'B' THEN 'A'  -- Builder → Adaptive
    ELSE 'A'  -- Default to Adaptive
  END;  -- Execution (position 4)

-- Step 2: Transform role_scoring_weights codes
UPDATE role_scoring_weights
SET personality_type =
  SUBSTRING(personality_type FROM 3 FOR 1) || '-' ||  -- Interface
  SUBSTRING(personality_type FROM 5 FOR 1) || '-' ||  -- Change
  SUBSTRING(personality_type FROM 7 FOR 1) || '-' ||  -- Decision
  CASE
    WHEN SUBSTRING(personality_type FROM 1 FOR 1) = 'A' THEN 'T'  -- Analyzer → Structured
    WHEN SUBSTRING(personality_type FROM 1 FOR 1) = 'B' THEN 'A'  -- Builder → Adaptive
    ELSE 'A'
  END;  -- Execution

-- Step 3: Remove any duplicate rows (in case transformation creates duplicates)
-- Use DISTINCT ON instead of MIN with UUIDs
DELETE FROM personality_profiles
WHERE id NOT IN (
  SELECT DISTINCT ON (type_code) id
  FROM personality_profiles
  ORDER BY type_code, id
);

DELETE FROM role_scoring_weights
WHERE id NOT IN (
  SELECT DISTINCT ON (role_id, personality_type) id
  FROM role_scoring_weights
  ORDER BY role_id, personality_type, id
);

-- Verify new format
SELECT
  type_code,
  name,
  category,
  LENGTH(type_code) as code_length,
  SUBSTRING(type_code FROM 1 FOR 1) as interface,
  SUBSTRING(type_code FROM 3 FOR 1) as change,
  SUBSTRING(type_code FROM 5 FOR 1) as decision,
  SUBSTRING(type_code FROM 7 FOR 1) as execution
FROM personality_profiles
ORDER BY type_code;

SELECT COUNT(*) as total_types FROM personality_profiles;
