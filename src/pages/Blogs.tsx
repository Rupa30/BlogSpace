
import { useAuth } from '@/contexts/AuthContext';
import { EnhancedBlogList } from '@/components/EnhancedBlogList';
import Navigation from '@/components/Navigation';

const Blogs = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />
        
        <div className="container mx-auto px-6 lg:px-8 pt-32">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">All Stories</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Authentication required to access blog content
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 p-12 rounded-2xl text-center border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Protected Content</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Please sign in to read our collection of stories and articles.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="/login" 
                  className="bg-black dark:bg-white text-white dark:text-black px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium"
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  className="border border-black dark:border-white text-black dark:text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-105 font-medium"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-6 lg:px-8 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">All Stories</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover amazing stories from our community
          </p>
        </div>

        <EnhancedBlogList showActions={false} />
      </div>
    </div>
  );
};

export default Blogs;
