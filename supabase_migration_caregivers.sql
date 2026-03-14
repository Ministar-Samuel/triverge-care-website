-- Migration: Add zoom_link to appointments + create caregivers table
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Add zoom_link to appointments
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS zoom_link text;

-- 2. Create caregivers table
CREATE TABLE IF NOT EXISTS caregivers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  years_experience text,
  specializations text[],
  availability text,
  bio text,
  cv_url text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Enable RLS on caregivers (allow public insert for form submissions)
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON caregivers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON caregivers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON caregivers
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON caregivers
  FOR DELETE USING (auth.role() = 'authenticated');
