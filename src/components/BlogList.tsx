
import { useBlogs } from '@/hooks/useBlogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

export function BlogList() {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading blogs. Please try again.</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
        <p className="text-gray-600">Be the first to create a blog post!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
            <div className="text-sm text-gray-500">
              By {blog.author_name} • {formatDistanceToNow(new Date(blog.published_at))} ago
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 line-clamp-3">
              {blog.excerpt || blog.content.substring(0, 150) + '...'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
