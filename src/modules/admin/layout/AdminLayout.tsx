import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiDatabase,
  FiPackage,
  FiBox,
  FiUser,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [openSection, setOpenSection] = useState<string | null>("user");

  const isActive = (path: string | string[]): boolean => {
    const paths = Array.isArray(path) ? path : [path];
    return paths.some((p) =>
      location.pathname === p || (p.endsWith("/*") && location.pathname.startsWith(p.slice(0, -2)))
    );
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const getPageTitle = (): string => {
    const path = location.pathname;

    if (path === "/admin") return "Dashboard";
    if (path.startsWith("/admin/users")) return "User Management";
    if (path.startsWith("/admin/roles")) return "User Management";
    if (path.startsWith("/admin/role-permissions")) return "User Management";
    if (path.startsWith("/admin/categories")) return "Master Data";
    if (path.startsWith("/admin/deal-categories")) return "Master Data";
    if (path.startsWith("/admin/products")) return "Product Master";
    if (path.startsWith("/admin/deals")) return "Products";
    if (path.startsWith("/admin/accounts")) return "Accounts";
    if (path.startsWith("/admin/quotes")) return "Quote Management";
    if (path.startsWith("/admin/reports")) return "Analytics & Reporting";
    if (path.startsWith("/admin/settings")) return "Settings";

    return "Admin";
  };

  const topLinkClass = (active: boolean): string =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? "bg-orange-500 text-white"
        : "text-slate-200 hover:bg-slate-800/70 hover:text-white"
    }`;

  const subLinkClass = (active: boolean): string =>
    `flex items-center gap-2 rounded-md px-4 py-1.5 text-sm transition-colors ${
      active ? "bg-orange-50 text-orange-700" : "text-slate-200 hover:bg-slate-800/70"
    }`;

  const sectionButtonClass = (active: boolean): string =>
    `w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? "bg-orange-500 text-white"
        : "text-slate-200 hover:bg-slate-800/70 hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-50 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-800">
          <Link to="/admin" className="text-xl font-bold tracking-tight">
            Woah Admin
          </Link>
          <p className="text-xs text-slate-400 mt-1">Manage storefront data and content</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm overflow-y-auto">
          {/* Dashboard */}
          <Link to="/admin" className={topLinkClass(isActive("/admin"))}>
            <FiGrid className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          {/* User Management */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "user" ||
                isActive(["/admin/users", "/admin/roles", "/admin/role-permissions"])
            )}
            onClick={() => toggleSection("user")}
          >
            <span className="inline-flex items-center gap-2">
              <FiUsers className="h-4 w-4" />
              <span>User Management</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "user" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "user" && (
            <div className="mt-1 space-y-1">
              <Link to="/admin/users" className={subLinkClass(isActive("/admin/users"))}>
                <span>Users</span>
              </Link>
              <Link to="/admin/roles" className={subLinkClass(isActive("/admin/roles"))}>
                <span>Roles</span>
              </Link>
              <Link
                to="/admin/role-permissions"
                className={subLinkClass(isActive("/admin/role-permissions"))}
              >
                <span>Role Permissions</span>
              </Link>
            </div>
          )}

          {/* Master Data */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "master" ||
                isActive([
                  "/admin/categories",
                  "/admin/categories/sub",
                  "/admin/deal-categories/latest",
                ])
            )}
            onClick={() => toggleSection("master")}
          >
            <span className="inline-flex items-center gap-2">
              <FiDatabase className="h-4 w-4" />
              <span>Master Data</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "master" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "master" && (
            <div className="mt-1 space-y-1">
              <Link
                to="/admin/categories"
                className={subLinkClass(isActive("/admin/categories"))}
              >
                <span>Categories</span>
              </Link>
              <Link
                to="/admin/categories/sub"
                className={subLinkClass(isActive("/admin/categories/sub"))}
              >
                <span>Sub Categories</span>
              </Link>
              <Link
                to="/admin/deal-categories/latest"
                className={subLinkClass(isActive("/admin/deal-categories/latest"))}
              >
                <span>Deal Categories</span>
              </Link>
            </div>
          )}

          {/* Product Master */}
          <Link
            to="/admin/products"
            className={topLinkClass(isActive(["/admin/products", "/admin/products/new"]))}
          >
            <FiPackage className="h-4 w-4" />
            <span>Product Master</span>
          </Link>

          {/* Products */}
          <Link
            to="/admin/deals"
            className={topLinkClass(isActive(["/admin/deals", "/admin/deals/new"]))}
          >
            <FiBox className="h-4 w-4" />
            <span>Products</span>
          </Link>

          {/* Accounts */}
          <Link to="/admin/accounts" className={topLinkClass(isActive("/admin/accounts"))}>
            <FiUser className="h-4 w-4" />
            <span>Accounts</span>
          </Link>

          {/* Quote Management */}
          <Link to="/admin/quotes" className={topLinkClass(isActive("/admin/quotes"))}>
            <FiFileText className="h-4 w-4" />
            <span>Quote Management</span>
          </Link>

          {/* Analytics & Reporting */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "analytics" || isActive("/admin/reports")
            )}
            onClick={() => toggleSection("analytics")}
          >
            <span className="inline-flex items-center gap-2">
              <FiBarChart2 className="h-4 w-4" />
              <span>Analytics &amp; Reporting</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "analytics" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "analytics" && (
            <div className="mt-1 space-y-1">
              <Link to="/admin/reports" className={subLinkClass(isActive("/admin/reports"))}>
                <span>Reports</span>
              </Link>
            </div>
          )}

          {/* Settings */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "settings" || isActive("/admin/settings")
            )}
            onClick={() => toggleSection("settings")}
          >
            <span className="inline-flex items-center gap-2">
              <FiSettings className="h-4 w-4" />
              <span>Settings</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "settings" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "settings" && (
            <div className="mt-1 space-y-1">
              <Link to="/admin/settings" className={subLinkClass(isActive("/admin/settings"))}>
                <span>General Settings</span>
              </Link>
            </div>
          )}
        </nav>

        <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-400">
          <p>
            <span className="font-semibold">Frontend:</span> Woah Deals
          </p>
          <p className="mt-1">
            <Link to="/" className="text-sky-400 hover:text-sky-300">
              View store
            </Link>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-slate-200 bg-white flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold text-slate-900">{getPageTitle()}</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
