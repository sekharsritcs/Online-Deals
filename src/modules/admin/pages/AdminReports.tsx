import React, { useMemo } from "react";
import { mockDeals } from "../../../types/deal";
import { SAMPLE_PRODUCTS } from "../../../constants/adminSamples";

const AdminReports: React.FC = () => {
  const stats = useMemo(() => {
    const totalDeals = mockDeals.length;
    const hotDeals = mockDeals.filter((d) => d.isHotDeal).length;
    const avgDiscount =
      mockDeals.reduce((sum, d) => sum + (d.discount ?? 0), 0) /
      (mockDeals.filter((d) => d.discount !== undefined).length || 1);

    const totalProducts = SAMPLE_PRODUCTS.length;
    const avgProductDiscount =
      SAMPLE_PRODUCTS.reduce((sum, p) => sum + p.discountPercent, 0) /
      (SAMPLE_PRODUCTS.length || 1);

    return {
      totalDeals,
      hotDeals,
      avgDiscount: Math.round(avgDiscount),
      totalProducts,
      avgProductDiscount: Math.round(avgProductDiscount),
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Reports</h2>
        <p className="mt-1 text-sm text-slate-600">
          High‑level KPIs for deals and product catalog, based on current sample data.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total deals
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.totalDeals}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Hot deals
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.hotDeals}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Avg deal discount
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {Number.isFinite(stats.avgDiscount) ? `${stats.avgDiscount}%` : "—"}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Avg product discount
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {Number.isFinite(stats.avgProductDiscount) ? `${stats.avgProductDiscount}%` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;

