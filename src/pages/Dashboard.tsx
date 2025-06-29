import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { EnhancedBlogList } from '@/components/EnhancedBlogList';
import { CreateBlog } from '@/components/CreateBlog';
import { EditBlog } from '@/components/EditBlog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [activeTab, setActiveTab] = useState('blogs');

  const handleSignOut = async () => {
    await signOut();
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setActiveTab('edit');
  };

  const handleEditComplete = () => {
    setEditingBlog(null);
    setActiveTab('blogs');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      <div className="container mx-auto px-6 lg:px-8 pt-32">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">Welcome back!</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage your blog posts
            </p>
          </div>

          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Sign Out
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-xl">
            <TabsTrigger value="blogs">All Blogs</TabsTrigger>
            <TabsTrigger value="my-blogs">My Blogs</TabsTrigger>
            <TabsTrigger value="create">Create Blog</TabsTrigger>
            {editingBlog && <TabsTrigger value="edit">Edit Blog</TabsTrigger>}
          </TabsList>

          {/* All Blogs */}
          <TabsContent value="blogs" className="mt-8">
            <EnhancedBlogList
              showActions={false}  // ❌ No Edit/Delete for All Blogs
              onEdit={handleEditBlog}
              onlyMyBlogs={false}
            />
          </TabsContent>


          {/* My Blogs */}
          <TabsContent value="my-blogs" className="mt-8">
            <EnhancedBlogList
              showActions={true}
              onEdit={handleEditBlog}
              onlyMyBlogs={true}
            />
          </TabsContent>

          {/* Create Blog */}
          <TabsContent value="create" className="mt-8">
            <CreateBlog />
          </TabsContent>

          {/* Edit Blog */}
          {editingBlog && (
            <TabsContent value="edit" className="mt-8">
              <EditBlog
                blog={editingBlog}
                onComplete={handleEditComplete}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
