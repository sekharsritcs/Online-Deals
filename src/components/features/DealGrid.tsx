import React from "react";
import type { Deal } from "../../types/deal";
import DealCard from "./DealCard";

/**
 * DealGrid component props
 */
interface DealGridProps {
  deals: Deal[];
  className?: string;
}

/**
 * Grid of deal cards (dealsofamerica/slickdeals style)
 */
const DealGrid: React.FC<DealGridProps> = ({ deals, className = "" }) => {
  if (deals.length === 0) {
    return (
      <div className={`p-8 bg-white rounded-lg shadow text-center text-gray-600 ${className}`}>
        No deals found in this category.
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealGrid;
