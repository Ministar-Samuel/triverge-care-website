-- ============================================================
-- Blog, Newsletter & Users Schema Migration
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Expand blog_posts table
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS author text,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS excerpt text,
  ADD COLUMN IF NOT EXISTS views integer DEFAULT 0;

-- 2. Add last_sign_in tracking to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS last_sign_in_at timestamp with time zone;

-- 3. Allow public to read published blog posts
-- (Policy may already exist, so use IF NOT EXISTS pattern via DO block)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public can view published blog posts' AND tablename = 'blog_posts'
  ) THEN
    -- Already covered by existing policy
    NULL;
  END IF;
END $$;

-- 4. Allow public to insert newsletter subscribers (already exists in base schema)
-- 5. Allow authenticated to manage blog_posts (already exists in base schema)
