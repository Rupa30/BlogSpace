import { useState, useMemo } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { useDeleteBlog } from '@/hooks/useBlogOperations';
import { BlogCard } from '@/components/BlogCard';
import { BlogReader } from '@/components/BlogReader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author_id: string;
  author_name: string;
  published_at: string;
  tags: string[] | null;
  featured_image: string | null;
}

interface EnhancedBlogListProps {
  showActions?: boolean;
  onEdit?: (blog: Blog) => void;
  onlyMyBlogs?: boolean; // ✅ new prop
}

export function EnhancedBlogList({
  showActions = false,
  onEdit,
  onlyMyBlogs = false,
}: EnhancedBlogListProps) {
  const { data: blogs, isLoading, error } = useBlogs();
  const deleteBlogMutation = useDeleteBlog();
  const { user } = useAuth();

  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [itemsToShow, setItemsToShow] = useState(6);

  // ✅ Filter based on onlyMyBlogs
  const filteredSource = useMemo(() => {
    if (!blogs) return [];
    if (onlyMyBlogs && user?.id) {
      return blogs.filter(blog => blog.author_id === user.id);
    }
    return blogs;
  }, [blogs, onlyMyBlogs, user]);

  // ✅ All Tags for filtering
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    filteredSource.forEach(blog => {
      blog.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [filteredSource]);

  // ✅ Final Filtered Blogs
  const filteredBlogs = useMemo(() => {
    return filteredSource.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.author_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || blog.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [filteredSource, searchTerm, selectedTag]);

  const displayedBlogs = filteredBlogs.slice(0, itemsToShow);

  const handleDelete = (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogMutation.mutate(blogId);
    }
  };

  const loadMore = () => {
    setItemsToShow(prev => prev + 6);
  };

  // Skeletons and error
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400">Error loading blogs. Please try again.</p>
      </div>
    );
  }

  if (!filteredSource || filteredSource.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {onlyMyBlogs ? "You haven't created any blogs yet." : "No blogs yet"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {onlyMyBlogs ? "Start writing your first post!" : "Be the first to create a blog post!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedTag === null ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                All
              </Badge>
              {allTags.slice(0, 5).map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Blog Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onView={setSelectedBlog}
            onEdit={onEdit}
            onDelete={handleDelete}
            showActions={showActions}
          />
        ))}
      </div>

      {/* Load More */}
      {filteredBlogs.length > itemsToShow && (
        <div className="text-center">
          <Button onClick={loadMore} variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      )}

      {/* Blog Modal */}
      <BlogReader 
        blog={selectedBlog}
        open={!!selectedBlog}
        onOpenChange={(open) => !open && setSelectedBlog(null)}
      />
    </div>
  );
}
