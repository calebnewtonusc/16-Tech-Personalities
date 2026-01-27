# 🚀 Tech16 Database Migration Instructions

I've opened the Supabase SQL Editor for you!

## Quick 2-Step Process:

### Step 1: Run Quiz Questions Migration (2 minutes)

1. **Copy the entire contents** of this file:
   ```
   ~/Desktop/sync-quiz-questions-fixed.sql
   ```

2. **Paste into the SQL Editor** (already open in your browser)

3. **Click "Run"** (or press Cmd+Enter)

4. **Wait for "Success. No rows returned"** message

### Step 2: Run Type Code Fix Migration (1 minute)

1. **Click "+ New query"** button (top right)

2. **Copy the entire contents** of this file:
   ```
   ~/Desktop/fix-personality-type-codes.sql
   ```

3. **Paste into the new SQL Editor tab**

4. **Click "Run"** (or press Cmd+Enter)

5. **Wait for success message**

---

## ✅ Verification

After both migrations run successfully, verify in the SQL Editor:

```sql
-- Check personality profiles (should see 16 rows with 4-letter codes)
SELECT type_code, name, tagline FROM personality_profiles ORDER BY type_code;

-- Check quiz questions (should see 40 questions)
SELECT jsonb_array_length(questions->'questions') as question_count
FROM quiz_versions WHERE is_active = true;
```

---

## 🎉 Done!

After migrations complete:
1. Test the quiz locally
2. Deploy to 16techpersonalities.com

Your token is saved at: `~/Desktop/.supabase-token`
