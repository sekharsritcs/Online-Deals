import React from "react";
import { DealGrid } from "../components/features";
import PageWithSidebar from "../components/layout/PageWithSidebar";
import { TOP_RETAIL_DEALS } from "../constants/categoryDeals";

const TopRetailDeals: React.FC = () => {
  const deals = [...TOP_RETAIL_DEALS].sort((a, b) => (b.isHotDeal ? 1 : 0) - (a.isHotDeal ? 1 : 0));

  return (
    <PageWithSidebar>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Top Retail Deals</h1>
        <p className="text-gray-600 mb-6">
          Best deals from Amazon, Target, Walmart, and more.
        </p>
        <section>
          <h2 className="text-xl font-semibold text-orange-600 mb-3">
            Hot Deals Today
          </h2>
          <DealGrid deals={deals} />
        </section>
      </div>
    </PageWithSidebar>
  );
};

export default TopRetailDeals;
