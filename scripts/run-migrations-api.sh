#!/bin/bash

# Run Tech16 Database Migrations using Supabase Management API
# This script executes SQL files directly via the API

TOKEN=$(cat /Users/joelnewton/Desktop/.supabase-token)
PROJECT_REF="qpjgeuonakbnhdkmkrhl"

echo "🔗 Connecting to Supabase project: $PROJECT_REF"
echo ""

# Function to execute SQL file via API
execute_sql() {
    local SQL_FILE=$1
    local DESCRIPTION=$2

    echo "📊 $DESCRIPTION..."

    # Read SQL file
    SQL_CONTENT=$(cat "$SQL_FILE")

    # Execute via Management API
    RESPONSE=$(curl -s -X POST \
        "https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query" \
        -H "Authorization: Bearer ${TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{\"query\": $(jq -Rs . <<<"$SQL_CONTENT")}")

    # Check for errors
    if echo "$RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
        echo "❌ Error: $(echo "$RESPONSE" | jq -r '.error.message')"
        return 1
    else
        echo "✅ Success!"
        return 0
    fi
}

# Run migrations
execute_sql "/Users/joelnewton/Desktop/sync-quiz-questions-fixed.sql" "Running migration 1: Quiz Questions"
echo ""
execute_sql "/Users/joelnewton/Desktop/fix-personality-type-codes-safe.sql" "Running migration 2: Fix Personality Type Codes (Safe Version)"
echo ""

echo "🎉 All migrations complete!"
echo ""
echo "📝 Next steps:"
echo "1. Test the app locally"
echo "2. Deploy to 16techpersonalities.com"
