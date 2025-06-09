-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  reference_links TEXT,
  description TEXT,
  category TEXT,
  file_url TEXT,
  file_size TEXT,
  file_type TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at);
CREATE INDEX IF NOT EXISTS idx_resources_featured ON resources(is_featured);
CREATE INDEX IF NOT EXISTS idx_resources_title ON resources(title);

-- Enable Row Level Security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policies for resources table
-- Allow public read access to resources
CREATE POLICY "Allow public read access to resources" ON resources
  FOR SELECT USING (true);

-- Restrict insert/update/delete to authenticated users only
CREATE POLICY "No public insert access to resources" ON resources
  FOR INSERT WITH CHECK (false);

CREATE POLICY "No public update access to resources" ON resources
  FOR UPDATE USING (false);

CREATE POLICY "No public delete access to resources" ON resources
  FOR DELETE USING (false);

-- Add some sample data
INSERT INTO resources (title, description, category, reference_links, is_featured) VALUES
  (
    'Annual Report 2023',
    'Comprehensive overview of our programs, achievements, and financial performance for 2023.',
    'Annual Reports',
    'https://example.com/annual-report-2023.pdf',
    true
  ),
  (
    'Program Impact Overview 2022',
    'Detailed analysis of our program outcomes and community impact across all five counties.',
    'Impact Reports',
    'https://example.com/impact-report-2022.pdf',
    true
  ),
  (
    'Environmental Conservation Summary',
    'Summary of our environmental conservation initiatives and their measurable impact on local ecosystems.',
    'Environmental Reports',
    'https://example.com/environmental-report.pdf',
    false
  ),
  (
    'Financial Transparency Statement',
    'Detailed breakdown of our financial operations, funding sources, and expenditure allocation.',
    'Financial Reports',
    'https://example.com/financial-statement.pdf',
    false
  ),
  (
    'Volunteer Handbook',
    'Complete guide for new volunteers including policies, procedures, and expectations.',
    'Volunteer Resources',
    'https://example.com/volunteer-handbook.pdf',
    false
  ),
  (
    'Community Partnership Guidelines',
    'Framework for establishing and maintaining partnerships with local communities.',
    'Partnership Resources',
    'https://example.com/partnership-guidelines.pdf',
    false
  );

-- Add trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resources_updated_at 
    BEFORE UPDATE ON resources 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
