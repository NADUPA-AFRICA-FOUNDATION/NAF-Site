-- Fresh volunteer application table
-- Drop existing table and start clean
DROP TABLE IF EXISTS volunteer_applications CASCADE;

-- Create new volunteer applications table
CREATE TABLE volunteer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Volunteer Information
  motivation TEXT NOT NULL,
  areas_of_interest TEXT NOT NULL, -- Comma-separated values
  availability TEXT NOT NULL,      -- Comma-separated values
  skills TEXT,                     -- Comma-separated values
  additional_info TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending',
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT
);

-- Create indexes
CREATE INDEX idx_volunteer_applications_created_at ON volunteer_applications(created_at);
CREATE INDEX idx_volunteer_applications_email ON volunteer_applications(email);
CREATE INDEX idx_volunteer_applications_status ON volunteer_applications(status);

-- Enable RLS
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public insert" ON volunteer_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "No public select" ON volunteer_applications
  FOR SELECT USING (false);

-- Grant permissions
GRANT INSERT ON volunteer_applications TO anon;
GRANT INSERT ON volunteer_applications TO authenticated;
