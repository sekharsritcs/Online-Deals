/**
 * Category-specific Hot Deal badge styling (fire icon + colors)
 * Different look per category as per screenshot
 */
export interface HotDealStyle {
  bgClass: string;
  textClass: string;
  iconColorClass: string;
}

/** Map category (or partial match) to Hot Deal style */
const CATEGORY_STYLES: Record<string, HotDealStyle> = {
  trending: {
    bgClass: "bg-red-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  "halloween deals": {
    bgClass: "bg-purple-600",
    textClass: "text-white",
    iconColorClass: "text-orange-200",
  },
  "wayfair deals": {
    bgClass: "bg-orange-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  "top retail deals": {
    bgClass: "bg-blue-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  "tool deals": {
    bgClass: "bg-slate-600",
    textClass: "text-white",
    iconColorClass: "text-amber-200",
  },
  "tech deals": {
    bgClass: "bg-blue-700",
    textClass: "text-white",
    iconColorClass: "text-cyan-200",
  },
  apparel: {
    bgClass: "bg-pink-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  "home deals": {
    bgClass: "bg-emerald-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  electronics: {
    bgClass: "bg-red-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  food: {
    bgClass: "bg-amber-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  sports: {
    bgClass: "bg-green-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  kitchen: {
    bgClass: "bg-orange-500",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  "travel deals": {
    bgClass: "bg-cyan-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
  "quick coupons": {
    bgClass: "bg-emerald-600",
    textClass: "text-white",
    iconColorClass: "text-white",
  },
};

const DEFAULT_STYLE: HotDealStyle = {
  bgClass: "bg-orange-500",
  textClass: "text-white",
  iconColorClass: "text-white",
};

export function getHotDealStyleForCategory(category: string): HotDealStyle {
  const key = category.trim().toLowerCase();
  for (const [cat, style] of Object.entries(CATEGORY_STYLES)) {
    if (key.includes(cat) || cat.includes(key)) return style;
  }
  return DEFAULT_STYLE;
}
