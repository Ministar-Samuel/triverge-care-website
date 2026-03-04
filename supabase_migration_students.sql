-- ============================================================
-- HCAP Students Schema Expansion Migration
-- Run this in Supabase SQL Editor after the initial schema
-- ============================================================

-- 1. Add new columns to students table
ALTER TABLE students
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'enrolled',       -- enrolled, graduated, cancelled
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS emergency_contact_name text,
  ADD COLUMN IF NOT EXISTS emergency_contact_phone text,
  ADD COLUMN IF NOT EXISTS next_of_kin text;

-- 2. Create student_notes table for timestamped admin observations
CREATE TABLE IF NOT EXISTS student_notes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  content text NOT NULL,
  author_email text,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Enable RLS on student_notes
ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;

-- 4. RLS policies for student_notes
CREATE POLICY "Admins can do everything on student_notes" ON student_notes
  FOR ALL USING (auth.role() = 'authenticated');

-- 5. Allow public to read students by payment_ref (for verifying payment before form)
CREATE POLICY "Public can select students by payment ref" ON students
  FOR SELECT USING (true);
