#!/bin/bash

export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
TOKEN=$(cat /Users/joelnewton/Desktop/.supabase-token)
PROJECT_REF="qpjgeuonakbnhdkmkrhl"

# Get database connection pooler URL (this uses connection pooling, no password needed for some operations)
DB_URL="postgresql://postgres.qpjgeuonakbnhdkmkrhl:${SUPABASE_DB_PASSWORD}@aws-0-us-east-2.pooler.supabase.com:6543/postgres"

echo "📊 Running Migration 1: Quiz Questions..."
echo "   (Using corrected spectrum names)"
PGPASSWORD="${SUPABASE_DB_PASSWORD}" psql "$DB_URL" -f /Users/joelnewton/Desktop/sync-quiz-questions-corrected.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration 1: Success!"
else
    echo "❌ Migration 1: Failed - need database password"
    echo ""
    echo "Get password from: https://supabase.com/dashboard/project/${PROJECT_REF}/settings/database"
    exit 1
fi

echo ""
echo "🔧 Running Migration 2: Fix Type Codes..."
PGPASSWORD="${SUPABASE_DB_PASSWORD}" psql "$DB_URL" -f /Users/joelnewton/Desktop/fix-personality-type-codes.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration 2: Success!"
else
    echo "❌ Migration 2: Failed"
    exit 1
fi

echo ""
echo "🎉 All migrations complete!"
