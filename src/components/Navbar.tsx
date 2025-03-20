
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Only show navbar on authenticated pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md md:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar Navigation */}
      <nav
        className={cn(
          "fixed left-0 top-0 h-full z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col justify-between py-8">
          <div className="px-6">
            <h2 className="text-2xl font-medium mb-8">CropSense</h2>
            <ul className="space-y-6">
              <NavItem 
                to="/dashboard" 
                icon={<Home size={20} />} 
                label="Dashboard" 
                isActive={location.pathname === '/dashboard'}
                onClick={() => setIsMenuOpen(false)}
              />
              <NavItem 
                to="/statistics" 
                icon={<BarChart size={20} />} 
                label="Statistics" 
                isActive={location.pathname === '/statistics'}
                onClick={() => setIsMenuOpen(false)}
              />
            </ul>
          </div>

          <div className="px-6 mt-auto">
            <hr className="mb-6 border-gray-200" />
            <Link 
              to="/" 
              className="flex items-center text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogOut size={20} className="mr-2" />
              <span>Log out</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content wrapper with padding to accommodate sidebar */}
      <div className="md:pl-64 min-h-screen">
        {/* Page content goes here */}
      </div>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, onClick }) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center py-2 px-3 rounded-lg transition-all duration-200",
          isActive 
            ? "bg-blue-50 text-blue-600" 
            : "text-gray-600 hover:bg-gray-100"
        )}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
        {isActive && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
        )}
      </Link>
    </li>
  );
};

export default Navbar;
