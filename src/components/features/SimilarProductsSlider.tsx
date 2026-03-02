import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getSimilarDeals } from "../../utils/deals";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SLIDES_TO_SHOW = 3;

interface SimilarProductsSliderProps {
  currentDealId: string;
  category: string;
}

/**
 * Similar Products slider - "Checkout Similar Deals..." style
 * Image + teal band at bottom with title, 3 cards visible
 */
const SimilarProductsSlider: React.FC<SimilarProductsSliderProps> = ({
  currentDealId,
  category,
}) => {
  const deals = getSimilarDeals(currentDealId, category, 12);
  const [startIndex, setStartIndex] = useState(0);

  const visibleDeals = deals.slice(startIndex, startIndex + SLIDES_TO_SHOW);
  const canPrev = startIndex > 0;
  const canNext = startIndex + SLIDES_TO_SHOW < deals.length;

  if (deals.length === 0) return null;

  return (
    <div className="w-full mt-10 pt-8 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-teal-600 mb-4">
        Checkout Similar Deals...
      </h3>

      <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <button
          type="button"
          onClick={() => setStartIndex((i) => Math.max(0, i - 1))}
          disabled={!canPrev}
          className="flex-shrink-0 w-10 h-24 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous deals"
        >
          <FaChevronLeft className="h-5 w-5 text-teal-600" />
        </button>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {visibleDeals.map((deal) => (
            <Link
              key={deal.id}
              to={`/deals/${deal.id}`}
              className="group block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={deal.imageUrl || deal.image || ""}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="bg-teal-700 px-3 py-3">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {deal.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setStartIndex((i) => Math.min(deals.length - SLIDES_TO_SHOW, i + 1))
          }
          disabled={!canNext}
          className="flex-shrink-0 w-10 h-24 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next deals"
        >
          <FaChevronRight className="h-5 w-5 text-teal-600" />
        </button>
      </div>
    </div>
  );
};

export default SimilarProductsSlider;
