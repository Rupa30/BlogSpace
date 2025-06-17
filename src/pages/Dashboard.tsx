
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { BlogList } from '@/components/BlogList';
import { CreateBlog } from '@/components/CreateBlog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-6 lg:px-8 pt-32">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-600">
              Create and manage your blog posts
            </p>
          </div>
          
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-black text-black hover:bg-gray-50"
          >
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="blogs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="blogs">All Blogs</TabsTrigger>
            <TabsTrigger value="create">Create Blog</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blogs" className="mt-8">
            <BlogList />
          </TabsContent>
          
          <TabsContent value="create" className="mt-8">
            <CreateBlog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
