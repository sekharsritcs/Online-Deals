import React from "react";
import { Link } from "react-router-dom";
import type { Deal } from "../../types/deal";
import { formatCurrency } from "../../utils";
import { useFavorites } from "../../context/FavoritesContext";
import { getHotDealStyleForCategory } from "../../constants/hotDealIcons";
import { FaFire, FaHeart, FaRegHeart } from "react-icons/fa";

/**
 * DealCard component props
 */
interface DealCardProps {
  deal: Deal;
  className?: string;
}

/**
 * Single deal card in dealsofamerica/slickdeals style
 */
const DealCard: React.FC<DealCardProps> = ({ deal, className = "" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const imageUrl = deal.imageUrl || deal.image || "";
  const discountLabel =
    deal.discount != null
      ? `${deal.discount}% Off`
      : deal.originalPrice > 0 && deal.price < deal.originalPrice
        ? `${Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% Off`
        : null;

  const hotStyle = getHotDealStyleForCategory(deal.category);

  const favorite = isFavorite(deal.id);

  const handleToggleFavorite = (): void => {
    toggleFavorite(deal);
  };

  return (
    <article
      className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 flex flex-col ${className}`}
    >
      <Link
        to={`/deals/${deal.id}`}
        className="relative block w-full h-64 bg-gray-100 overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {deal.isHotDeal && (
          <span
            className={`absolute top-2 left-2 ${hotStyle.bgClass} ${hotStyle.textClass} text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1`}
          >
            <FaFire className={`h-3 w-3 ${hotStyle.iconColorClass}`} />
            Hot Today
          </span>
        )}
        {discountLabel && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {discountLabel}
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link
          to={`/deals/${deal.id}`}
          className="font-semibold text-gray-800 line-clamp-2 mb-1 text-sm hover:text-orange-600 transition-colors block"
        >
          {deal.title}
        </Link>
        <p className="text-xs text-gray-500 mb-2">{deal.merchant}</p>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="font-bold text-orange-600">
            {deal.price > 0 ? formatCurrency(deal.price) : "See price"}
          </span>
          {deal.originalPrice > 0 && deal.price !== deal.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(deal.originalPrice)}
            </span>
          )}
        </div>
        {/* Shop & actions */}
        <div className="flex items-center justify-between mt-auto">
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-600 transition-colors"
          >
            Shop Now
          </a>
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            {favorite ? <FaHeart className="h-5 w-5" /> : <FaRegHeart className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </article>
  );
};

export default DealCard;
