import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SearchBox({ isSearching }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [query, setQuery] = useState(urlSearch);

  // Sync state with URL if it changes from outside
  useEffect(() => {
    setQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // If query hasn't changed from URL search, do nothing to avoid extra pushes
      if (query === urlSearch) return;

      const newParams = new URLSearchParams(searchParams);
      if (query.trim()) {
        newParams.set("search", query);
        newParams.set("page", "1"); // reset page on new search
      } else {
        newParams.delete("search");
        newParams.set("page", "1");
      }
      setSearchParams(newParams);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchParams, setSearchParams, urlSearch]);

  const clearSearch = () => {
    setQuery("");
    // The debounce will handle the URL update
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2 border border-slate-200 dark:border-[#382B66] rounded-xl leading-5 bg-slate-50 dark:bg-[#100C24] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isSearching ? (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBox;
