-- Check for duplicate or very similar roles in the database

-- 1. Find exact duplicate role names
SELECT name, COUNT(*) as count
FROM tech_roles
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- 2. Find similar mobile-related roles
SELECT id, name, category, description
FROM tech_roles
WHERE LOWER(name) LIKE '%mobile%'
   OR LOWER(name) LIKE '%ios%'
   OR LOWER(name) LIKE '%android%'
ORDER BY name;

-- 3. Find similar frontend roles
SELECT id, name, category, description
FROM tech_roles
WHERE LOWER(name) LIKE '%frontend%'
   OR LOWER(name) LIKE '%front-end%'
   OR LOWER(name) LIKE '%front end%'
ORDER BY name;

-- 4. Find similar backend roles
SELECT id, name, category, description
FROM tech_roles
WHERE LOWER(name) LIKE '%backend%'
   OR LOWER(name) LIKE '%back-end%'
   OR LOWER(name) LIKE '%back end%'
ORDER BY name;

-- 5. Find similar fullstack roles
SELECT id, name, category, description
FROM tech_roles
WHERE LOWER(name) LIKE '%fullstack%'
   OR LOWER(name) LIKE '%full-stack%'
   OR LOWER(name) LIKE '%full stack%'
ORDER BY name;

-- 6. Find all roles to review for duplicates
SELECT id, name, category
FROM tech_roles
ORDER BY name;

-- 7. Count total roles
SELECT COUNT(*) as total_roles FROM tech_roles;

-- RECOMMENDED CONSOLIDATIONS:
-- If you find duplicates, you can consolidate them like this:

-- Example: Merge iOS Engineer, Android Engineer, Mobile Engineer into just "Mobile Engineer"
--
-- Step 1: Update role_scoring_weights to point to the consolidated role
-- UPDATE role_scoring_weights
-- SET role_id = (SELECT id FROM tech_roles WHERE name = 'Mobile Engineer' LIMIT 1)
-- WHERE role_id IN (
--   SELECT id FROM tech_roles
--   WHERE name IN ('iOS Engineer', 'Android Engineer')
-- );
--
-- Step 2: Delete the duplicate roles
-- DELETE FROM tech_roles
-- WHERE name IN ('iOS Engineer', 'Android Engineer');
--
-- Step 3: Update the Mobile Engineer description to cover all platforms
-- UPDATE tech_roles
-- SET description = 'Develops mobile applications for iOS, Android, and cross-platform frameworks...'
-- WHERE name = 'Mobile Engineer';
