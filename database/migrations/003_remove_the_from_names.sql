-- Migration: Remove "The" prefix from personality names
-- Date: 2026-01-26
-- Purpose: Clean up personality names to avoid awkward wording in UI
-- Example: "The Product Innovator" → "Product Innovator"

BEGIN;

-- Update all personality names that start with "The "
UPDATE personality_profiles
SET name = REPLACE(name, 'The ', '')
WHERE name LIKE 'The %';

-- Verify the update
DO $$
DECLARE
  remaining_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO remaining_count
  FROM personality_profiles
  WHERE name LIKE 'The %';

  IF remaining_count > 0 THEN
    RAISE EXCEPTION 'Migration failed: % names still contain "The "', remaining_count;
  ELSE
    RAISE NOTICE 'Migration successful: All "The " prefixes removed from personality names';
  END IF;
END $$;

COMMIT;

-- Rollback instructions (if needed):
-- UPDATE personality_profiles SET name = 'The ' || name WHERE type_code IN ('S-E-L-T', 'S-E-V-T', ...);
