#!/bin/bash

# Fix codes properly by deleting duplicates first
SUPABASE_URL="https://qpjgeuonakbnhdkmkrhl.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_ojj4hci2Q0M5Gcrd8Wt98Q_H5oFdzFR"
TOKEN=$(cat /Users/joelnewton/Desktop/.supabase-token)
PROJECT_REF="qpjgeuonakbnhdkmkrhl"

echo "[arrow.triangle.2.circlepath] Creating safe function to fix codes (delete duplicates first)..."

# Create a function that deletes duplicates THEN updates
SQL_FUNC="
CREATE OR REPLACE FUNCTION fix_personality_codes_safe()
RETURNS TABLE(profiles_updated int, weights_updated int)
LANGUAGE plpgsql
AS \$\$
DECLARE
  profiles_count int;
  weights_count int;
BEGIN
  -- Step 1: Delete duplicate personality_profiles
  DELETE FROM personality_profiles
  WHERE id NOT IN (
    SELECT MIN(id)
    FROM personality_profiles
    GROUP BY
      CASE
        WHEN LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4
        THEN SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
        ELSE type_code
      END
  );

  -- Step 2: Update personality_profiles
  UPDATE personality_profiles
  SET type_code = SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
  WHERE LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4;

  GET DIAGNOSTICS profiles_count = ROW_COUNT;

  -- Step 3: Delete duplicate role_scoring_weights
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

  -- Step 4: Update role_scoring_weights
  UPDATE role_scoring_weights
  SET personality_type = SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
  WHERE LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4;

  GET DIAGNOSTICS weights_count = ROW_COUNT;

  RETURN QUERY SELECT profiles_count, weights_count;
END;
\$\$;
"

echo "$SQL_FUNC" > /tmp/create_safe_function.sql
RESPONSE=$(curl -s -X POST \
    "https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"query\": $(jq -Rs . < /tmp/create_safe_function.sql)}")

if echo "$RESPONSE" | grep -q "error"; then
    echo "[xmark.circle] Error creating function"
    echo "$RESPONSE" | jq '.'
    exit 1
else
    echo "[checkmark.circle] Safe function created!"
fi

echo ""
echo "[rocket.fill] Calling safe function to fix codes..."

# Call the function via RPC
CALL_RESULT=$(curl -s -X POST \
    "$SUPABASE_URL/rest/v1/rpc/fix_personality_codes_safe" \
    -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    -H "Content-Type: application/json")

if echo "$CALL_RESULT" | grep -q "error\|code"; then
    echo "[xmark.circle] Error: $CALL_RESULT"
else
    echo "[checkmark.circle] Update complete!"
    echo "Results: $CALL_RESULT"
fi
