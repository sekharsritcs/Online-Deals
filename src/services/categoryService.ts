import httpClient from "./httpClient";
import type { Category, CategoryCreatePayload, CategoryUpdatePayload } from "../types/category";

/**
 * Category service for API interactions
 */
export const categoryService = {
  /**
   * Get all categories
   */
  async getAll(): Promise<Category[]> {
    const response = await httpClient.get<Category[]>("/categories");
    return response.data;
  },

  /**
   * Get category by ID
   */
  async getById(id: number): Promise<Category> {
    const response = await httpClient.get<Category>(`/categories/${id}`);
    return response.data;
  },

  /**
   * Create a new category
   */
  async create(category: CategoryCreatePayload): Promise<Category> {
    const response = await httpClient.post<Category>("/categories", category);
    return response.data;
  },

  /**
   * Update an existing category
   */
  async update(id: number, category: CategoryUpdatePayload): Promise<Category> {
    const response = await httpClient.put<Category>(`/categories/${id}`, category);
    return response.data;
  },

  /**
   * Delete a category
   */
  async delete(id: number): Promise<void> {
    await httpClient.delete(`/categories/${id}`);
  },

  /**
   * Get active categories filtered by hierarchy level
   */
  async getActiveByHierarchy(hierarchyLevel: number): Promise<Category[]> {
    const response = await httpClient.get<Category[]>(
      `/Category/GetActiveCategoriesByHierarchy`,
      {
        params: { hierarchylevel: hierarchyLevel },
      }
    );
    return response.data;
  },
};
