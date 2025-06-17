
import Navigation from '@/components/Navigation';

const Blogs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-6 lg:px-8 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">All Stories</h1>
          <p className="text-xl text-gray-600">
            Authentication required to access blog content
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 p-12 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Protected Content</h2>
            <p className="text-gray-600 mb-8">
              Please sign in to read our collection of stories and articles.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="/login" 
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium"
              >
                Login
              </a>
              <a 
                href="/signup" 
                className="border border-black text-black px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 font-medium"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
