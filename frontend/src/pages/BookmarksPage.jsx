import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookmarks, deleteBookmark } from '../api';
import ProductCard from '../components/ProductCard';

function BookmarksPage({ user }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchBookmarks = async () => {
      try {
        const { data } = await getBookmarks();
        // The API returns bookmarks with populated product details
        setBookmarks(data);
      } catch (err) {
        setError('Failed to fetch bookmarks.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user, navigate]);

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      await deleteBookmark(bookmarkId);
      // Update the state to remove the bookmark without a full page reload
      setBookmarks(bookmarks.filter(b => b._id !== bookmarkId));
    } catch (err) {
      alert('Failed to remove bookmark.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <p className="text-xl text-gray-600">Loading bookmarks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        My Bookmarks
      </h2>
      {bookmarks.length === 0 ? (
        <p className="text-center text-xl text-gray-500 py-10">
          You haven't bookmarked any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map((bookmark) => (
            <ProductCard
              key={bookmark.product._id}
              product={bookmark.product}
              onBookmark={() => handleRemoveBookmark(bookmark._id)}
              isBookmarked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;