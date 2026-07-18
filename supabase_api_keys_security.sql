-- 1. Add user_id column if it doesn't exist (assuming the auth users table is auth.users)
ALTER TABLE public.api_keys ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 2. Enable Row Level Security (RLS) on the api_keys table
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to ensure users can only SELECT, INSERT, UPDATE, DELETE their own API keys
-- Ensure we drop existing policy if it exists to avoid errors on multiple runs
DROP POLICY IF EXISTS "Users can manage their own API keys" ON public.api_keys;

CREATE POLICY "Users can manage their own API keys" 
ON public.api_keys 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
