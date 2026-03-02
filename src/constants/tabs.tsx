/**
 * Tab configuration interface
 */
export interface TabConfig {
  id: string;
  label: string;
}

/**
 * Tab definitions – actual deal content is decided in Tabs component.
 */
export const TAB_CONFIGS: TabConfig[] = [
  {
    id: "latest",
    label: "Latest Deals",
  },
  {
    id: "weekly",
    label: "Weekly Ads",
  },
  {
    id: "travel",
    label: "Travel Deals",
  },
  {
    id: "coupons",
    label: "Quick Coupons",
  },
];
