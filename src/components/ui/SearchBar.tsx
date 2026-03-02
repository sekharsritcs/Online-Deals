import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

/**
 * SearchBar component props
 */
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

/**
 * Classic search bar component with icon button
 */
const SearchBar: React.FC<SearchBarProps> = ({
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
    <div
      className={`w-full max-w-md mx-auto flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white ${className}`}
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        aria-label="Search input"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        onClick={handleSearch}
        type="button"
        aria-label="Search button"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
