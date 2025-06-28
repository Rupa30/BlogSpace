
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
}

interface CreateBlogData {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  featured_image?: string;
  author_id?: string; // Optional, will be set from auth context
  author_name?: string; // Optional, will be set from auth context
}

// export function useBlogs() {
//   return useQuery({
//     queryKey: ['blogs'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('blogs')
//         .select('*')
//         .order('published_at', { ascending: false });

//       if (error) throw error;
//       return data as Blog[];
//     }
//   });
// }

export function useBlogs(userId?: string) {
  return useQuery({
    queryKey: ['blogs', userId],
    queryFn: async () => {
      const query = supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (userId) {
        query.eq('author_id', userId); // ✅ filter by current user
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Success!",
        description: "Blog post created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
