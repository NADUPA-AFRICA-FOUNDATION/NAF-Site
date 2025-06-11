-- Drop and recreate the volunteer_signups table with all necessary columns
-- WARNING: This will delete all existing volunteer data!
-- Only run this if you're okay with losing existing volunteer applications

DROP TABLE IF EXISTS volunteer_signups CASCADE;

-- Create complete volunteer_signups table
CREATE TABLE volunteer_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  motivation TEXT NOT NULL,
  area_of_interest TEXT[] DEFAULT '{}',
  availability TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  languages TEXT,
  previous_experience TEXT,
  heard_about_us TEXT,
  commitment_length TEXT,
  start_date DATE,
  references TEXT,
  additional_info TEXT,
  agree_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_created_at ON volunteer_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_email ON volunteer_signups(email);

-- Enable Row Level Security
ALTER TABLE volunteer_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for volunteer_signups
CREATE POLICY "Allow insert for volunteer signups" ON volunteer_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "No select access for volunteer signups" ON volunteer_signups
  FOR SELECT USING (false);

CREATE POLICY "No update access for volunteer signups" ON volunteer_signups
  FOR UPDATE USING (false);

CREATE POLICY "No delete access for volunteer signups" ON volunteer_signups
  FOR DELETE USING (false);
