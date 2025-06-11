-- Simple volunteer table creation script
-- This creates a basic table that should work in most cases

-- Drop the table if it exists (optional - remove this line to preserve data)
-- DROP TABLE IF EXISTS volunteer_signups;

-- Create the volunteer_signups table with basic structure
CREATE TABLE IF NOT EXISTS volunteer_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic required fields
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  motivation TEXT NOT NULL,
  
  -- Optional fields
  phone TEXT,
  additional_info TEXT,
  area_of_interest TEXT,
  availability TEXT,
  skills TEXT
);

-- Create indexes for better performance
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

-- Grant necessary permissions
GRANT INSERT ON volunteer_signups TO anon;
GRANT INSERT ON volunteer_signups TO authenticated;
