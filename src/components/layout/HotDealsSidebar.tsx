import React from "react";
import { Link } from "react-router-dom";
import DealSidebarItem from "../features/DealSidebarItem";
import { getPopularDeals, getTrendingDeals } from "../../utils/deals";

interface HotDealsSidebarProps {
  /** Optional deal ID to exclude (e.g. current deal on detail page) */
  excludeDealId?: string;
}

/**
 * Sidebar with Popular Deals and Trending Deals (like detail page)
 */
const HotDealsSidebar: React.FC<HotDealsSidebarProps> = ({ excludeDealId }) => {
  const popularDeals = getPopularDeals(6)
    .filter((d) => d.id !== excludeDealId)
    .slice(0, 5);
  const trendingDeals = getTrendingDeals(5)
    .filter((d) => d.id !== excludeDealId)
    .slice(0, 4);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Popular Deals</h3>
          <Link to="/deals" className="text-sm text-orange-600 hover:underline">
            See All
          </Link>
        </div>
        <div className="space-y-1">
          {popularDeals.map((d) => (
            <DealSidebarItem key={d.id} deal={d} />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Trending Deals</h3>
          <Link to="/trending" className="text-sm text-orange-600 hover:underline">
            See All
          </Link>
        </div>
        <div className="space-y-1">
          {trendingDeals.map((d) => (
            <DealSidebarItem key={d.id} deal={d} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HotDealsSidebar;
