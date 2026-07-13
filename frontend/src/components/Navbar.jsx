import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wider hover:text-gray-300 transition duration-300">
          PriceCompare
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300 text-lg">
            Home
          </Link>
          <Link to="/search-results" className="text-gray-300 hover:text-white transition duration-300 text-lg">
            
          </Link>

          {user ? (
            <>
              <Link to="/bookmarks" className="text-gray-300 hover:text-white transition duration-300 text-lg">
                Bookmarks
              </Link>
              <span className="text-gray-300 text-lg">Hello, {user.username}!</span>
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;