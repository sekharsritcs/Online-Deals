import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import {
  Home,
  Deals,
  Trending,
  HalloweenDeals,
  WayfairDeals,
  TopRetailDeals,
  ToolDeals,
  TechDeals,
  ApparelDeals,
  HomeDeals,
  TravelDeals,
  QuickCoupons,
  DealDetail,
  About,
  Contact,
  FAQ,
  NotFound,
} from "./pages";
import { FavoritesProvider } from "./context/FavoritesContext";
import AdminLayout from "./modules/admin/layout/AdminLayout";
import AdminDashboard from "./modules/admin/pages/AdminDashboard";
import AdminCategories from "./modules/admin/pages/AdminCategories";
import AdminSubCategories from "./modules/admin/pages/AdminSubCategories";
import AdminAddCategory from "./modules/admin/pages/AdminAddCategory";
import AdminAddSubCategory from "./modules/admin/pages/AdminAddSubCategory";
import AdminUsers from "./modules/admin/pages/AdminUsers";
import AdminRoles from "./modules/admin/pages/AdminRoles";
import AdminRolePermissions from "./modules/admin/pages/AdminRolePermissions";
import AdminProducts from "./modules/admin/pages/AdminProducts";
import AdminAddProduct from "./modules/admin/pages/AdminAddProduct";
import AdminCoupons from "./modules/admin/pages/AdminCoupons";
import AdminContent from "./modules/admin/pages/AdminContent";
import AdminDeals from "./modules/admin/pages/AdminDeals";
import AdminDealCategories from "./modules/admin/pages/AdminDealCategories";
import AdminAds from "./modules/admin/pages/AdminAds";
import AdminReports from "./modules/admin/pages/AdminReports";
import AdminSettings from "./modules/admin/pages/AdminSettings";
import AdminAccounts from "./modules/admin/pages/AdminAccounts";
import AdminQuotes from "./modules/admin/pages/AdminQuotes";
import AdminLogin from "./modules/admin/pages/AdminLogin";
import AdminForgotPassword from "./modules/admin/pages/AdminForgotPassword";

/**
 * Main App component with routing configuration
 */
const App: React.FC = () => {
  const handleSearch = (query: string): void => {
    console.log("App-level search:", query);
    // TODO: Implement search functionality - could navigate to search results page
  };

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin auth (no sidebar) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          {/* Layout route wraps all pages with Header and Footer */}
          <Route element={<Layout onSearch={handleSearch} />}>
            <Route path="/" element={<Home />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/halloween-deals" element={<HalloweenDeals />} />
            <Route path="/wayfair-deals" element={<WayfairDeals />} />
            <Route path="/top-retail-deals" element={<TopRetailDeals />} />
            <Route path="/tool-deals" element={<ToolDeals />} />
            <Route path="/tech-deals" element={<TechDeals />} />
            <Route path="/apparel-deals" element={<ApparelDeals />} />
            <Route path="/home-deals" element={<HomeDeals />} />
            <Route path="/travel-deals" element={<TravelDeals />} />
            <Route path="/quick-coupons" element={<QuickCoupons />} />
            <Route path="/deals/:id" element={<DealDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/404" element={<NotFound />} />
            {/* Catch all - redirect to 404 */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>

          {/* Admin routes (separate layout, no public header/footer) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            {/* User management */}
            <Route path="users" element={<AdminUsers />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="role-permissions" element={<AdminRolePermissions />} />

            {/* Product management */}
            <Route path="products" element={<AdminProducts type="all" />} />
            <Route path="products/new" element={<AdminAddProduct />} />
            <Route path="products/edit/:id" element={<AdminAddProduct />} />
            <Route path="products/bulk-upload" element={<AdminProducts type="bulk" />} />

            {/* Category management */}
            <Route path="categories" element={<AdminCategories />} />
            <Route path="categories/new" element={<AdminAddCategory />} />
            <Route path="categories/edit/:id" element={<AdminAddCategory />} />
            <Route path="categories/sub" element={<AdminSubCategories />} />
            <Route path="categories/sub/new" element={<AdminAddSubCategory />} />
            <Route path="categories/sub/edit/:id" element={<AdminAddSubCategory />} />

            {/* Coupons management */}
            <Route path="coupons/active" element={<AdminCoupons type="active" />} />
            <Route path="coupons/quick" element={<AdminCoupons type="quick" />} />
            <Route path="coupons/expired" element={<AdminCoupons type="expired" />} />

            {/* Content management */}
            <Route path="content/homepage" element={<AdminContent type="homepage" />} />
            <Route path="content/pages" element={<AdminContent type="pages" />} />

            {/* Deal management */}
            <Route path="deals" element={<AdminDeals type="all" />} />
            <Route path="deals/new" element={<AdminDeals type="new" />} />
            <Route path="deals/hot" element={<AdminDeals type="hot" />} />
            <Route path="deals/featured" element={<AdminDeals type="featured" />} />
            <Route path="deals/expired" element={<AdminDeals type="expired" />} />

            {/* Deal categories */}
            <Route
              path="deal-categories/latest"
              element={<AdminDealCategories type="latest" />}
            />
            <Route
              path="deal-categories/travel"
              element={<AdminDealCategories type="travel" />}
            />
            <Route
              path="deal-categories/quick-coupons"
              element={<AdminDealCategories type="quickCoupons" />}
            />

            {/* Ads */}
            <Route path="ads/banners" element={<AdminAds type="banners" />} />
            <Route path="ads/sidebar" element={<AdminAds type="sidebar" />} />
            <Route path="ads/sliders" element={<AdminAds type="sliders" />} />

            {/* Accounts & Quotes */}
            <Route path="accounts" element={<AdminAccounts />} />
            <Route path="quotes" element={<AdminQuotes />} />

            {/* Other */}
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
};

export default App;
