import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts, addBookmark, getBookmarks, deleteBookmark } from '../api';
import ComparisonTable from '../components/ComparisonTable';
import ProductCard from '../components/ProductCard';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const { data } = await searchProducts(query);
        setComparisonData(data);
      } catch (err) {
        setError('Failed to fetch product data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchBookmarks = async () => {
      if (user) {
        try {
          const { data } = await getBookmarks();
          setBookmarks(data.map(b => b.product._id));
        } catch (err) {
          console.error('Failed to fetch bookmarks:', err);
        }
      }
    };

    fetchResults();
    fetchBookmarks();
  }, [query, user]);

  const handleBookmark = async (productId) => {
    if (!user) {
      alert('Please log in to bookmark products.');
      return;
    }
    
    try {
      if (bookmarks.includes(productId)) {
        // Find the bookmark ID to delete
        const bookmarkToDelete = (await getBookmarks()).data.find(b => b.product._id === productId);
        if (bookmarkToDelete) {
          await deleteBookmark(bookmarkToDelete._id);
          setBookmarks(bookmarks.filter(id => id !== productId));
        }
      } else {
        await addBookmark(productId);
        setBookmarks([...bookmarks, productId]);
      }
    } catch (err) {
      alert('Failed to update bookmark.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <p className="text-xl text-gray-600">Loading products...</p>
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
    
  if (!query) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] text-center">
        <p className="text-xl text-gray-500">Please enter a search query on the home page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Search Results for "{query}"
      </h2>
      {comparisonData ? (
        <>
          <ComparisonTable comparisonData={comparisonData} />
          <h3 className="text-2xl font-bold text-gray-800 my-8">
            All Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comparisonData.allProducts.map((product) => (
              <ProductCard
                key={product.productUrl}
                product={product}
                onBookmark={user ? handleBookmark : null}
                isBookmarked={bookmarks.includes(product._id)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-xl text-gray-500 py-10">
          No products found for this search.
        </p>
      )}
    </div>
  );
}

export default SearchResultsPage;