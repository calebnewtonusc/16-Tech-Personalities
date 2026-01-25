# Tech 16 Personalities - Complete Deployment Guide

## ✅ Step 1: GitHub Repository (COMPLETED)

The repository has been created and code pushed:
- **URL**: https://github.com/calebnewtonusc/16TechPersonalities
- **Status**: ✅ Code pushed successfully
- **Commit**: d0ef63a

---

## 🗄️ Step 2: Set Up Supabase Database

### 2.1 Run Database Migrations

1. Go to your Supabase project: https://qpjgeuonakbnhdkmkrhl.supabase.co
2. Click **"SQL Editor"** in the left sidebar
3. Click **"+ New Query"**
4. Open the file: `/database/migrations/001_initial_schema.sql`
5. Copy the **entire contents** and paste into the SQL editor
6. Click **"Run"** button

This creates 5 tables:
- `quiz_versions` - Stores quiz questions with versioning
- `quiz_results` - User results with 5 spectrum scores
- `personality_profiles` - 16 personality type descriptions
- `tech_roles` - Career role information and roadmaps
- `role_scoring_weights` - Personality-to-role fit mappings

### 2.2 Seed the Database

1. In the same SQL Editor, create **another new query**
2. Open the file: `/database/seed.sql`
3. Copy the **entire contents** (47KB file with all data)
4. Paste into the SQL editor
5. Click **"Run"** button

This populates:
- ✅ 16 personality profiles
- ✅ 16 tech roles with learning roadmaps
- ✅ 256 role scoring weights (16 types × 16 roles)
- ✅ 40 quiz questions in version 1

### 2.3 Verify Database Setup

Run this query to verify everything was created:

```sql
SELECT
  (SELECT COUNT(*) FROM personality_profiles) as profiles,
  (SELECT COUNT(*) FROM tech_roles) as roles,
  (SELECT COUNT(*) FROM role_scoring_weights) as weights,
  (SELECT COUNT(*) FROM quiz_versions) as quiz_versions;
```

Expected output:
- profiles: 16
- roles: 16
- weights: 256
- quiz_versions: 1

---

## 🔐 Step 3: Configure Authentication

1. Go to https://qpjgeuonakbnhdkmkrhl.supabase.co
2. Click **"Authentication"** in the left sidebar
3. Click **"Providers"**
4. Enable **"Email"** provider (should be enabled by default)
5. (Optional) Enable **"Google"** provider:
   - Add Google OAuth credentials
   - Configure redirect URLs

---

## 🚀 Step 4: Deploy to Vercel

### 4.1 Import Project to Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose **`calebnewtonusc/16TechPersonalities`**
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 4.2 Add Environment Variables

In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://qpjgeuonakbnhdkmkrhl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_ojj4hci2Q0M5Gcrd8Wt98Q_H5oFdzFR
NEXT_PUBLIC_BASE_URL=https://your-vercel-url.vercel.app
```

**Note**: Update `NEXT_PUBLIC_BASE_URL` with your actual Vercel deployment URL after first deployment.

### 4.3 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Visit your deployment URL

### 4.4 Update Base URL

After first deployment:
1. Copy your Vercel URL (e.g., `https://16-tech-personalities.vercel.app`)
2. Go to Vercel → Project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_BASE_URL` with the actual URL
4. Redeploy (Deployments → ... → Redeploy)

---

## ✅ Step 5: Verify Deployment

### Test the Application

1. **Landing Page**: Visit your Vercel URL
   - Should show landing page with features
   - Check that styling loads correctly

2. **Quiz**: Click "Take the Quiz"
   - Should show 40 questions
   - Progress bar should work
   - Can navigate between questions
   - Can save progress (stored in localStorage)

3. **Results**: Complete the quiz
   - Should show personality type (e.g., "B-U-E-V-A")
   - Radar chart should display
   - Spectrum bars should show percentages
   - Role recommendations should appear

4. **Authentication** (if testing):
   - Try signing up with email
   - Check that Supabase Auth works
   - Verify dashboard access

### Common Issues

**Issue**: "Invalid Supabase URL"
- **Fix**: Verify `NEXT_PUBLIC_SUPABASE_URL` in Vercel environment variables

**Issue**: Database queries fail
- **Fix**: Ensure migrations ran successfully in Supabase SQL Editor

**Issue**: Authentication doesn't work
- **Fix**: Check that Email provider is enabled in Supabase Auth settings

**Issue**: Build fails
- **Fix**: Check build logs in Vercel, likely missing environment variables

---

## 📊 Step 6: Monitor and Maintain

### Supabase Dashboard

Monitor your database at https://qpjgeuonakbnhdkmkrhl.supabase.co:
- **Database**: View tables, run queries
- **Authentication**: See user signups
- **Logs**: Check for errors

### Vercel Dashboard

Monitor your deployment at https://vercel.com:
- **Deployments**: View build logs
- **Analytics**: Track visitors (if enabled)
- **Logs**: Runtime errors

---

## 🎉 Success Checklist

- [ ] GitHub repo created and code pushed
- [ ] Supabase database migrations ran successfully
- [ ] Database seeded with 16 personalities + 16 roles
- [ ] Email auth enabled in Supabase
- [ ] Vercel project imported
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Base URL updated and redeployed
- [ ] Quiz works end-to-end
- [ ] Results page displays correctly
- [ ] Authentication works (if testing)

---

## 🔗 Quick Links

- **GitHub**: https://github.com/calebnewtonusc/16TechPersonalities
- **Supabase**: https://qpjgeuonakbnhdkmkrhl.supabase.co
- **Vercel**: (Add after deployment)

---

## 📝 Next Steps After Deployment

1. **Custom Domain** (optional):
   - Add custom domain in Vercel settings
   - Update `NEXT_PUBLIC_BASE_URL` to custom domain

2. **Google OAuth** (optional):
   - Set up Google OAuth in Supabase
   - Add redirect URLs for production

3. **Monitoring**:
   - Set up error tracking (Sentry, LogRocket)
   - Enable Vercel Analytics

4. **Content Management**:
   - Use Admin CMS at `/admin` to edit personalities and roles
   - Update quiz questions by creating new quiz version

---

**All done! Your Tech 16 Personalities application is ready to use.**
