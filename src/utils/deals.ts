import type { Deal } from "../types/deal";
import { mockDeals } from "../types/deal";
import { TRENDING_DEALS } from "../constants/trendingDeals";
import {
  HALLOWEEN_DEALS,
  WAYFAIR_DEALS,
  TOP_RETAIL_DEALS,
  TOOL_DEALS,
  TECH_DEALS,
  APPAREL_DEALS,
  HOME_DEALS,
  TRAVEL_DEALS,
  QUICK_COUPONS,
} from "../constants/categoryDeals";

/** All deals from all sources (for lookup and sidebars) */
const ALL_DEALS: Deal[] = [
  ...mockDeals,
  ...TRENDING_DEALS,
  ...HALLOWEEN_DEALS,
  ...WAYFAIR_DEALS,
  ...TOP_RETAIL_DEALS,
  ...TOOL_DEALS,
  ...TECH_DEALS,
  ...APPAREL_DEALS,
  ...HOME_DEALS,
  ...TRAVEL_DEALS,
  ...QUICK_COUPONS,
];

/** Dedupe by id, prefer first occurrence */
const uniqueDeals = (deals: Deal[]): Deal[] => {
  const seen = new Set<string>();
  return deals.filter((d) => {
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });
};

export const allDeals = uniqueDeals(ALL_DEALS);

export function getDealById(id: string): Deal | undefined {
  return allDeals.find((d) => d.id === id);
}

/** Popular deals: high discount or hot */
export function getPopularDeals(limit = 5): Deal[] {
  return [...allDeals]
    .filter((d) => (d.discount ?? 0) >= 30 || d.isHotDeal)
    .slice(0, limit);
}

/** Trending deals: hot ones first */
export function getTrendingDeals(limit = 5): Deal[] {
  return [...allDeals]
    .filter((d) => d.isHotDeal)
    .slice(0, limit);
}

/** Latest deals: sorted by postedAt, newest first */
export function getLatestDeals(limit = 12): Deal[] {
  return [...allDeals]
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, limit);
}

/** Similar deals: same category first, then popular, exclude current deal */
export function getSimilarDeals(currentDealId: string, category: string, limit = 12): Deal[] {
  const catLower = category.toLowerCase();
  const sameCategory = allDeals.filter(
    (d) =>
      d.id !== currentDealId &&
      (d.category === category || d.category.toLowerCase().includes(catLower.split(" ")[0]))
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const rest = allDeals.filter(
    (d) => d.id !== currentDealId && !sameCategory.find((s) => s.id === d.id)
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Get deals by category slug (used for /deals?category=*) */
export function getDealsByCategory(categorySlug: string): Deal[] {
  const slug = categorySlug?.toLowerCase().trim();
  if (!slug) return allDeals;

  const categoryMap: Record<string, string> = {
    tool: "Tool Deals",
    tech: "Tech Deals",
    apparel: "Apparel",
    home: "Home Deals",
    travel: "Travel Deals",
    "quick-coupons": "Quick Coupons",
  };
  const categoryName = categoryMap[slug];
  if (!categoryName) return allDeals;

  return allDeals.filter(
    (d) => d.category === categoryName || d.category.toLowerCase().includes(slug)
  );
}
