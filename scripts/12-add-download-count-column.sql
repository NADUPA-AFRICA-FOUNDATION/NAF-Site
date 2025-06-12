-- Add download_count column to resources table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='resources' AND column_name='download_count') THEN
        ALTER TABLE resources ADD COLUMN download_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add tags column as well for future use
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='resources' AND column_name='tags') THEN
        ALTER TABLE resources ADD COLUMN tags TEXT[] DEFAULT '{}';
    END IF;
END $$;

-- Update existing records to have download_count = 0
UPDATE resources SET download_count = 0 WHERE download_count IS NULL;
