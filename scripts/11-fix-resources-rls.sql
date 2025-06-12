-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow insert for resources" ON resources;
DROP POLICY IF EXISTS "Allow select for resources" ON resources;
DROP POLICY IF EXISTS "Allow update for resources" ON resources;
DROP POLICY IF EXISTS "Allow delete for resources" ON resources;

-- Create new policies for resources table
CREATE POLICY "Allow public read access for resources" ON resources
  FOR SELECT USING (true);

CREATE POLICY "Allow insert for resources" ON resources
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for resources" ON resources
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete for resources" ON resources
  FOR DELETE USING (true);

-- Ensure RLS is enabled
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
