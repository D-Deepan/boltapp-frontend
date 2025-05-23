import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, User, LogIn } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/ui/Button';

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600 logo-animation" />
                <span className="ml-2 text-xl font-bold text-gray-900">RoomConnect</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="nav-link text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:text-gray-900">
                Home
              </Link>
              <Link to="/#features" className="nav-link text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:text-gray-900">
                Features
              </Link>
              <Link to="/#how-it-works" className="nav-link text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:text-gray-900">
                How It Works
              </Link>
              
              {isAuthenticated ? (
                <Button 
                  variant="primary" 
                  size="sm"
                  leftIcon={<User size={16} />}
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  size="sm"
                  leftIcon={<LogIn size={16} />}
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
              )}
            </div>
            
            <div className="md:hidden flex items-center">
              <button
                className="text-gray-500 hover:text-gray-900 focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/#features" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/#how-it-works" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              
              {isAuthenticated ? (
                <button 
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleDashboardClick();
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  Dashboard
                </button>
              ) : (
                <button 
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLoginClick();
                  }}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">RoomConnect</span>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-base text-gray-400">
                &copy; {new Date().getFullYear()} RoomConnect. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;