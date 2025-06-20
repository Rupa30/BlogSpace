
-- Check if featured_image column exists and add it if it doesn't
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blogs' AND column_name='featured_image') THEN
        ALTER TABLE public.blogs ADD COLUMN featured_image TEXT;
    END IF;
END $$;

-- Create a tags table for better tag management (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.blog_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on tags table
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can view tags" ON public.blog_tags;
DROP POLICY IF EXISTS "Authenticated users can create tags" ON public.blog_tags;

-- Allow everyone to read tags
CREATE POLICY "Anyone can view tags" 
  ON public.blog_tags 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Only authenticated users can create tags
CREATE POLICY "Authenticated users can create tags" 
  ON public.blog_tags 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create storage bucket for blog images (only if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
SELECT 'blog-images', 'blog-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'blog-images');

-- Drop existing storage policies if they exist and recreate them
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own blog images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own blog images" ON storage.objects;

-- Create storage policy for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Users can update their own blog images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own blog images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);
