/**
 * API Configuration
 */
export const API_CONFIG = {
  baseURL: "https://api.deals.vayavi.com/api",
  apiKey: import.meta.env.VITE_API_KEY || "WOAH_46A702BE-F6A0-4C98-B66D-9FB1E2370160_009",
  headers: {
    "Content-Type": "application/json",
  },
} as const;
