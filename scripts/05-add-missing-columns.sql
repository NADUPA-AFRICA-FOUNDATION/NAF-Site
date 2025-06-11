-- Add missing columns to existing tables if they don't exist
-- This script is safe to run multiple times

-- Add name column to contact_messages if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='contact_messages' AND column_name='name') THEN
        ALTER TABLE contact_messages ADD COLUMN name TEXT;
    END IF;
END $$;

-- Add additional_info column to volunteer_signups if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='additional_info') THEN
        ALTER TABLE volunteer_signups ADD COLUMN additional_info TEXT;
    END IF;
END $$;

-- Update existing records to populate name field from first_name and last_name
UPDATE contact_messages 
SET name = CONCAT(first_name, ' ', last_name) 
WHERE name IS NULL AND first_name IS NOT NULL AND last_name IS NOT NULL;
