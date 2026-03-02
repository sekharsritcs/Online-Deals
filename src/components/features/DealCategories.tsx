import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIES, type CategoryName } from "../../constants/categories";
import { getCategoryPath } from "../../constants/routes";

/**
 * DealCategories component props
 */
interface DealCategoriesProps {
  categories?: readonly CategoryName[];
  onCategoryChange?: (category: CategoryName) => void;
  className?: string;
}

/**
 * Category filter component with horizontal scrolling tabs (links to category pages)
 */
const DealCategories: React.FC<DealCategoriesProps> = ({
  categories = CATEGORIES,
  onCategoryChange,
  className = "",
}) => {
  const location = useLocation();

  const isActive = (category: CategoryName): boolean => {
    const path = getCategoryPath(category);
    if (path) return location.pathname === path;
    // On home page, treat "Trending" as active (first category)
    if (location.pathname === "/" && category === categories[0]) return true;
    return false;
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={`w-full max-w-7xl mx-auto mt-2 ${className}`}>
      {/* Menu above slider - active item with branded orange text + underline */}
      <div className="flex overflow-x-auto space-x-4 pb-2 border-b-2 border-gray-200">
        {categories.map((category) => {
          const path = getCategoryPath(category);
          const active = isActive(category);

          if (path) {
            return (
              <Link
                key={category}
                to={path}
                onClick={() => onCategoryChange?.(category)}
                className={`whitespace-nowrap py-2 px-4 font-semibold transition-colors border-b-2 -mb-0.5 ${
                  active
                    ? "text-orange-600 border-orange-600"
                    : "text-gray-600 border-transparent hover:text-orange-600 hover:border-orange-400"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {category}
              </Link>
            );
          }

          return (
            <button
              key={category}
              onClick={() => onCategoryChange?.(category)}
              className="whitespace-nowrap py-2 px-4 font-medium text-gray-600 border-b-2 border-transparent -mb-0.5 hover:text-orange-600 transition-colors"
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DealCategories;
