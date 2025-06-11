-- Add missing columns to volunteer_signups table if they don't exist
DO $$ 
BEGIN 
    -- Add address column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='address') THEN
        ALTER TABLE volunteer_signups ADD COLUMN address TEXT;
    END IF;

    -- Add city column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='city') THEN
        ALTER TABLE volunteer_signups ADD COLUMN city TEXT;
    END IF;

    -- Add country column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='country') THEN
        ALTER TABLE volunteer_signups ADD COLUMN country TEXT;
    END IF;

    -- Add gender column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='gender') THEN
        ALTER TABLE volunteer_signups ADD COLUMN gender TEXT;
    END IF;

    -- Add date_of_birth column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='date_of_birth') THEN
        ALTER TABLE volunteer_signups ADD COLUMN date_of_birth DATE;
    END IF;

    -- Add emergency_contact_name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='emergency_contact_name') THEN
        ALTER TABLE volunteer_signups ADD COLUMN emergency_contact_name TEXT;
    END IF;

    -- Add emergency_contact_phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='emergency_contact_phone') THEN
        ALTER TABLE volunteer_signups ADD COLUMN emergency_contact_phone TEXT;
    END IF;

    -- Add area_of_interest column if it doesn't exist (TEXT ARRAY)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='area_of_interest') THEN
        ALTER TABLE volunteer_signups ADD COLUMN area_of_interest TEXT[] DEFAULT '{}';
    END IF;

    -- Add availability column if it doesn't exist (TEXT ARRAY)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='availability') THEN
        ALTER TABLE volunteer_signups ADD COLUMN availability TEXT[] DEFAULT '{}';
    END IF;

    -- Add skills column if it doesn't exist (TEXT ARRAY)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='skills') THEN
        ALTER TABLE volunteer_signups ADD COLUMN skills TEXT[] DEFAULT '{}';
    END IF;

    -- Add languages column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='languages') THEN
        ALTER TABLE volunteer_signups ADD COLUMN languages TEXT;
    END IF;

    -- Add previous_experience column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='previous_experience') THEN
        ALTER TABLE volunteer_signups ADD COLUMN previous_experience TEXT;
    END IF;

    -- Add heard_about_us column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='heard_about_us') THEN
        ALTER TABLE volunteer_signups ADD COLUMN heard_about_us TEXT;
    END IF;

    -- Add commitment_length column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='commitment_length') THEN
        ALTER TABLE volunteer_signups ADD COLUMN commitment_length TEXT;
    END IF;

    -- Add start_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='start_date') THEN
        ALTER TABLE volunteer_signups ADD COLUMN start_date DATE;
    END IF;

    -- Add references column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='references') THEN
        ALTER TABLE volunteer_signups ADD COLUMN references TEXT;
    END IF;

    -- Add agree_to_terms column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='volunteer_signups' AND column_name='agree_to_terms') THEN
        ALTER TABLE volunteer_signups ADD COLUMN agree_to_terms BOOLEAN DEFAULT FALSE;
    END IF;
END $$;
