-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT, -- Add name field for compatibility
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create volunteer_signups table
CREATE TABLE IF NOT EXISTS volunteer_signups (
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
  additional_info TEXT, -- Add this missing column
  agree_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donation_interest table
CREATE TABLE IF NOT EXISTS donation_interest (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  donation_amount DECIMAL(10,2),
  custom_amount DECIMAL(10,2),
  payment_method TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_created_at ON volunteer_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_email ON volunteer_signups(email);
CREATE INDEX IF NOT EXISTS idx_donation_interest_created_at ON donation_interest(created_at);
CREATE INDEX IF NOT EXISTS idx_donation_interest_email ON donation_interest(email);
