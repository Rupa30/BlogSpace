
// import { useBlogs } from '@/hooks/useBlogs';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { formatDistanceToNow } from 'date-fns';

// export function BlogList() {
//   const { data: blogs, isLoading, error } = useBlogs();

//   if (isLoading) {
//     return (
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <Card key={i} className="animate-pulse">
//             <CardHeader>
//               <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="h-3 bg-gray-200 rounded"></div>
//                 <div className="h-3 bg-gray-200 rounded w-5/6"></div>
//                 <div className="h-3 bg-gray-200 rounded w-4/6"></div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-500">Error loading blogs. Please try again.</p>
//       </div>
//     );
//   }

//   if (!blogs || blogs.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
//         <p className="text-gray-600">Be the first to create a blog post!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {blogs.map((blog) => (
//         <Card key={blog.id} className="hover:shadow-lg transition-shadow">
//           <CardHeader>
//             <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
//             <div className="text-sm text-gray-500">
//               By {blog.author_name} • {formatDistanceToNow(new Date(blog.published_at))} ago
//             </div>
//           </CardHeader>
//           <CardContent>
//             <p className="text-gray-600 line-clamp-3">
//               {blog.excerpt || blog.content.substring(0, 150) + '...'}
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }


import { useState } from 'react';
import { useBlogs } from '@/hooks/useBlogs';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export function BlogList() {
  const { user } = useAuth();
  const [showMyPosts, setShowMyPosts] = useState(true);

  const {
    data: myBlogs,
    isLoading: loadingMyBlogs,
    error: errorMyBlogs
  } = useBlogs(user?.id, true); // "My Posts"

  const {
    data: allBlogs,
    isLoading: loadingAllBlogs,
    error: errorAllBlogs
  } = useBlogs(undefined, false); // "All Posts"

  const blogs = showMyPosts ? myBlogs : allBlogs;
  const isLoading = showMyPosts ? loadingMyBlogs : loadingAllBlogs;
  const error = showMyPosts ? errorMyBlogs : errorAllBlogs;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {showMyPosts ? 'My Blog Posts' : 'All Blog Posts'}
        </h2>
        <Button onClick={() => setShowMyPosts((prev) => !prev)}>
          {showMyPosts ? 'Show All Posts' : 'Show My Posts'}
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

      {!isLoading && !error && (!blogs || blogs.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
          <p className="text-gray-600">Be the first to create a blog post!</p>
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
