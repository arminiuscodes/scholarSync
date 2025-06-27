import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Track route changes

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    checkLoginStatus(); // Initial check

    // Listen to login/logout events
    window.addEventListener('userLogin', checkLoginStatus);
    window.addEventListener('userLogout', checkLoginStatus);

    return () => {
      window.removeEventListener('userLogin', checkLoginStatus);
      window.removeEventListener('userLogout', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Close mobile menu instantly
    setIsMenuOpen(false);
    
    // Trigger navbar refresh immediately
    window.dispatchEvent(new Event('userLogout'));
    
    // Navigate to home page instantly
    navigate('/');
    
    // Force immediate refresh for super fast transition
    window.location.replace('/');
  };

  const handleMobileNavClick = (callback) => {
    // Close menu immediately when mobile nav item is clicked
    setIsMenuOpen(false);
    if (callback) callback();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" onClick={closeMenu}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
            </Link>
            <span className="text-xl font-bold text-gray-900">ScholarSync</span>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {!isLoggedIn ? (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => handleMobileNavClick()}
                    className="block text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => handleMobileNavClick()}
                    className="block bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-2 rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => handleMobileNavClick(handleLogout)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;