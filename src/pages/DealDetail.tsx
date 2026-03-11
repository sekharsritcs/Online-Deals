import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {  dealsServices } from "../services/dealsServices";
import { formatCurrency } from "../utils";
import { useFavorites } from "../context/FavoritesContext";
import { getHotDealStyleForCategory } from "../constants/hotDealIcons";
import { useEffect } from "react";
import {
  FaFire,
  FaHeart,
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import HotDealsSidebar from "../components/layout/HotDealsSidebar";
import SimilarProductsSlider from "../components/features/SimilarProductsSlider";

/**
 * Deal Detail page - product details, tabs, sidebar (Popular/Trending Deals)
 */
const COMMENT_LIMIT = 160;

const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<"details" | "notes" | "poster">("details");
  const [vote, setVote] = useState<"like" | "dislike" | null>(null);
  const [comment, setComment] = useState("");
  const [deal, setDeal] = useState<any>(null);

 useEffect(() => {
  const fetchDeal = async () => {
    if (!id) return;

    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      console.error("Invalid deal id:", id);
      return;
    }

    try {
      const data = await dealsServices.getDealById(numericId);
      setDeal(data);
    } catch (error) {
      console.error("Error loading deal:", error);
    }
  };

  fetchDeal();
}, [id]);

  if (!deal) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Deal not found</h2>
        <Link to="/" className="text-orange-600 hover:underline mt-2 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const imageUrl = deal.imageUrl || deal.image || "";
  const discountLabel =
    deal.discount != null
      ? `${deal.discount}% off`
      : deal.originalPrice > 0 && deal.price < deal.originalPrice
        ? `${Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}% off`
        : null;
  const hotStyle = getHotDealStyleForCategory(deal.category);
  const favorite = isFavorite(deal.id);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Breadcrumbs row */}
      <div className="flex items-center gap-4 mb-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-600">
            Woah Deals
          </Link>
          <span>/</span>
          <Link to="/trending" className="hover:text-orange-600">
            Forums
          </Link>
          <span>/</span>
          <span className="text-orange-600 font-medium">Hot Deals</span>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-2">
            Posted {formatDate(deal.postedAt)}
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Product image */}
            <div className="flex-shrink-0">
              <div className="relative w-full md:w-80 aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                {deal.isHotDeal && (
                  <span
                    className={`absolute top-2 left-2 ${hotStyle.bgClass} ${hotStyle.textClass} text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1`}
                  >
                    <FaFire className={`h-3 w-3 ${hotStyle.iconColorClass}`} />
                    Hot Deal
                  </span>
                )}
              </div>
            </div>

            {/* Product info */}
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {deal.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <span className="text-2xl font-bold text-orange-600">
                  {deal.price > 0 ? formatCurrency(deal.price) : "See price"}
                </span>
                {deal.originalPrice > 0 && deal.price !== deal.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatCurrency(deal.originalPrice)}
                  </span>
                )}
                {discountLabel && (
                  <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-sm font-medium">
                    {discountLabel}
                  </span>
                )}
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <FaHeart className="text-red-500" /> 109
                </span>
                <span className="flex items-center gap-1">33 Comments</span>
                <span>21,000 Views</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={deal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Get Deal at {deal.merchant}
                </a>
                <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Share"
                >
                  <FaShare className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(deal)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorite ? (
                    <FaHeart className="h-5 w-5 text-red-500" />
                  ) : (
                    <FaBookmark className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Like/Dislike */}
              <div className="flex items-center gap-3 mt-4 text-sm">
                <span>Was this deal helpful?</span>
                <button
                  type="button"
                  onClick={() => setVote((v) => (v === "like" ? null : "like"))}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${
                    vote === "like"
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-400"
                  }`}
                >
                  <FaThumbsUp className="h-3 w-3" /> Like
                </button>
                <button
                  type="button"
                  onClick={() => setVote((v) => (v === "dislike" ? null : "dislike"))}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 ${
                    vote === "dislike"
                      ? "border-red-500 text-red-600 bg-red-50"
                      : "border-gray-200 hover:border-red-400"
                  }`}
                >
                  <FaThumbsDown className="h-3 w-3" /> Dislike
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-gray-200">
            <div className="flex gap-6 border-b border-gray-200">
              {(["details", "notes", "poster"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 font-medium border-b-2 -mb-px transition-colors ${
                    activeTab === tab
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "details" && "Deal Details"}
                  {tab === "notes" && "Community Notes"}
                  {tab === "poster" && "About the Poster"}
                </button>
              ))}
            </div>
            <div className="py-4 text-gray-700">
              {activeTab === "details" && (
                <div className="space-y-4">
                  <p>
                    This popular deal is still available. {deal.merchant} is offering this product
                    {deal.price > 0 && ` at ${formatCurrency(deal.price)}`}.
                    {deal.url && " Shipping may vary by merchant."}
                  </p>
                  {deal.description && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">About this product</h4>
                      <p>{deal.description}</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "notes" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add a comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value.slice(0, COMMENT_LIMIT))}
                      maxLength={COMMENT_LIMIT}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Share your thoughts about this deal..."
                    />
                    <div className="mt-1 text-right text-sm text-gray-500">
                      {comment.length} / {COMMENT_LIMIT}
                    </div>
                    <button
                      type="button"
                      className="mt-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                    >
                      Post Comment
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">No community notes yet. Be the first to add one!</p>
                </div>
              )}
              {activeTab === "poster" && (
                <p className="text-gray-500">Posted by community member. Details coming soon.</p>
              )}
            </div>
          </div>

          {/* Similar Products slider */}
          <SimilarProductsSlider currentDealId={deal.id} category={deal.category} />
        </div>

        <HotDealsSidebar excludeDealId={deal.id} />
      </div>
    </div>
  );
};

export default DealDetail;
