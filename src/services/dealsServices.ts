import Methods from "../http/Methods";
import type { Deal } from "../types/deal";

const mapDeal = (deal: any) => ({
  id: deal.deal_id,
  title: deal.title ?? "",
  description: deal.description ?? "",
  price: deal.price ?? 0,
  originalPrice: deal.original_price ?? deal.price ?? 0,
  discount: deal.discount_percent ?? 0,
  merchant: deal.store_name ?? "Unknown",
  imageUrl: deal.image_url ?? "",
  category: String(deal.category_id ?? "general"),
  postedAt: deal.created_on ?? "",
  url: deal.deal_url ?? "#",
  isHotDeal: deal.is_featured ?? false
});

export const dealsServices = {

  async getAllDeals(): Promise<any[]> {
    const response = await Methods.get("/deals");
    return response.listDeals.map(mapDeal);
  },

  async getDealById(id: number): Promise<any> {
    const response = await Methods.get(`/deals/${id}`);

    console.log("API DEAL RESPONSE:", response);
    return mapDeal(response.details);
  }
};