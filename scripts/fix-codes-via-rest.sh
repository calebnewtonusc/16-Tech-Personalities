#!/bin/bash

# Try using Supabase REST API to update codes
SUPABASE_URL="https://qpjgeuonakbnhdkmkrhl.supabase.co"
SUPABASE_ANON_KEY="sb_publishable_ojj4hci2Q0M5Gcrd8Wt98Q_H5oFdzFR"

echo "🔄 Creating temporary SQL function to update codes..."

# Create a function to do the update
SQL_FUNC="
CREATE OR REPLACE FUNCTION fix_personality_codes()
RETURNS void
LANGUAGE plpgsql
AS \$\$
BEGIN
  -- Update personality_profiles
  UPDATE personality_profiles
  SET type_code = SUBSTRING(type_code FROM 1 FOR LENGTH(type_code) - 2)
  WHERE LENGTH(type_code) - LENGTH(REPLACE(type_code, '-', '')) = 4;

  -- Update role_scoring_weights
  UPDATE role_scoring_weights
  SET personality_type = SUBSTRING(personality_type FROM 1 FOR LENGTH(personality_type) - 2)
  WHERE LENGTH(personality_type) - LENGTH(REPLACE(personality_type, '-', '')) = 4;
END;
\$\$;
"

# Try to execute via Management API
TOKEN=$(cat /Users/joelnewton/Desktop/.supabase-token)
PROJECT_REF="qpjgeuonakbnhdkmkrhl"

echo "$SQL_FUNC" > /tmp/create_function.sql
RESPONSE=$(curl -s -X POST \
    "https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"query\": $(jq -Rs . < /tmp/create_function.sql)}")

if echo "$RESPONSE" | grep -q "error"; then
    echo "❌ Error creating function"
    echo "$RESPONSE"
    exit 1
else
    echo "✅ Function created!"
fi

echo ""
echo "🚀 Calling function to fix codes..."

# Call the function via RPC
CALL_RESULT=$(curl -s -X POST \
    "$SUPABASE_URL/rest/v1/rpc/fix_personality_codes" \
    -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
    -H "Content-Type: application/json")

echo "Result: $CALL_RESULT"
echo "✅ Update complete!"
