import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await API.get(`/api/products/search?q=${debouncedQuery}&limit=5`);
        setResults(data.products || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchResults();
    }
  }, [debouncedQuery, isOpen]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductClick = (productId) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/product/${productId}`);
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded px-0.5">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="relative w-full max-w-md hidden sm:block" ref={dropdownRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-[#382B66] rounded-xl leading-5 bg-slate-50 dark:bg-[#100C24] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
          placeholder="Search products, brands, categories..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-[#1A1438] shadow-lg rounded-xl border border-slate-100 dark:border-[#281F4D] max-h-96 overflow-y-auto overflow-hidden transition-colors duration-200">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((product) => (
                <li
                  key={product._id}
                  className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#281F4D] cursor-pointer transition-colors duration-200 flex items-center gap-3"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {highlightText(product.name, debouncedQuery)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-2">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">${product.price}</span>
                      <span>•</span>
                      <span>{highlightText(product.brand, debouncedQuery)}</span>
                      {product.category && (
                        <>
                          <span>•</span>
                          <span className="bg-slate-100 dark:bg-[#070514] px-1.5 py-0.5 rounded text-[10px]">
                            {highlightText(product.category.name, debouncedQuery)}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              ))}
              <li className="px-4 py-2 border-t border-slate-100 dark:border-[#281F4D] text-center">
                <button
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                  onClick={() => {
                    setIsOpen(false);
                    // could navigate to a dedicated search page if implemented
                  }}
                >
                  See all {results.length >= 5 && "matching"} products
                </button>
              </li>
            </ul>
          ) : !isLoading ? (
            <div className="px-4 py-8 text-center">
              <svg className="w-8 h-8 text-slate-300 dark:text-slate-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-slate-500 dark:text-slate-400">No products found for "{query}"</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
