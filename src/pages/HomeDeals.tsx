import React from "react";
import { DealGrid } from "../components/features";
import PageWithSidebar from "../components/layout/PageWithSidebar";
import { HOME_DEALS } from "../constants/categoryDeals";

const HomeDeals: React.FC = () => {
  const deals = [...HOME_DEALS].sort((a, b) => (b.isHotDeal ? 1 : 0) - (a.isHotDeal ? 1 : 0));

  return (
    <PageWithSidebar>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Home Deals</h1>
        <p className="text-gray-600 mb-6">
          Furniture, decor, appliances, and more.
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

export default HomeDeals;
