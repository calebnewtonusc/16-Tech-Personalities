#!/bin/bash

# Run Tech16 Database Migrations
# Usage: ./run-migrations.sh YOUR_SUPABASE_ACCESS_TOKEN

if [ -z "$1" ]; then
    echo "Error: Please provide your Supabase access token"
    echo "Usage: ./run-migrations.sh YOUR_ACCESS_TOKEN"
    echo ""
    echo "Get your token from: https://supabase.com/dashboard/account/tokens"
    exit 1
fi

TOKEN=$1
PROJECT_REF="qpjgeuonakbnhdkmkrhl"

echo "🔗 Linking to Supabase project..."
export SUPABASE_ACCESS_TOKEN=$TOKEN
supabase link --project-ref $PROJECT_REF

echo ""
echo "📊 Running migration 1: Quiz Questions..."
supabase db execute --file /Users/joelnewton/Desktop/sync-quiz-questions-fixed.sql

echo ""
echo "🔧 Running migration 2: Fix Personality Type Codes..."
supabase db execute --file /Users/joelnewton/Desktop/fix-personality-type-codes.sql

echo ""
echo "✅ Migrations complete!"
echo ""
echo "🧪 Testing database..."
supabase db execute --command "SELECT type_code, name FROM personality_profiles ORDER BY type_code LIMIT 5;"

echo ""
echo "🎉 All done! Your database is ready for deployment."
