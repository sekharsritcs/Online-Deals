import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

/**
 * ModernSearchBar component props
 */
interface ModernSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

/**
 * Modern search bar component with icon and search button
 */
const ModernSearchBar: React.FC<ModernSearchBarProps> = ({
  placeholder = "Search deals...",
  onSearch,
  className = "",
}) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (): void => {
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        <FaSearch />
      </div>

      {/* Input */}
      <input
        type="text"
        className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 placeholder-gray-400"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        aria-label="Search input"
      />

      {/* Search Button */}
      {query && (
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
          type="button"
          aria-label="Search button"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default ModernSearchBar;
