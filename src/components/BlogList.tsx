import { useAuth } from "@/contexts/AuthContext";
import { useBlogs } from "@/hooks/useBlogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export function BlogList() {
  const { user } = useAuth();

  const { data: allBlogs = [], isLoading: loadingAll } = useBlogs(); // all blogs
  const { data: myBlogs = [], isLoading: loadingMy } = useBlogs(user?.id); // user's blogs

  return (
    <Tabs defaultValue="all" className="w-full">
      {/* Tab buttons */}
      <TabsList className="mb-6">
        <TabsTrigger value="all">All Blogs</TabsTrigger>
        <TabsTrigger value="my">My Blogs</TabsTrigger>
      </TabsList>

      {/* All Blogs tab */}
      <TabsContent value="all">
        {loadingAll ? (
          <p>Loading blogs...</p>
        ) : allBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
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
        )}
      </TabsContent>

      {/* My Blogs tab */}
      <TabsContent value="my">
        {loadingMy ? (
          <p>Loading your blogs...</p>
        ) : myBlogs.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t created any blogs yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myBlogs.map((blog) => (
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
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
