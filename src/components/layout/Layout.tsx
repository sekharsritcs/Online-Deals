import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CategoryNav from "./CategoryNav";

/**
 * Layout component props
 */
interface LayoutProps {
  onSearch?: (query: string) => void;
}

/**
 * Main layout wrapper component that includes Header, CategoryNav, and Footer
 * Uses Outlet to render child routes
 */
const Layout: React.FC<LayoutProps> = ({ onSearch }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearch={onSearch} />
      <CategoryNav />
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 pt-0 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
