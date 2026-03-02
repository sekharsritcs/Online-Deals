/**
 * Category interface representing a deal category
 */
export interface Category {
  category_id: number;
  category_name?: string;
  hierarchy_level?: number;
  created_by?: number;
  created_at?: string; // ISO string for DateTime
  updated_by?: number;
  updated_at?: string; // ISO string for DateTime
  isactive: boolean;
}

/**
 * Category creation payload (without generated fields)
 */
export type CategoryCreatePayload = Omit<Category, "category_id" | "created_at" | "updated_at">;

/**
 * Category update payload (partial, excluding generated fields)
 */
export type CategoryUpdatePayload = Partial<Omit<Category, "category_id" | "created_at" | "updated_at">>;
