
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              BlogSpace
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              A modern platform for sharing your thoughts, stories, and ideas with the world. Create, share, and discover amazing content.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blogs" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} BlogSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
