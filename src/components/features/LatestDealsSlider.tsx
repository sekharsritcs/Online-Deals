import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Deal } from "../../types/deal";
import { getLatestDeals } from "../../utils/deals";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CARDS_VISIBLE = 4;
const AUTO_PLAY_INTERVAL = 5000;

/**
 * Latest Deals: horizontal slider, ~4 cards visible, moves one at a time
 * Image + title + retailer only - no price, shop now, or like
 * Neutral color scheme
 */
const LatestDealsSlider: React.FC = () => {
  const deals = getLatestDeals(18);
  const maxIndex = Math.max(0, deals.length - CARDS_VISIBLE);
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = useCallback((): void => {
    setStartIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextSlide = useCallback((): void => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    if (deals.length === 0) return;
    const timer = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [deals.length, nextSlide]);

  if (deals.length === 0) return null;

  const visibleDeals = deals.slice(startIndex, startIndex + CARDS_VISIBLE);
  const totalSlides = Math.ceil(deals.length / CARDS_VISIBLE) || 1;
  const currentSlide = Math.min(Math.floor(startIndex / CARDS_VISIBLE), totalSlides - 1);

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Deals</h2>

      <div className="flex items-stretch gap-3">
        <button
          type="button"
          onClick={prevSlide}
          className="flex-shrink-0 w-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          aria-label="Previous deals"
        >
          <FaChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleDeals.map((deal) => (
              <LatestDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="flex-shrink-0 w-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          aria-label="Next deals"
        >
          <FaChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStartIndex(i * CARDS_VISIBLE)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentSlide ? "bg-gray-700" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

interface LatestDealCardProps {
  deal: Deal;
}

const LatestDealCard: React.FC<LatestDealCardProps> = ({ deal }) => {
  const imageUrl = deal.imageUrl || deal.image || "";

  return (
    <Link
      to={`/deals/${deal.id}`}
      className="group block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>
      <div className="p-3 bg-white border-t border-gray-100">
        <p className="text-gray-900 text-sm font-medium line-clamp-2">
          {deal.title}
        </p>
        <p className="text-gray-500 text-xs mt-1 truncate">
          {deal.merchant}
        </p>
      </div>
    </Link>
  );
};

export default LatestDealsSlider;
