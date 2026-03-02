import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { MainCategory, SubCategory } from "../../../types/product";
import {
  SAMPLE_MAIN_CATEGORIES,
  SAMPLE_SUB_CATEGORIES,
} from "../../../constants/adminSamples";

const AdminSubCategories: React.FC = () => {
  const [mainCategories] = useState<MainCategory[]>(SAMPLE_MAIN_CATEGORIES);
  const [subCategories, setSubCategories] = useState<SubCategory[]>(SAMPLE_SUB_CATEGORIES);
  const [parentFilter, setParentFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const filtered = subCategories.filter((s) => {
    const matchParent = !parentFilter || s.parentId === parentFilter;
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.parentName ?? "").toLowerCase().includes(search.toLowerCase());
    return matchParent && matchSearch;
  });

  const remove = (id: string) => {
    if (window.confirm("Delete this sub-category?")) {
      setSubCategories((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Sub-categories</h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage sub-categories under each main category. Used in product catalog and filters.
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
            to="/admin/categories/sub/new"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            + Add sub-category
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sub-category or parent…"
            className="min-w-[180px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <select
            value={parentFilter}
            onChange={(e) => setParentFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All parents</option>
            {mainCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-slate-500">
            No sub-categories match. Try changing filters or add one.
          </div>
        )}

        {filtered.length > 0 && viewMode === "table" && (
          <div className="max-h-[520px] overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Parent</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Slug</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900">{s.name}</td>
                    <td className="px-4 py-2 text-slate-600">{s.parentName ?? s.parentId}</td>
                    <td className="px-4 py-2 text-slate-500">/{s.slug}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          s.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        to={`/admin/categories/sub/edit/${s.id}`}
                        className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(s.id)}
                        className="ml-1 rounded border border-red-200 px-2 py-0.5 text-xs text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > 0 && viewMode === "grid" && (
          <div className="grid gap-4 border-t border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((s) => (
              <div
                key={s.id}
                className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {s.parentName ?? mainCategories.find((c) => c.id === s.parentId)?.name ?? s.parentId}
                  </div>
                  <h3 className="mt-0.5 text-sm font-semibold text-slate-900">{s.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">/{s.slug}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      s.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/categories/sub/edit/${s.id}`}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(s.id)}
                      className="rounded-md border border-red-200 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubCategories;
