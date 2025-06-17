
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black hover:text-gray-600 transition-colors">
            BlogSpace
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/blogs" 
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              Blogs
            </Link>
            <Link 
              to="/writers" 
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              Writers
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              About
            </Link>
            <div className="flex items-center space-x-4 ml-6">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-black transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/blogs" 
                className="block px-3 py-2 text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                to="/writers" 
                className="block px-3 py-2 text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Writers
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-gray-600 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="border-t pt-2">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-gray-600 hover:text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 bg-black text-white rounded-lg mx-3 text-center hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
