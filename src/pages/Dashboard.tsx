// import { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import Navigation from '@/components/Navigation';
// import { EnhancedBlogList } from '@/components/EnhancedBlogList';
// import { CreateBlog } from '@/components/CreateBlog';
// import { EditBlog } from '@/components/EditBlog';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   excerpt: string | null;
//   author_id: string;
//   author_name: string;
//   published_at: string;
//   created_at: string;
//   updated_at: string;
//   tags: string[] | null;
//   featured_image: string | null;
// }

// const Dashboard = () => {
//   const { user, signOut } = useAuth();
//   const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
//   const [activeTab, setActiveTab] = useState('blogs');

//   const handleSignOut = async () => {
//     await signOut();
//   };

//   const handleEditBlog = (blog: Blog) => {
//     setEditingBlog(blog);
//     setActiveTab('edit');
//   };

//   const handleEditComplete = () => {
//     setEditingBlog(null);
//     setActiveTab('blogs');
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900">
//       <Navigation />

//       <div className="container mx-auto px-6 lg:px-8 pt-32">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">Welcome back!</h1>
//             <p className="text-gray-600 dark:text-gray-400">
//               Create and manage your blog posts
//             </p>
//           </div>

//           <Button
//             onClick={handleSignOut}
//             variant="outline"
//             className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
//           >
//             Sign Out
//           </Button>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

//           <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 max-w-md">
//             <TabsTrigger value="blogs">All Blogs</TabsTrigger>
//             <TabsTrigger value="my-blogs">My Blogs</TabsTrigger>
//             {editingBlog && <TabsTrigger value="edit">Edit Blog</TabsTrigger>}
//           </TabsList>


//           <Button
//             onClick={() => setActiveTab('create')}
//             className="fixed bottom-6 right-6 shadow-lg rounded-full px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
//           >
//             + Blog
//           </Button>

//           {/* Create Blog */}
//           {activeTab === 'create' && (
//             <div className="mt-8">
//               <CreateBlog onCancel={() => setActiveTab('my-blogs')} />
//             </div>
//           )}

//           {/* All Blogs */}
//           <TabsContent value="blogs" className="mt-8">
//             <EnhancedBlogList
//               showActions={false}  // ❌ No Edit/Delete for All Blogs
//               onEdit={handleEditBlog}
//               onlyMyBlogs={false}
//             />
//           </TabsContent>


//           {/* My Blogs */}
//           <TabsContent value="my-blogs" className="mt-8">
//             <EnhancedBlogList
//               showActions={true}
//               onEdit={handleEditBlog}
//               onlyMyBlogs={true}
//             />
//           </TabsContent>

//           {/* Create Blog */}
//           {/* <TabsContent value="create" className="mt-8">
//             <CreateBlog />
//           </TabsContent> */}

//           {/* Edit Blog */}
//           {editingBlog && (
//             <TabsContent value="edit" className="mt-8">
//               <EditBlog
//                 blog={editingBlog}
//                 onComplete={handleEditComplete}
//               />
//             </TabsContent>
//           )}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




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
    setActiveTab('my-blogs');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />

      <div className="container mx-auto px-6 lg:px-8 pt-32">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">Welcome back!</h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage your blog posts</p>
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

          {/* Mobile Dropdown */}
          <div className="sm:hidden mb-4">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="blogs">All Blogs</option>
              <option value="my-blogs">My Blogs</option>
              {editingBlog && <option value="edit">Edit Blog</option>}
            </select>
          </div>

          {/* Desktop Tabs */}
          <TabsList className="hidden sm:grid w-full grid-cols-2 sm:grid-cols-3 max-w-md mb-4">
            <TabsTrigger value="blogs">All Blogs</TabsTrigger>
            <TabsTrigger value="my-blogs">My Blogs</TabsTrigger>
            {editingBlog && <TabsTrigger value="edit">Edit Blog</TabsTrigger>}
          </TabsList>

          {/* Floating Button to Create */}
          <Button
            onClick={() => setActiveTab('create')}
            className="fixed bottom-6 right-6 shadow-lg rounded-full px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50"
          >
            + Blog
          </Button>

          {/* Create Blog */}
          {activeTab === 'create' && (
            <div className="mt-8">
              <CreateBlog onCancel={() => setActiveTab('my-blogs')} />
            </div>
          )}

          {/* All Blogs */}
          <TabsContent value="blogs" className="mt-8">
            <EnhancedBlogList
              showActions={false}
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
