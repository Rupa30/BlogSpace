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
  const [activeTab, setActiveTab] = useState('my-blogs');
  const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '';


  const handleSignOut = async () => {
    await signOut();
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setActiveTab('edit');
  };

  const handleEditComplete = () => {
    setEditingBlog(null);
    setActiveTab('my-blogs');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      <div className="container pb-6 mx-auto px-6 lg:px-8 pt-32">
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

        <div className="text-center mb-8 bg-gray-50 dark:bg-gray-800 sm:p-4 p-6 rounded-lg shadow-md">
          <h1>
            <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100 inline-block">
              {userInitial !== '' ? userInitial : 'User'}
            </span>
            's Dashboard
          </h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Responsive Tabs Layout */}
          <TabsList className="w-full flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-0 h-20 max-w-md mb-6 mx-auto bg-transparent">
            <TabsTrigger
              value="my-blogs"
              className="w-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white"
            >
              My Blogs
            </TabsTrigger>

            {editingBlog && (
              <TabsTrigger
                value="edit"
                className="w-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 dark:data-[state=active]:text-white"
              >
                Edit Blog
              </TabsTrigger>
            )}
          </TabsList>


          {/* Floating +Blog button */}
          <Button
            onClick={() => setActiveTab('create')}
            className="fixed bottom-6 right-6 shadow-lg rounded-full px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
          >
            + Blog
          </Button>

          {/* Create Blog (inline render) */}
          {activeTab === 'create' && (
            <div className="mt-8">
              <CreateBlog onCancel={() => setActiveTab('my-blogs')} />
            </div>
          )}

          {/* My Blogs */}
          <TabsContent value="my-blogs" className="mt-8">
            <EnhancedBlogList
              showActions={true}
              onEdit={handleEditBlog}
              onlyMyBlogs={true}
            />
          </TabsContent>

          {/* Edit Blog */}
          {editingBlog && (
            <TabsContent value="edit" className="mt-8">
              <EditBlog blog={editingBlog} onComplete={handleEditComplete} />
            </TabsContent>
          )}
        </Tabs>

      </div>
    </div>
  );
};

export default Dashboard;
