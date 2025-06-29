import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author_id: string;
  author_name: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  featured_image: string | null;
  is_public: boolean;
}

interface CreateBlogData {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  featured_image?: string;
  is_public?: boolean; 
}

export function useBlogs(userId?: string) {
  return useQuery({
    queryKey: ['blogs', userId],
    queryFn: async () => {
      const query = supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (userId) {
        query.eq('author_id', userId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}


export function useCreateBlog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (blogData: CreateBlogData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      const { data, error } = await supabase
        .from('blogs')
        .insert({
          ...blogData,
          author_id: user.id,
          author_name: profile?.full_name || 'Anonymous',
          published_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] }); 

      if (variables.is_public) {
        toast({
          title: "Published!",
          description: "Your public blog post is now live.",
        });
      } else {
        toast({
          title: "Saved!",
          description: "Your private blog post was created.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to create blog post.",
        variant: "destructive",
      });
    },
  });
}
