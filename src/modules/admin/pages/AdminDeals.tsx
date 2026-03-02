import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Deal } from "../../../types/deal";
import { mockDeals } from "../../../types/deal";

interface AdminDealsProps {
  type: "all" | "new" | "hot" | "featured" | "expired";
}

const LABELS: Record<AdminDealsProps["type"], string> = {
  all: "All Deals",
  new: "Add Deal",
  hot: "Hot Deals",
  featured: "Featured Deals",
  expired: "Expired Deals",
};

const AdminDealsList: React.FC<{ variant: Exclude<AdminDealsProps["type"], "new"> }> = ({
  variant,
}) => {
  const [deals] = useState<Deal[]>(mockDeals);
  const [search, setSearch] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const merchants = useMemo(
    () => Array.from(new Set(deals.map((d) => d.merchant))).sort(),
    [deals]
  );

  const categories = useMemo(
    () => Array.from(new Set(deals.map((d) => d.category))).sort(),
    [deals]
  );

  const filteredDeals = useMemo(() => {
    let base = deals;
    if (variant === "hot") {
      base = base.filter((d) => d.isHotDeal);
    } else if (variant === "featured") {
      base = base.filter((d) => (d.discount ?? 0) >= 30);
    } else if (variant === "expired") {
      base = [];
    }

    return base.filter((d) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.merchant.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      const matchMerchant = !merchantFilter || d.merchant === merchantFilter;
      const matchCategory = !categoryFilter || d.category === categoryFilter;
      return matchSearch && matchMerchant && matchCategory;
    });
  }, [deals, search, merchantFilter, categoryFilter, variant]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{LABELS[variant]}</h2>
          <p className="mt-1 text-sm text-slate-600">
            Review and curate deals shown across the storefront.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-md border border-slate-200 bg-white p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded px-2 py-1 font-medium ${
                viewMode === "grid" ? "bg-orange-600 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`rounded px-2 py-1 font-medium ${
                viewMode === "table" ? "bg-orange-600 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Table
            </button>
          </div>
          <Link
            to="/admin/deals/new"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            + Add deal
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, merchant, or category…"
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
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredDeals.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-sm text-slate-500">
          No deals found for this filter. Try changing filters or{" "}
          <Link to="/admin/deals/new" className="font-medium text-orange-600 hover:text-orange-700">
            add a new deal
          </Link>
          .
        </div>
      )}

      {filteredDeals.length > 0 && viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-video w-full bg-slate-100">
                <img
                  src={deal.imageUrl || deal.image || "https://via.placeholder.com/400"}
                  alt={deal.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {deal.title}
                  </h3>
                  {deal.isHotDeal && (
                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                      HOT
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {deal.merchant} · {deal.category}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {deal.price > 0 ? `$${deal.price.toFixed(2)}` : "Varies"}
                  </span>
                  {deal.originalPrice > 0 && deal.price > 0 && (
                    <span className="text-xs text-slate-500 line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {deal.discount !== undefined && (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                      {deal.discount}% off
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500">
                    {new Date(deal.postedAt).toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded border border-slate-200 px-2 py-0.5 text-[11px] text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded border border-red-200 px-2 py-0.5 text-[11px] text-red-700 hover:bg-red-50"
                    >
                      Disable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredDeals.length > 0 && viewMode === "table" && (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="max-h-[600px] overflow-y-auto">
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
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Discount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Hot
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 align-top">
                      <div className="font-medium text-slate-900">{deal.title}</div>
                      <div className="mt-0.5 text-[11px] text-slate-500">
                        {new Date(deal.postedAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">{deal.merchant}</td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">{deal.category}</td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      {deal.price > 0 ? `$${deal.price.toFixed(2)}` : "Varies"}
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      {deal.discount !== undefined ? `${deal.discount}%` : "—"}
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

const AdminAddDeal: React.FC = () => {
  const [title, setTitle] = useState("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isHotDeal, setIsHotDeal] = useState(false);
  const [saved, setSaved] = useState(false);

  const discount = useMemo(() => {
    const p = Number(price);
    const o = Number(originalPrice);
    if (!o || !p || p >= o) return 0;
    return Math.round(((o - p) / o) * 100);
  }, [price, originalPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Deal = {
      id: `deal-${Date.now()}`,
      title: title.trim(),
      price: Number(price) || 0,
      originalPrice: Number(originalPrice) || 0,
      merchant: merchant.trim(),
      imageUrl: imageUrl.trim(),
      postedAt: new Date().toISOString(),
      category: category.trim(),
      url: url.trim() || "#",
      isHotDeal,
      discount: discount || undefined,
      description: description.trim() || undefined,
    };
    console.log("Save deal (demo only)", payload);
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Add Deal</h2>
          <p className="mt-1 text-sm text-slate-600">
            Create a new deal to surface on the storefront deal grids.
          </p>
        </div>
        <Link
          to="/admin/deals"
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to list
        </Link>
      </div>

      {saved && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Deal saved (demo only). Wire this up to the backend API to persist.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Basic details
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Merchant *</label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Category *</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="e.g. Tech Deals"
                required
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Pricing
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">Price</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Original price</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Discount</label>
              <input
                type="text"
                readOnly
                value={discount > 0 ? `${discount}%` : "—"}
                className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Links &amp; media
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Landing URL *</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="https://…"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="https://…"
              />
              {imageUrl && (
                <div className="mt-2 h-32 w-48 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isHotDeal}
                onChange={(e) => setIsHotDeal(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
              />
              Mark as hot deal
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            to="/admin/deals"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            Save deal
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminDeals: React.FC<AdminDealsProps> = ({ type }) => {
  if (type === "new") {
    return <AdminAddDeal />;
  }
  return <AdminDealsList variant={type} />;
};

export default AdminDeals;

