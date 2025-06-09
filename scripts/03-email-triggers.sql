-- Create a notification function that logs submissions instead of calling an external function
CREATE OR REPLACE FUNCTION log_new_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Log the submission to the Postgres logs
  RAISE NOTICE 'New submission in %: % %', 
    TG_TABLE_NAME, 
    CASE 
      WHEN TG_TABLE_NAME = 'contact_messages' THEN NEW.first_name || ' ' || NEW.last_name
      WHEN TG_TABLE_NAME = 'volunteer_signups' THEN NEW.first_name || ' ' || NEW.last_name
      WHEN TG_TABLE_NAME = 'donation_interest' THEN NEW.full_name
    END,
    NEW.email;
  
  -- In the future, you could implement a notification system here
  -- using pg_notify or another approach that doesn't require external HTTP calls
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each table
CREATE TRIGGER contact_messages_log_trigger
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION log_new_submission();

CREATE TRIGGER volunteer_signups_log_trigger
  AFTER INSERT ON volunteer_signups
  FOR EACH ROW
  EXECUTE FUNCTION log_new_submission();

CREATE TRIGGER donation_interest_log_trigger
  AFTER INSERT ON donation_interest
  FOR EACH ROW
  EXECUTE FUNCTION log_new_submission();

-- Note: Email notifications are now handled directly in the server actions
-- rather than through database triggers to avoid deployment issues
