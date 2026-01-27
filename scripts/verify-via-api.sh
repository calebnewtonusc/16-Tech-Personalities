#!/bin/bash

# Verify Tech16 Database via Supabase API
TOKEN=$(cat /Users/joelnewton/Desktop/.supabase-token)
PROJECT_REF="qpjgeuonakbnhdkmkrhl"

echo "🔍 Verifying Tech16 Database Migrations"
echo "========================================"
echo ""

# Function to execute SQL and display results
query_db() {
    local QUERY=$1
    local TITLE=$2

    echo "📊 $TITLE"
    echo "----------------------------------------"

    RESPONSE=$(curl -s -X POST \
        "https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query" \
        -H "Authorization: Bearer ${TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{\"query\": $(jq -Rs . <<<"$QUERY")}")

    echo "$RESPONSE" | jq '.'
    echo ""
}

# 1. Check personality profiles count
query_db "SELECT COUNT(*) as total_personalities, COUNT(DISTINCT type_code) as unique_codes FROM personality_profiles;" "Personality Profiles Count"

# 2. Show all personality type codes
query_db "SELECT type_code, name, category, LENGTH(type_code) as code_length FROM personality_profiles ORDER BY type_code;" "All Personality Type Codes"

# 3. Check quiz questions count
query_db "SELECT id, version, is_active, jsonb_array_length(questions->'questions') as question_count FROM quiz_versions WHERE is_active = true;" "Quiz Questions Count"

# 4. Check role_scoring_weights stats
query_db "SELECT COUNT(*) as total_weights, COUNT(DISTINCT personality_type) as unique_personality_types, COUNT(DISTINCT role_id) as unique_roles FROM role_scoring_weights;" "Role Scoring Weights Stats"

echo "✅ Verification complete!"
