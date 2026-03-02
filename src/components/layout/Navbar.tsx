import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Header component props
 */
interface HeaderProps {
  onSearch?: (query: string) => void;
}

/** Page navigation items: path and label */
const NAV_PAGES: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/deals", label: "Deals" },
  { path: "/trending", label: "Trending" },
  { path: "/halloween-deals", label: "Halloween Deals" },
  { path: "/wayfair-deals", label: "Wayfair Deals" },
  { path: "/top-retail-deals", label: "Top Retail Deals" },
  { path: "/about", label: "About" },
];

/**
 * Header: logo + search bar, then navigation section (all pages) after border
 */
const Navbar: React.FC<HeaderProps> = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Navigation section: all pages (after header border) */}
      <nav className="w-auto  px-6 py-4 flex items-center justify-between border-b border-gray-200">
        {NAV_PAGES.map(({ path, label }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`whitespace-nowrap py-2 px-1 font-semibold transition-colors border-b-2 -mb-0.5 ${
                active
                  ? "text-orange-600 border-orange-600"
                  : "text-gray-600 border-transparent hover:text-orange-600 hover:border-orange-400"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
