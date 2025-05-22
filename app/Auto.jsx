'use client';
import React, { useEffect, useState } from 'react';

const Auto = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(10); // fixed limit
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    if (input.trim().length < 2) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${input}&limit=${limit}&skip=${skip}`
      );
      const json = await res.json();
      setResults(json?.products || []);
      setTotal(json?.total || 0);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [input, skip]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md relative">
        <h2 className="text-2xl font-semibold text-center mb-4">Lets do a Search </h2>
        <input
          type="text"
          placeholder="Search products..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSkip(0); // Reset pagination on new input
          }}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 150)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {show && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-3 text-gray-500 text-center">Loading...</div>
            ) : results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {product.title}
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500 text-center">No results found</div>
            )}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {results.length > 0 && (
        <div className="mt-4 flex gap-4 items-center">
          <button
            disabled={skip === 0}
            onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {Math.floor(skip / limit) + 1} of {totalPages}
          </span>
          <button
            disabled={skip + limit >= total}
            onClick={() => setSkip((prev) => prev + limit)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Auto;
