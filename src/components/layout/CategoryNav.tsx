import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "../../constants/routes";

/**
 * Horizontal category menu (matches 2nd screenshot)
 * Dark gray text, sans-serif, thin separator line below
 */
const CategoryNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    const pathOnly = path.split("?")[0];
    return location.pathname === pathOnly;
  };

  return (
    <nav className="w-full overflow-x-auto bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-6 min-w-max">
        {MENU_ITEMS.map(({ path, label }) => {
          const active = isActive(path);
          return (
            <Link
              key={path}
              to={path}
              className={`whitespace-nowrap py-2 px-1 text-base font-medium transition-colors ${
                active
                  ? "text-orange-600 font-semibold border-b-2 border-orange-600 -mb-0.5"
                  : "text-slate-700 hover:text-orange-600"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
