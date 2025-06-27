import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, LogOut, User, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    checkLoginStatus();

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
    
    setIsMenuOpen(false);
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
    window.location.replace('/');
  };

  const handleMobileNavClick = (callback) => {
    setIsMenuOpen(false);
    if (callback) callback();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/60' 
        : 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Enhanced Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full">
                <Sparkles className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
                ScholarSync
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                Admin Dashboard
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-1 bg-slate-50/80 backdrop-blur-sm rounded-xl p-1 border border-slate-200/60">
                <Link 
                  to="/login" 
                  className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-semibold rounded-lg hover:bg-white/80 transition-all duration-200 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-700 font-medium text-sm">Online</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-semibold rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative w-10 h-10 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 text-slate-600 transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                }`} />
                <X className={`absolute inset-0 w-5 h-5 text-slate-600 transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-slate-200/60 bg-white/80 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              {!isLoggedIn ? (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => handleMobileNavClick()}
                    className="flex items-center space-x-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Login</h3>
                      <p className="text-sm text-slate-500">Access your account</p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/signup" 
                    onClick={() => handleMobileNavClick()}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl border border-indigo-200 hover:border-indigo-300 transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Get Started</h3>
                      <p className="text-sm text-slate-500">Join ScholarSync today</p>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Welcome Back!</h3>
                      <p className="text-sm text-emerald-600 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span>You're logged in</span>
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleMobileNavClick(handleLogout)}
                    className="flex items-center space-x-3 p-4 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 hover:border-red-300 transition-all duration-200 w-full"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-slate-900">Logout</h3>
                      <p className="text-sm text-slate-500">Sign out of your account</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;