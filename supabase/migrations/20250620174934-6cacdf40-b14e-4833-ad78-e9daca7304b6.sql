
-- Add tags support and image support to blogs
ALTER TABLE public.blogs ADD COLUMN tags TEXT[] DEFAULT '{}';
ALTER TABLE public.blogs ADD COLUMN featured_image TEXT;

-- Create a tags table for better tag management
CREATE TABLE public.blog_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on tags table
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

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

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Create storage policy for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Users can update their own blog images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own blog images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);
