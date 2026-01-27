-- Check dash counts in personality codes
SELECT
  type_code,
  LENGTH(type_code) as total_length,
  LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) as dash_count,
  CASE
    WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4
    THEN 'SHOULD UPDATE (5-letter)'
    WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 3
    THEN 'OK (4-letter)'
    ELSE 'UNKNOWN'
  END as status
FROM personality_profiles
ORDER BY type_code
LIMIT 5;
