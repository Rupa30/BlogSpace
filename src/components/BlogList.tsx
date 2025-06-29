import { useAuth } from "@/contexts/AuthContext";
import { useBlogs } from "@/hooks/useBlogs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export function BlogList() {
  const { user } = useAuth();
  const { data: allBlogs = [], isLoading } = useBlogs(); // all public blogs

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading blogs...</p>;
  }

  if (allBlogs.length === 0) {
    return <p className="text-center text-gray-500">No blogs found.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {allBlogs.map((blog) => (
        <Card key={blog.id}>
          <CardHeader>
            <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              By {blog.author_name} •{" "}
              {formatDistanceToNow(new Date(blog.published_at))} ago
            </p>
          </CardHeader>

          <CardContent>
            <p className="text-gray-600 line-clamp-3">
              {blog.excerpt || blog.content.slice(0, 150) + "..."}
            </p>

            {/* If it's user's blog, show Edit/Delete (optional) */}
            {user?.id === blog.author_id && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
