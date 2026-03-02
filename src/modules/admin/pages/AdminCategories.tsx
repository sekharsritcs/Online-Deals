import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { MainCategory } from "../../../types/product";
import { SAMPLE_MAIN_CATEGORIES as INITIAL_MAIN } from "../../../constants/adminSamples";

const AdminCategories: React.FC = () => {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>(INITIAL_MAIN);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => {
    return mainCategories.filter((c) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q);
    });
  }, [mainCategories, search]);

  const deleteMain = (id: string) => {
    if (!window.confirm("Delete this category? Sub-categories linked to it will be orphaned.")) return;
    setMainCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Categories</h2>
          <p className="mt-1 text-sm text-slate-600">
            Top-level product categories, similar to departments on Flipkart/Amazon.
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
            to="/admin/categories/new"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            + Add category
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or slug…"
            className="min-w-[200px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-sm text-slate-500">
          No categories match your search. Try a different keyword or{" "}
          <Link to="/admin/categories/new" className="font-medium text-orange-600 hover:text-orange-700">
            add a new category
          </Link>
          .
        </div>
      )}

      {filtered.length > 0 && viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{c.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">/{c.slug}</p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      c.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/admin/categories/edit/${c.id}`}
                  className="flex-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-center text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => deleteMain(c.id)}
                  className="rounded-md border border-red-200 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && viewMode === "table" && (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Slug
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
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 text-sm font-medium text-slate-900">{c.name}</td>
                    <td className="px-4 py-2 text-sm text-slate-700">/{c.slug}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          c.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="inline-flex gap-2">
                        <Link
                          to={`/admin/categories/edit/${c.id}`}
                          className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteMain(c.id)}
                          className="rounded border border-red-200 px-2 py-0.5 text-xs text-red-700 hover:bg-red-50"
                        >
                          Delete
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

export default AdminCategories;
