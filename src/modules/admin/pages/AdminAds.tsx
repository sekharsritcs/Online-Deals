import React, { useMemo, useState } from "react";

interface AdminAdsProps {
  type: "banners" | "sidebar" | "sliders";
}

const LABELS: Record<AdminAdsProps["type"], string> = {
  banners: "Banner Ads",
  sidebar: "Sidebar Ads",
  sliders: "Slider Ads",
};

type AdStatus = "active" | "paused";

interface AdPlacement {
  id: string;
  name: string;
  position: string;
  page: string;
  status: AdStatus;
  impressions: number;
  clicks: number;
}

const SAMPLE_ADS: AdPlacement[] = [
  {
    id: "ad-1",
    name: "Homepage hero banner",
    position: "Top banner",
    page: "Homepage",
    status: "active",
    impressions: 120_000,
    clicks: 3500,
  },
  {
    id: "ad-2",
    name: "Sidebar deal widget",
    position: "Right sidebar",
    page: "Deals listing",
    status: "active",
    impressions: 80_500,
    clicks: 2200,
  },
  {
    id: "ad-3",
    name: "Slider slot 1",
    position: "Hero slider",
    page: "Homepage",
    status: "paused",
    impressions: 45_000,
    clicks: 900,
  },
];

const AdminAds: React.FC<AdminAdsProps> = ({ type }) => {
  const [ads, setAds] = useState<AdPlacement[]>(SAMPLE_ADS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | AdStatus>("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ads.filter((ad) => {
      const matchSearch =
        !q ||
        ad.name.toLowerCase().includes(q) ||
        ad.page.toLowerCase().includes(q) ||
        ad.position.toLowerCase().includes(q);
      const matchStatus = !statusFilter || ad.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [ads, search, statusFilter]);

  const toggleStatus = (id: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, status: ad.status === "active" ? "paused" : "active" } : ad
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{LABELS[type]}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Configure ad placements, control visibility, and review basic performance metrics.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
        >
          + Add placement
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, page, or position…"
            className="min-w-[220px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AdStatus | "")}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Placement
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Page
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                  Impressions
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                  Clicks
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((ad) => (
                <tr key={ad.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 align-top">
                    <div className="font-medium text-slate-900">{ad.name}</div>
                    <div className="mt-0.5 text-[11px] text-slate-500">{ad.position}</div>
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-slate-700">{ad.page}</td>
                  <td className="px-4 py-2 align-top">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        ad.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {ad.status === "active" ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="px-4 py-2 align-top text-right text-sm text-slate-700">
                    {ad.impressions.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 align-top text-right text-sm text-slate-700">
                    {ad.clicks.toLocaleString()}
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
                        onClick={() => toggleStatus(ad.id)}
                        className="rounded border border-orange-200 px-2 py-0.5 text-xs text-orange-700 hover:bg-orange-50"
                      >
                        {ad.status === "active" ? "Pause" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No ad placements match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAds;

