import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import BookmarksPage from './pages/BookmarksPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [user, setUser] = useState(null);

  // Check for a logged-in user on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage user={user} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;