import React from "react";
import { Link } from "react-router-dom";
import type { Deal } from "../../types/deal";
import { formatCurrency } from "../../utils";
import { getHotDealStyleForCategory } from "../../constants/hotDealIcons";
import { FaFire } from "react-icons/fa";

interface DealSidebarItemProps {
  deal: Deal;
}

/**
 * Compact deal item for sidebar (Popular/Trending)
 */
const DealSidebarItem: React.FC<DealSidebarItemProps> = ({ deal }) => {
  const imageUrl = deal.imageUrl || deal.image || "";
  const hotStyle = getHotDealStyleForCategory(deal.category);
  const discountLabel =
    deal.discount != null
      ? `${deal.discount}% Off`
      : deal.originalPrice > 0 && deal.price < deal.originalPrice
        ? `${Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% Off`
        : null;

  return (
    <Link
      to={`/deals/${deal.id}`}
      className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {deal.isHotDeal && (
          <span
            className={`absolute top-0.5 left-0.5 ${hotStyle.bgClass} ${hotStyle.textClass} text-[10px] font-semibold px-1 py-0.5 rounded flex items-center gap-0.5`}
          >
            <FaFire className="h-2 w-2" />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-orange-600">
          {deal.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-semibold text-orange-600">
            {deal.price > 0 ? formatCurrency(deal.price) : "See price"}
          </span>
          {deal.originalPrice > 0 && deal.price !== deal.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(deal.originalPrice)}
            </span>
          )}
          {discountLabel && (
            <span className="text-xs text-green-600 font-medium">{discountLabel}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DealSidebarItem;
