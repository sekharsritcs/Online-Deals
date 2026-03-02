import React, { useMemo, useState } from "react";
import { QUICK_COUPONS } from "../../../constants/categoryDeals";

interface AdminCouponsProps {
  type: "active" | "quick" | "expired";
}

const LABELS: Record<AdminCouponsProps["type"], string> = {
  active: "Active Coupons",
  quick: "Quick Coupons",
  expired: "Expired Coupons",
};

const AdminCoupons: React.FC<AdminCouponsProps> = ({ type }) => {
  const [search, setSearch] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");

  const baseCoupons = useMemo(() => {
    if (type === "expired") return [] as typeof QUICK_COUPONS;
    return QUICK_COUPONS;
  }, [type]);

  const merchants = useMemo(
    () => Array.from(new Set(baseCoupons.map((c) => c.merchant))).sort(),
    [baseCoupons]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return baseCoupons.filter((c) => {
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.merchant.toLowerCase().includes(q) ||
        (c.description ?? "").toLowerCase().includes(q);
      const matchMerchant = !merchantFilter || c.merchant === merchantFilter;
      return matchSearch && matchMerchant;
    });
  }, [baseCoupons, search, merchantFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{LABELS[type]}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage discount codes and promotional coupons surfaced on the Quick Coupons page.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
        >
          + Add coupon
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coupon title, merchant, or code…"
            className="min-w-[200px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <select
            value={merchantFilter}
            onChange={(e) => setMerchantFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All merchants</option>
            {merchants.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-sm text-slate-500">
          No coupons found for this filter. Adjust filters or add a new coupon.
        </div>
      )}

      {filtered.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="max-h-[520px] overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Coupon
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Merchant
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Discount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Description
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 align-top">
                      <div className="font-medium text-slate-900">{coupon.title}</div>
                      <div className="mt-0.5 text-[11px] text-slate-500">
                        {new Date(coupon.postedAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      {coupon.merchant}
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      {coupon.discount ? `${coupon.discount}%` : "—"}
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      {coupon.description ?? "—"}
                    </td>
                    <td className="px-4 py-2 align-top text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded border border-red-200 px-2 py-0.5 text-xs text-red-700 hover:bg-red-50"
                        >
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;

