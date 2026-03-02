import React, { useState } from "react";

interface AdminContentProps {
  type: "homepage" | "pages";
}

const LABELS: Record<AdminContentProps["type"], string> = {
  homepage: "Homepage Sections",
  pages: "Static Pages",
};

const AdminContentHomepage: React.FC = () => {
  const [heroTitle, setHeroTitle] = useState("Today’s Best Deals, Curated for You");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Browse hot deals, quick coupons, and trending offers across top retailers."
  );
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState("Browse all deals");
  const [primaryCtaUrl, setPrimaryCtaUrl] = useState("/deals");
  const [featuredSections, setFeaturedSections] = useState({
    quickCoupons: true,
    techDeals: true,
    travelDeals: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Homepage layout</h2>
        <p className="mt-1 text-sm text-slate-600">
          Manage the main hero and which curated sections appear on the storefront homepage.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Hero section
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Subtitle</label>
                <textarea
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Primary CTA label</label>
                  <input
                    type="text"
                    value={primaryCtaLabel}
                    onChange={(e) => setPrimaryCtaLabel(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Primary CTA link</label>
                  <input
                    type="text"
                    value={primaryCtaUrl}
                    onChange={(e) => setPrimaryCtaUrl(e.target.value)}
                    className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Featured sections
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Toggle which curated blocks are visible on the homepage. This maps to your Quick
              Coupons, Tech Deals, and Travel Deals pages.
            </p>
            <div className="mt-4 space-y-3">
              <label className="flex items-center justify-between gap-4 text-sm text-slate-700">
                <span>Quick coupons strip</span>
                <input
                  type="checkbox"
                  checked={featuredSections.quickCoupons}
                  onChange={(e) =>
                    setFeaturedSections((s) => ({ ...s, quickCoupons: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
              <label className="flex items-center justify-between gap-4 text-sm text-slate-700">
                <span>Tech deals carousel</span>
                <input
                  type="checkbox"
                  checked={featuredSections.techDeals}
                  onChange={(e) =>
                    setFeaturedSections((s) => ({ ...s, techDeals: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
              <label className="flex items-center justify-between gap-4 text-sm text-slate-700">
                <span>Travel deals strip</span>
                <input
                  type="checkbox"
                  checked={featuredSections.travelDeals}
                  onChange={(e) =>
                    setFeaturedSections((s) => ({ ...s, travelDeals: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Preview (read-only)
          </h3>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-white">
              <h4 className="text-lg font-semibold">{heroTitle}</h4>
              <p className="mt-1 text-sm opacity-90">{heroSubtitle}</p>
              <button
                type="button"
                className="mt-3 inline-flex items-center rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
              >
                {primaryCtaLabel}
              </button>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                Quick coupons strip:{" "}
                <span className="font-semibold">
                  {featuredSections.quickCoupons ? "Visible" : "Hidden"}
                </span>
              </li>
              <li>
                Tech deals carousel:{" "}
                <span className="font-semibold">
                  {featuredSections.techDeals ? "Visible" : "Hidden"}
                </span>
              </li>
              <li>
                Travel deals strip:{" "}
                <span className="font-semibold">
                  {featuredSections.travelDeals ? "Visible" : "Hidden"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminContentPages: React.FC = () => {
  const [pages, setPages] = useState([
    { id: "about", title: "About", slug: "/about", enabled: true },
    { id: "contact", title: "Contact", slug: "/contact", enabled: true },
    { id: "faq", title: "FAQ", slug: "/faq", enabled: true },
  ]);

  const toggleEnabled = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Static pages</h2>
        <p className="mt-1 text-sm text-slate-600">
          Toggle visibility of static content pages and manage their basic metadata.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                Page
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                URL
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pages.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-2 text-sm font-medium text-slate-900">{p.title}</td>
                <td className="px-4 py-2 text-sm text-slate-700">{p.slug}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.enabled ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {p.enabled ? "Visible" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      type="button"
                      className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
                    >
                      Edit content
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleEnabled(p.id)}
                      className="rounded border border-orange-200 px-2 py-0.5 text-xs text-orange-700 hover:bg-orange-50"
                    >
                      {p.enabled ? "Hide" : "Show"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminContent: React.FC<AdminContentProps> = ({ type }) => {
  if (type === "homepage") {
    return <AdminContentHomepage />;
  }
  return <AdminContentPages />;
};

export default AdminContent;

