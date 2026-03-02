import React, { useMemo, useState } from "react";
import { TRAVEL_DEALS, QUICK_COUPONS, TOP_RETAIL_DEALS } from "../../../constants/categoryDeals";
import type { Deal } from "../../../types/deal";

interface AdminDealCategoriesProps {
  type: "latest" | "travel" | "quickCoupons";
}

const LABELS: Record<AdminDealCategoriesProps["type"], string> = {
  latest: "Latest Deals",
  travel: "Travel Deals",
  quickCoupons: "Quick Coupons",
};

const sourceDeals: Record<AdminDealCategoriesProps["type"], Deal[]> = {
  latest: TOP_RETAIL_DEALS,
  travel: TRAVEL_DEALS,
  quickCoupons: QUICK_COUPONS,
};

const AdminDealCategories: React.FC<AdminDealCategoriesProps> = ({ type }) => {
  const [search, setSearch] = useState("");
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [homepageEnabled, setHomepageEnabled] = useState(true);

  const deals = sourceDeals[type];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return deals;
    return deals.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.merchant.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }, [deals, search]);

  const togglePinned = (id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {LABELS[type]} category configuration
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Control which deals are surfaced under this curated category on the storefront.
          </p>
        </div>
        <label className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={homepageEnabled}
            onChange={(e) => setHomepageEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
          />
          Show on homepage
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deals by title or merchant…"
            className="min-w-[220px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <p className="text-xs text-slate-500">
            Pin up to 8 deals to always appear first in this category.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Deal
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Merchant
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Discount
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Hot
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                  Pinned
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((deal) => {
                const pinned = pinnedIds.has(deal.id);
                return (
                  <tr key={deal.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 align-top">
                      <div className="font-medium text-slate-900">{deal.title}</div>
                      <div className="mt-0.5 text-[11px] text-slate-500">
                        {new Date(deal.postedAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      {deal.merchant}
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      {deal.discount ? `${deal.discount}%` : "—"}
                    </td>
                    <td className="px-4 py-2 align-top">
                      {deal.isHotDeal ? (
                        <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600">
                          HOT
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 align-top text-right">
                      <button
                        type="button"
                        onClick={() => togglePinned(deal.id)}
                        className={`rounded border px-2 py-0.5 text-xs ${
                          pinned
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {pinned ? "Pinned" : "Pin"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No deals match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDealCategories;

