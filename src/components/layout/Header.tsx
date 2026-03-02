import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ModernSearchBar from "../ui/ModernSearchBar";
import { MENU_ITEMS } from "../../constants/routes";

/**
 * Header component props
 */
interface HeaderProps {
  onSearch?: (query: string) => void;
}

/**
 * Header: logo + hamburger + search bar (like screenshot)
 * Hamburger opens category menu on mobile
 */
const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (query: string): void => {
    console.log("Searching:", query);
    onSearch?.(query);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top: Hamburger + Logo + Search bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center gap-10 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes className="h-6 w-6 text-gray-600" /> : <FaBars className="h-6 w-6 text-gray-600" />}
        </button>

        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-orange-600 tracking-tight hover:text-orange-700"
        >
          Woah Deals
        </Link>

        <div className="flex-1 max-w-2xl md:ml-4">
          <ModernSearchBar
            placeholder="Search for deals, tech, or apparel..."
            onSearch={handleSearch}
          />
        </div>

        {/* Header menu: About, Contact, FAQ */}
        <nav className="hidden md:flex items-center gap-6 ml-4 text-muted text-sm float-end ">
          <Link
            to="/about"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/faq"
            className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            FAQ
          </Link>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Mobile menu drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 pt-20">
          <h3 className="font-semibold text-gray-800 mb-3 px-2">Categories</h3>
          <nav className="flex flex-col gap-0.5">
            {MENU_ITEMS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </div>
      </aside>
    </header>
  );
};

export default Header;
