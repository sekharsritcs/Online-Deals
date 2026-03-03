import React, { useMemo } from "react";
import { mockDeals } from "../../../types/deal";
import { SAMPLE_PRODUCTS } from "../../../constants/adminSamples";

const AdminDashboard: React.FC = () => {
  const stats = useMemo(() => {
    const totalDeals = mockDeals.length;
    const activeDeals = mockDeals.filter((d) => !d.isHotDeal || d.discount !== undefined).length;
    const hotDeals = mockDeals.filter((d) => d.isHotDeal).length;
    const totalDiscountValue = mockDeals.reduce((sum, d) => {
      if (!d.discount || !d.originalPrice) return sum;
      return sum + (d.originalPrice * d.discount) / 100;
    }, 0);

    const clicksToday = 1243; // sample metric
    const revenueToday = 4820; // sample metric in USD-equivalent

    const totalProducts = SAMPLE_PRODUCTS.length;
    const topProducts = SAMPLE_PRODUCTS.slice(0, 3);

    return {
      totalDeals,
      activeDeals,
      hotDeals,
      totalDiscountValue: Math.round(totalDiscountValue),
      clicksToday,
      revenueToday,
      totalProducts,
      topProducts,
    };
  }, []);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
          <p className="mt-1 text-sm text-slate-600">
            High‑level snapshot of deals, coupons, and product performance on Woah Deals.
          </p>
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total deals
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.totalDeals}</p>
          <p className="mt-1 text-xs text-slate-500">
            {stats.hotDeals} marked as hot deals
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Active deals
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.activeDeals}</p>
          <p className="mt-1 text-xs text-slate-500">
            Includes all currently promoted offers
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Clicks today
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.clicksToday.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">Sample engagement metric</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Est. revenue today
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            ${stats.revenueToday.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">Based on sample conversion assumptions</p>
        </div>
      </section>

      {/* Deals & products summary */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr,1.4fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Deals summary</h3>
          <p className="mt-1 text-xs text-slate-600">
            Breakdown of current deal inventory based on sample data.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="flex items-center justify-between">
              <span>Total discount value (approx.)</span>
              <span className="font-semibold">
                ${stats.totalDiscountValue.toLocaleString()}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Hot deals</span>
              <span className="font-semibold">{stats.hotDeals}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Total products linked to deals</span>
              <span className="font-semibold">{stats.totalProducts}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Top products</h3>
          <p className="mt-1 text-xs text-slate-600">
            Sample view of products with strong discounts.
          </p>
          <ul className="mt-4 divide-y divide-slate-100 text-sm">
            {stats.topProducts.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">
                    {p.categoryName} · {p.subCategoryName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    ₹{p.sellingPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-emerald-600">{p.discountPercent}% off</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

