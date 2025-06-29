
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 transform rotate-12 scale-150"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-bold text-white hover:text-gray-300 transition-colors duration-300">
              BlogSpace
            </Link>
            <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-md">
              A modern platform for sharing your thoughts, stories, and ideas with the world.
              Create, share, and discover amazing content from writers everywhere.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-6 mt-8">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mt-2"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">About the Creator</Link>
              </li>

            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg relative">
              Support
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 mt-2"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-8">Get the latest stories and updates delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="rupamahindrakar08@gmail.com"
                className="flex-1 px-6 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-gray-400 flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-0 space-x-2">
          <div>
            <span>© {new Date().getFullYear()} BlogSpace.</span>
          </div>

          <div>
            <span className='flex items-center justify-center gap-2 '>Made with <Heart size={16} className="text-red-500 animate-pulse" /> for writers everywhere.</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 transform group"
          >
            <span>Back to top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
