-- Migration: Add email column to appointments table
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

ALTER TABLE appointments ADD COLUMN IF NOT EXISTS email text;
