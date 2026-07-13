import React from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Icons for bookmarking

function ProductCard({ product, onBookmark, isBookmarked }) {
  // Helper function to render a star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {hasHalfStar && <span className="relative">
          <span className="absolute overflow-hidden w-1/2">★</span>
          <span className="text-gray-300">★</span>
        </span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
      <div className="relative">
        <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-contain rounded-t-lg"
          />
        </a>
        {onBookmark && (
          <button
            onClick={() => onBookmark(product._id)}
            className={`absolute top-2 right-2 text-xl p-2 rounded-full ${isBookmarked ? 'text-blue-500 bg-white' : 'text-gray-500 bg-white hover:text-blue-500'} transition-colors duration-200`}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        )}
      </div>
      <div className="flex-1 mt-4 flex flex-col justify-between">
        <div>
          <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:underline">
              {product.name}
            </h3>
          </a>
          <div className="flex items-center space-x-2 mt-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500">
          Source: <span className="font-semibold">{product.source}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductCard;