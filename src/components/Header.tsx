import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CookingPot, Croissant, UserCircle, LogOut, Menu, X, ChefHat } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/categories', label: 'Categories' },
    { to: '/creators', label: 'Creators' },
    { to: '/about', label: 'About' },
    ...(user && isAdmin ? [
      { to: '/admin/recipes', label: 'Manage Recipes' },
      { to: '/admin/creators', label: 'Manage Creators' }
    ] : [])
  ];

  return (
    <>
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-4">
              <CookingPot  className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-bold text-gray-800">Resepi Land</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map(link => (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-2">
                  {/* Desktop Profile Link */}
                  <div className="hidden md:flex items-center gap-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      <UserCircle className="w-6 h-6" />
                      <span>{user.user_metadata?.name || user.email}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                  
                  {/* Mobile Profile Icon */}
                  <Link
                    to="/profile"
                    className="md:hidden flex items-center gap-2 px-2 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <UserCircle className="w-6 h-6" />
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openModal('signin')}
                    className="hidden md:block px-4 py-2 text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openModal('signup')}
                    className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                  >
                    Join Now
                  </button>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <nav className="flex flex-col py-4">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('signin')}
                    className="px-4 py-2 text-left text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;