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
  FiSearch,
} from "react-icons/fi";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [openSection, setOpenSection] = useState<string | null>("user");
  const [search, setSearch] = useState("");

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
    if (path.startsWith("/admin/products")) return "Product Management";
    if (path.startsWith("/admin/categories")) return "Category Management";
    if (path.startsWith("/admin/coupons")) return "Coupons Management";
    if (path.startsWith("/admin/content")) return "Content Management";
    if (path.startsWith("/admin/deals")) return "Deal Management";
    if (path.startsWith("/admin/deal-categories")) return "Deal Category";
    if (path.startsWith("/admin/ads")) return "Ad Management";
    if (path.startsWith("/admin/users")) return "User Management";
    if (path.startsWith("/admin/roles")) return "User Management";
    if (path.startsWith("/admin/role-permissions")) return "User Management";
    if (path.startsWith("/admin/accounts")) return "Accounts";
    if (path.startsWith("/admin/quotes")) return "Quote Management";
    if (path.startsWith("/admin/reports")) return "Analytics & Reporting";
    if (path.startsWith("/admin/settings")) return "Settings";

    return "Admin";
  };

  const topLinkClass = (active: boolean): string =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-indigo-500 text-white shadow-sm"
        : "text-slate-100 hover:bg-slate-800/70 hover:text-white"
    }`;

  const subLinkClass = (active: boolean): string =>
    `flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm transition-colors ${
      active ? "bg-slate-100 text-slate-900" : "text-slate-100/90 hover:bg-slate-800/70"
    }`;

  const sectionButtonClass = (active: boolean): string =>
    `w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-indigo-500 text-white shadow-sm"
        : "text-slate-100 hover:bg-slate-800/70 hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-950 text-slate-50 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-900">
          <Link to="/admin" className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
              WD
            </span>
            <span className="leading-tight">
              Woah Deals
              <span className="block text-[11px] font-normal text-slate-400">
                Admin Console
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm overflow-y-auto">
          {/* Dashboard */}
          <Link to="/admin" className={topLinkClass(isActive("/admin"))}>
            <FiGrid className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          {/* Product Management */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "product" ||
                isActive([
                  "/admin/products",
                  "/admin/products/new",
                  "/admin/products/bulk-upload",
                ])
            )}
            onClick={() => toggleSection("product")}
          >
            <span className="inline-flex items-center gap-2">
              <FiPackage className="h-4 w-4" />
              <span>Product Management</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "product" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "product" && (
            <div className="mt-1 space-y-1">
              <Link
                to="/admin/products"
                className={subLinkClass(isActive("/admin/products"))}
              >
                <span>All Products</span>
              </Link>
              <Link
                to="/admin/products/new"
                className={subLinkClass(isActive("/admin/products/new"))}
              >
                <span>Add Product</span>
              </Link>
              <Link
                to="/admin/products/bulk-upload"
                className={subLinkClass(isActive("/admin/products/bulk-upload"))}
              >
                <span>Bulk Upload</span>
              </Link>
            </div>
          )}

          {/* Category Management */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "category" ||
                isActive(["/admin/categories", "/admin/categories/sub"])
            )}
            onClick={() => toggleSection("category")}
          >
            <span className="inline-flex items-center gap-2">
              <FiDatabase className="h-4 w-4" />
              <span>Category Management</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "category" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "category" && (
            <div className="mt-1 space-y-1">
              <Link
                to="/admin/categories"
                className={subLinkClass(isActive("/admin/categories"))}
              >
                <span>Main Categories</span>
              </Link>
              <Link
                to="/admin/categories/sub"
                className={subLinkClass(isActive("/admin/categories/sub"))}
              >
                <span>Sub Categories</span>
              </Link>
            </div>
          )}

          {/* Coupons Management */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "coupons" ||
                isActive([
                  "/admin/coupons/active",
                  "/admin/coupons/quick",
                  "/admin/coupons/expired",
                ])
            )}
            onClick={() => toggleSection("coupons")}
          >
            <span className="inline-flex items-center gap-2">
              <FiFileText className="h-4 w-4" />
              <span>Coupons Management</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "coupons" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "coupons" && (
            <div className="mt-1 space-y-1">
              <Link
                to="/admin/coupons/active"
                className={subLinkClass(isActive("/admin/coupons/active"))}
              >
                <span>Active Coupons</span>
              </Link>
              <Link
                to="/admin/coupons/quick"
                className={subLinkClass(isActive("/admin/coupons/quick"))}
              >
                <span>Quick Coupons</span>
              </Link>
              <Link
                to="/admin/coupons/expired"
                className={subLinkClass(isActive("/admin/coupons/expired"))}
              >
                <span>Expired Coupons</span>
              </Link>
            </div>
          )}

          {/* Content Management */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "content" ||
                isActive(["/admin/content/homepage", "/admin/content/pages"])
            )}
            onClick={() => toggleSection("content")}
          >
            <span className="inline-flex items-center gap-2">
              <FiFileText className="h-4 w-4" />
              <span>Content Management</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "content" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "content" && (
            <div className="mt-1 space-y-1">
              <Link
                to="/admin/content/homepage"
                className={subLinkClass(isActive("/admin/content/homepage"))}
              >
                <span>Homepage Sections</span>
              </Link>
              <Link
                to="/admin/content/pages"
                className={subLinkClass(isActive("/admin/content/pages"))}
              >
                <span>Static Pages</span>
              </Link>
            </div>
          )}

          {/* Deal Management */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "deals" ||
                isActive([
                  "/admin/deals",
                  "/admin/deals/new",
                  "/admin/deals/hot",
                  "/admin/deals/featured",
                  "/admin/deals/expired",
                ])
            )}
            onClick={() => toggleSection("deals")}
          >
            <span className="inline-flex items-center gap-2">
              <FiBox className="h-4 w-4" />
              <span>Deal Management</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "deals" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "deals" && (
            <div className="mt-1 space-y-1">
              <Link to="/admin/deals" className={subLinkClass(isActive("/admin/deals"))}>
                <span>All Deals</span>
              </Link>
              <Link
                to="/admin/deals/new"
                className={subLinkClass(isActive("/admin/deals/new"))}
              >
                <span>Add Deal</span>
              </Link>
              <Link
                to="/admin/deals/hot"
                className={subLinkClass(isActive("/admin/deals/hot"))}
              >
                <span>Hot Deals</span>
              </Link>
              <Link
                to="/admin/deals/featured"
                className={subLinkClass(isActive("/admin/deals/featured"))}
              >
                <span>Featured Deals</span>
              </Link>
              <Link
                to="/admin/deals/expired"
                className={subLinkClass(isActive("/admin/deals/expired"))}
              >
                <span>Expired Deals</span>
              </Link>
            </div>
          )}

          {/* Deal Category */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "dealCategories" ||
                isActive([
                  "/admin/deal-categories/latest",
                  "/admin/deal-categories/travel",
                  "/admin/deal-categories/quick-coupons",
                ])
            )}
            onClick={() => toggleSection("dealCategories")}
          >
            <span className="inline-flex items-center gap-2">
              <FiGrid className="h-4 w-4" />
              <span>Deal Category</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "dealCategories" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "dealCategories" && (
            <div className="mt-1 space-y-1">
              <Link
                to="/admin/deal-categories/latest"
                className={subLinkClass(isActive("/admin/deal-categories/latest"))}
              >
                <span>Latest Deals</span>
              </Link>
              <Link
                to="/admin/deal-categories/travel"
                className={subLinkClass(isActive("/admin/deal-categories/travel"))}
              >
                <span>Travel Deals</span>
              </Link>
              <Link
                to="/admin/deal-categories/quick-coupons"
                className={subLinkClass(isActive("/admin/deal-categories/quick-coupons"))}
              >
                <span>Quick Coupons</span>
              </Link>
            </div>
          )}

          {/* Ad Management */}
          <button
            type="button"
            className={sectionButtonClass(
              openSection === "ads" ||
                isActive(["/admin/ads/banners", "/admin/ads/sidebar", "/admin/ads/sliders"])
            )}
            onClick={() => toggleSection("ads")}
          >
            <span className="inline-flex items-center gap-2">
              <FiBarChart2 className="h-4 w-4" />
              <span>Ad Management</span>
            </span>
            <FiChevronDown
              className={`h-3 w-3 transition-transform ${
                openSection === "ads" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSection === "ads" && (
            <div className="mt-1 space-y-1">
              <Link
                to="/admin/ads/banners"
                className={subLinkClass(isActive("/admin/ads/banners"))}
              >
                <span>Banner Ads</span>
              </Link>
              <Link
                to="/admin/ads/sidebar"
                className={subLinkClass(isActive("/admin/ads/sidebar"))}
              >
                <span>Sidebar Ads</span>
              </Link>
              <Link
                to="/admin/ads/sliders"
                className={subLinkClass(isActive("/admin/ads/sliders"))}
              >
                <span>Slider Ads</span>
              </Link>
            </div>
          )}

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

        <div className="px-4 py-3 border-t border-slate-900 text-xs text-slate-400">
          <p className="flex items-center justify-between">
            <span className="font-semibold">Frontend</span>
            <Link to="/" className="text-sky-400 hover:text-sky-300">
              View store
            </Link>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Signed in as{" "}
            <span className="font-medium text-slate-200">admin@woahdeals.com</span>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center px-6 justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Admin</p>
            <h1 className="text-lg font-semibold text-slate-900">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search admin…"
                className="h-9 w-64 rounded-full border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-indigo-500 text-xs font-semibold text-white flex items-center justify-center">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-slate-900">Admin User</p>
                <p className="text-[11px] text-slate-500">admin@woahdeals.com</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
