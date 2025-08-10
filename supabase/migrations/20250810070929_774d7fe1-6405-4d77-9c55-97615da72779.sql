
-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create API keys table for users
CREATE TABLE public.api_keys (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  key_name text NOT NULL,
  api_key text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create TTS usage logs table
CREATE TABLE public.tts_usage_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  api_key_id uuid REFERENCES public.api_keys ON DELETE SET NULL,
  text_input text NOT NULL,
  voice_used text NOT NULL,
  success boolean DEFAULT true,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tts_usage_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for API keys
CREATE POLICY "Users can view own API keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own API keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys" ON public.api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for usage logs
CREATE POLICY "Users can view own usage logs" ON public.tts_usage_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage logs" ON public.tts_usage_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to generate API keys
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS text AS $$
BEGIN
  RETURN 'mjak_' || encode(gen_random_bytes(32), 'base64');
END;
$$ LANGUAGE plpgsql;
