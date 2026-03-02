/**
 * Category name to route path mapping (matches screenshot horizontal menu)
 */
export const CATEGORY_ROUTES: Record<string, string> = {
  "Trending": "/trending",
  "Top Retail Deals": "/top-retail-deals",
  "Tool Deals": "/deals?category=tool",
  "Tech Deals": "/deals?category=tech",
  "Apparel": "/deals?category=apparel",
  "Credit Card Offers": "/deals?category=credit",
  "Laptops & Computers": "/deals?category=laptops",
  "Home Deals": "/deals?category=home",
  "Sneaker Deals": "/deals?category=sneaker",
  "Grocery Deals": "/deals?category=grocery",
  "Halloween Deals": "/halloween-deals",
  "Wayfair Deals": "/wayfair-deals",
} as const;

export function getCategoryPath(category: string): string | undefined {
  return CATEGORY_ROUTES[category];
}

/** Menu items for horizontal nav */
export const MENU_ITEMS: { path: string; label: string }[] = [
  { path: "/trending", label: "Trending" },
  { path: "/halloween-deals", label: "Halloween Deals" },
  { path: "/wayfair-deals", label: "Wayfair Deals" },
  { path: "/top-retail-deals", label: "Top Retail Deals" },
  { path: "/tool-deals", label: "Tool Deals" },
  { path: "/tech-deals", label: "Tech Deals" },
  { path: "/apparel-deals", label: "Apparel" },
  { path: "/home-deals", label: "Home Deals" },
  { path: "/travel-deals", label: "Travel Deals" },
  { path: "/quick-coupons", label: "Quick Coupons" },
];
