/**
 * Category constants
 */
export const CATEGORIES = [
  "Trending",
  "Halloween Deals",
  "Wayfair Deals",
  "Top Retail Deals",
  "Tool Deals",
  "Tech Deals",
  "Apparel",
  "Home Deals",
] as const;

export type CategoryName = typeof CATEGORIES[number];
