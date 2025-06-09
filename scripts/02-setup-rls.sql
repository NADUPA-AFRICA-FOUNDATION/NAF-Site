-- Enable Row Level Security on all tables
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_interest ENABLE ROW LEVEL SECURITY;

-- Create policies for contact_messages
CREATE POLICY "Allow insert for contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "No select access for contact messages" ON contact_messages
  FOR SELECT USING (false);

CREATE POLICY "No update access for contact messages" ON contact_messages
  FOR UPDATE USING (false);

CREATE POLICY "No delete access for contact messages" ON contact_messages
  FOR DELETE USING (false);

-- Create policies for volunteer_signups
CREATE POLICY "Allow insert for volunteer signups" ON volunteer_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "No select access for volunteer signups" ON volunteer_signups
  FOR SELECT USING (false);

CREATE POLICY "No update access for volunteer signups" ON volunteer_signups
  FOR UPDATE USING (false);

CREATE POLICY "No delete access for volunteer signups" ON volunteer_signups
  FOR DELETE USING (false);

-- Create policies for donation_interest
CREATE POLICY "Allow insert for donation interest" ON donation_interest
  FOR INSERT WITH CHECK (true);

CREATE POLICY "No select access for donation interest" ON donation_interest
  FOR SELECT USING (false);

CREATE POLICY "No update access for donation interest" ON donation_interest
  FOR UPDATE USING (false);

CREATE POLICY "No delete access for donation interest" ON donation_interest
  FOR DELETE USING (false);
