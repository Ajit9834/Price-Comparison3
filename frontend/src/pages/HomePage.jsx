import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to the search results page with the query
      console.log(query);
      
      navigate(`/search-results?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          PriceCompare
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find the best deals across Amazon, Flipkart, and Myntra.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a product (e.g., 'running shoes')"
            className="flex-1 w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <button
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;