import React from "react";
import { useSearchParams } from "react-router-dom";
import { DealGrid } from "../components/features";
import PageWithSidebar from "../components/layout/PageWithSidebar";
import { getDealsByCategory } from "../utils/deals";

const Deals: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const deals = [...getDealsByCategory(category)].sort(
    (a, b) => (b.isHotDeal ? 1 : 0) - (a.isHotDeal ? 1 : 0)
  );

  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Deals`
    : "All Deals";

  return (
    <PageWithSidebar>
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">
          {category ? `Browse deals in ${title}` : "Browse all available deals."}
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

export default Deals;
