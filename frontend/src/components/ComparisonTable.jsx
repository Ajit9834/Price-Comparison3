import React from 'react';

function ComparisonTable({ comparisonData }) {
  const { bestOverall, bestByPrice, bestByRating, allProducts } = comparisonData;

  if (!allProducts || allProducts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products found for this search.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto my-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Comparison Results</h2>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {bestOverall && (
          <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-500 shadow-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-2">🏆 Best Overall</h3>
            <p className="font-semibold">{bestOverall.name}</p>
            <p>Price: <span className="font-bold">₹{bestOverall.price.toLocaleString('en-IN')}</span></p>
            <p>Rating: <span className="font-bold">{bestOverall.rating} ★</span></p>
          </div>
        )}
        {bestByPrice && (
          <div className="bg-green-100 p-6 rounded-lg border-2 border-green-500 shadow-lg">
            <h3 className="text-xl font-bold text-green-800 mb-2">💰 Best by Price</h3>
            <p className="font-semibold">{bestByPrice.name}</p>
            <p>Price: <span className="font-bold">₹{bestByPrice.toLocaleString('en-IN')}</span></p>
            <p>Rating: <span className="font-bold">{bestByPrice.rating} ★</span></p>
          </div>
        )}
        {bestByRating && (
          <div className="bg-purple-100 p-6 rounded-lg border-2 border-purple-500 shadow-lg">
            <h3 className="text-xl font-bold text-purple-800 mb-2">⭐ Best by Rating</h3>
            <p className="font-semibold">{bestByRating.name}</p>
            <p>Price: <span className="font-bold">₹{bestByRating.price.toLocaleString('en-IN')}</span></p>
            <p>Rating: <span className="font-bold">{bestByRating.rating} ★</span></p>
          </div>
        )}
      </div>

      {/* Main Comparison Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allProducts.map((product, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16">
                    <img className="h-16 w-16 object-contain" src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline">
                      {product.name}
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₹{product.price.toLocaleString('en-IN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.rating} ★
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                {product.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;