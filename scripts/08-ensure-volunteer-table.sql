-- Ensure the volunteer_signups table exists with basic structure
-- This script is safe to run multiple times

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS volunteer_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add basic required columns if they don't exist
DO $$ 
BEGIN 
    -- Add first_name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='first_name') THEN
        ALTER TABLE volunteer_signups ADD COLUMN first_name TEXT;
    END IF;

    -- Add last_name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='last_name') THEN
        ALTER TABLE volunteer_signups ADD COLUMN last_name TEXT;
    END IF;

    -- Add email column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='email') THEN
        ALTER TABLE volunteer_signups ADD COLUMN email TEXT;
    END IF;

    -- Add motivation column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='motivation') THEN
        ALTER TABLE volunteer_signups ADD COLUMN motivation TEXT;
    END IF;

    -- Add phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='phone') THEN
        ALTER TABLE volunteer_signups ADD COLUMN phone TEXT;
    END IF;

    -- Add additional_info column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='additional_info') THEN
        ALTER TABLE volunteer_signups ADD COLUMN additional_info TEXT;
    END IF;

    -- Add area_of_interest as text column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='area_of_interest') THEN
        ALTER TABLE volunteer_signups ADD COLUMN area_of_interest TEXT;
    END IF;

    -- Add availability as text column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='availability') THEN
        ALTER TABLE volunteer_signups ADD COLUMN availability TEXT;
    END IF;

    -- Add skills as text column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='skills') THEN
        ALTER TABLE volunteer_signups ADD COLUMN skills TEXT;
    END IF;

    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='updated_at') THEN
        ALTER TABLE volunteer_signups ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_created_at ON volunteer_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_email ON volunteer_signups(email);

-- Enable Row Level Security
ALTER TABLE volunteer_signups ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow insert for volunteer signups" ON volunteer_signups;
DROP POLICY IF EXISTS "No select access for volunteer signups" ON volunteer_signups;
DROP POLICY IF EXISTS "No update access for volunteer signups" ON volunteer_signups;
DROP POLICY IF EXISTS "No delete access for volunteer signups" ON volunteer_signups;

-- Create policies for volunteer_signups
CREATE POLICY "Allow insert for volunteer signups" ON volunteer_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "No select access for volunteer signups" ON volunteer_signups
  FOR SELECT USING (false);

CREATE POLICY "No update access for volunteer signups" ON volunteer_signups
  FOR UPDATE USING (false);

CREATE POLICY "No delete access for volunteer signups" ON volunteer_signups
  FOR DELETE USING (false);
