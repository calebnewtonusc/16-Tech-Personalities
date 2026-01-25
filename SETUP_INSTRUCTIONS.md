# Tech 16 Personalities - Setup Instructions

## Step 1: Run Database Migrations

1. Go to your Supabase project: https://qpjgeuonakbnhdkmkrhl.supabase.co
2. Click on "SQL Editor" in the left sidebar
3. Click "+ New Query"
4. Copy the entire contents of `/database/migrations/001_initial_schema.sql`
5. Paste into the SQL editor
6. Click "Run" button

This will create all necessary tables:
- `quiz_versions` - Stores quiz questions with versioning
- `quiz_results` - User quiz results with spectrum scores
- `personality_profiles` - 16 personality type descriptions
- `tech_roles` - Career role information and roadmaps
- `role_scoring_weights` - Personality-to-role fit mappings

## Step 2: Seed the Database

1. In the same SQL Editor, create another new query
2. Copy the entire contents of `/database/seed.sql`
3. Paste into the SQL editor
4. Click "Run" button

This will populate:
- 16 personality profiles
- 16 tech roles with learning roadmaps
- 256 role scoring weights (16 types × 16 roles)
- 40 quiz questions in version 1

## Step 3: Get Your Anon Key

The publishable key you provided might not be the correct one. To get the proper anon key:

1. Go to https://qpjgeuonakbnhdkmkrhl.supabase.co
2. Click "Settings" (gear icon) in the left sidebar
3. Click "API" under Project Settings
4. Under "Project API keys", copy the **"anon" / "public"** key
   - It should start with `eyJ...` (it's a JWT token)
5. Update `/frontend/.env.local` with this key:

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... (your actual anon key)
```

## Step 4: Enable Authentication

1. Go to https://qpjgeuonakbnhdkmkrhl.supabase.co
2. Click "Authentication" in the left sidebar
3. Click "Providers"
4. Enable "Email" provider
5. (Optional) Enable "Google" provider for OAuth

## Step 5: Start Development Server

```bash
cd /Users/joelnewton/Desktop/2026\ Code/Projects/Big-Projects/16TechPersonalities/frontend
npm run dev
```

Visit http://localhost:3000

## Troubleshooting

If you get authentication errors:
- Double-check your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Make sure it starts with `eyJ`
- Verify the URL is `https://qpjgeuonakbnhdkmkrhl.supabase.co`

If database queries fail:
- Check that migrations ran successfully in SQL Editor
- Verify seed data was inserted
- Check Supabase logs for errors

## What's Next

Once the server is running:
1. Visit the landing page
2. Click "Take the Quiz"
3. Answer 40 questions
4. View your results with personality type
5. Get role recommendations with learning roadmaps
6. Download your results card
7. Share or compare results

Optionally:
- Create an account to save results
- Visit /admin for the CMS (if you set up admin access)
- Customize personality profiles and roles
