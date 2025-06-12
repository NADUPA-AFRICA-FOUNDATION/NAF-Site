-- Create admin users table (simplified version)
-- This script creates a simple admin tracking table
-- Admin authentication will use Supabase Auth with email validation

-- Enable RLS on auth.users if not already enabled
-- Note: This may require service role key, so we'll skip for now

-- Create a simple admin emails reference (optional)
CREATE TABLE IF NOT EXISTS admin_emails (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Insert default admin emails
INSERT INTO admin_emails (email, role) VALUES 
  ('admin@nadupa.org', 'admin'),
  ('director@nadupa.org', 'admin'),
  ('manager@nadupa.org', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Enable RLS on admin_emails
ALTER TABLE admin_emails ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_emails (read-only for authenticated users)
CREATE POLICY "Allow read access to admin emails" ON admin_emails
  FOR SELECT USING (true);

-- Grant permissions
GRANT SELECT ON admin_emails TO authenticated;
GRANT SELECT ON admin_emails TO anon;

-- Note: To complete admin setup:
-- 1. Create user accounts in Supabase Auth for each admin email
-- 2. Set strong passwords for each admin account
-- 3. Configure SUPABASE_SERVICE_ROLE_KEY environment variable for full admin features
