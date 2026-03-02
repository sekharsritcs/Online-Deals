/**
 * Admin product type – Flipkart/Amazon-style product details
 */
export interface AdminProduct {
  id: string;
  name: string;
  brand: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  shortDescription: string;
  longDescription: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  imageUrls: string[];
  specifications: Record<string, string>;
  stock: number;
  status: "active" | "draft";
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Main category (level 1) for admin
 */
export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  subCount?: number;
}

/**
 * Sub-category (level 2) under a main category
 */
export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
  parentName?: string;
  isActive: boolean;
}
