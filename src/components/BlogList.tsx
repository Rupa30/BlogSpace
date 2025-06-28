import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export function BlogList() {
  const { user } = useAuth();
  const [view, setView] = useState<'my-posts' | 'explore'>('my-posts');

  // Pass user?.id explicitly to enable query
  const {
    data: myBlogs,
    isLoading: loadingMy,
    error: errorMy,
  } = useBlogs(user?.id, false); // fetch blogs by current user

  const {
    data: publicBlogs,
    isLoading: loadingPublic,
    error: errorPublic,
  } = useBlogs(undefined, true); // fetch public blogs only

  const blogs = view === 'my-posts' ? myBlogs : publicBlogs;
  const isLoading = view === 'my-posts' ? loadingMy : loadingPublic;
  const error = view === 'my-posts' ? errorMy : errorPublic;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {view === 'my-posts' ? 'My Blog Posts' : 'Explore Public Blogs'}
        </h2>
        <Button
          onClick={() =>
            setView((prev) => (prev === 'my-posts' ? 'explore' : 'my-posts'))
          }
        >
          {view === 'my-posts' ? 'Explore Public Blogs' : 'Show My Posts'}
        </Button>
      </div>

      {isLoading && (
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
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">Error loading blogs. Please try again.</p>
        </div>
      )}

      {!isLoading && blogs?.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
          <p className="text-gray-600">
            {view === 'my-posts'
              ? 'You haven’t posted anything yet.'
              : 'No public blogs available.'}
          </p>
        </div>
      )}

      {!isLoading && blogs && blogs.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-medium text-sm">
                    {blog.author_name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-500">
                    By {blog.author_name} • {formatDistanceToNow(new Date(blog.published_at))} ago
                  </span>
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
      )}
    </div>
  );
}
