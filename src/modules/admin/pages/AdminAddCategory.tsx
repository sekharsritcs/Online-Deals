import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SAMPLE_MAIN_CATEGORIES } from "../../../constants/adminSamples";
import type { MainCategory } from "../../../types/product";

type AdminCategoryPayload = MainCategory & {
  categoryTemplate: string;
};

const AdminAddCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const existing = isEdit ? SAMPLE_MAIN_CATEGORIES.find((c) => c.id === id) : undefined;

  const [name, setName] = useState(existing?.name ?? "");
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [isActive, setIsActive] = useState<boolean>(existing?.isActive ?? true);
  const [saved, setSaved] = useState(false);
  const [categoryTemplate, setCategoryTemplate] = useState<string>("Products in Grid or Lines");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = slug.trim() || name.toLowerCase().trim().replace(/\s+/g, "-");

    const payload: AdminCategoryPayload = {
      id: id || `cat-${Date.now()}`,
      name: name.trim(),
      slug: finalSlug,
      isActive,
      categoryTemplate,
    };

    console.log(isEdit ? "Update main category" : "Create main category", payload);
    setSaved(true);

    if (!isEdit) {
      setTimeout(() => navigate("/admin/categories"), 1200);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {isEdit ? "Edit Category" : "Add Category"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Define top-level categories used to organize products across the storefront.
          </p>
        </div>
        <Link
          to="/admin/categories"
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to categories
        </Link>
      </div>

      {saved && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {isEdit ? "Category updated (demo only)." : "Category created (demo only). Redirecting…"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Basic information
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="e.g. Electronics"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="electronics"
              />
              <p className="mt-1 text-xs text-slate-500">
                Used in URLs, for example `/electronics`. Leave empty to auto-generate from the name.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Category template</label>
              <select
                value={categoryTemplate}
                onChange={(e) => setCategoryTemplate(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="Products in Grid or Lines">Products in Grid or Lines</option>
                <option value="My Own Template">My Own Template</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">
                Controls how products inside this category are rendered (grid or list) on the storefront.
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
              />
              Active
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            to="/admin/categories"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            {isEdit ? "Update category" : "Add category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddCategory;

