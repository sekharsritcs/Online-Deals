import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { AdminProduct } from "../../../types/product";
import {
  SAMPLE_PRODUCTS,
  SAMPLE_MAIN_CATEGORIES,
  SAMPLE_SUB_CATEGORIES,
} from "../../../constants/adminSamples";

interface AdminProductsProps {
  type: "all" | "new" | "bulk";
}

const LABELS: Record<AdminProductsProps["type"], string> = {
  all: "All Products",
  new: "Add Product",
  bulk: "Bulk Upload",
};

const AdminProductsAll: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>(SAMPLE_PRODUCTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const subCategoriesByParent = useMemo(() => {
    const map: Record<string, typeof SAMPLE_SUB_CATEGORIES> = {};
    SAMPLE_SUB_CATEGORIES.forEach((s) => {
      if (!map[s.parentId]) map[s.parentId] = [];
      map[s.parentId].push(s);
    });
    return map;
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = !categoryFilter || p.categoryId === categoryFilter;
      const matchSub = !subCategoryFilter || p.subCategoryId === subCategoryFilter;
      const matchStatus = !statusFilter || p.status === statusFilter;
      return matchSearch && matchCat && matchSub && matchStatus;
    });
  }, [products, search, categoryFilter, subCategoryFilter, statusFilter]);

  const removeProduct = (id: string) => {
    if (window.confirm("Remove this product from the list?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">All Products</h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage your catalog. Search, filter, and edit products.
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
            to="/admin/products/new"
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Filters – Amazon/Flipkart style toolbar */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, SKU…"
            className="min-w-[200px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setSubCategoryFilter("");
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All categories</option>
            {SAMPLE_MAIN_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All sub-categories</option>
            {(categoryFilter ? subCategoriesByParent[categoryFilter] ?? [] : SAMPLE_SUB_CATEGORIES).map(
              (s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              )
            )}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-sm text-slate-500">
          No products match your filters. Try changing search or filters, or{" "}
          <Link to="/admin/products/new" className="font-medium text-orange-600 hover:text-orange-700">
            add a product
          </Link>
          .
        </div>
      )}

      {filteredProducts.length > 0 && viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-square w-full bg-slate-100">
                <img
                  src={product.imageUrls[0] || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-slate-500">
                  {product.categoryName} &gt; {product.subCategoryName}
                </p>
                <h3 className="mt-0.5 line-clamp-2 text-sm font-medium text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  {product.brand} · SKU: {product.sku}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    ₹{product.sellingPrice.toLocaleString("en-IN")}
                  </span>
                  {product.discountPercent > 0 && (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                      {product.discountPercent}% off
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      product.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {product.status === "active" ? "Active" : "Draft"}
                  </span>
                  <span className="text-xs text-slate-500">Stock: {product.stock}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="flex-1 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-center text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="rounded-md border border-red-200 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length > 0 && viewMode === "table" && (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="max-h-[600px] overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                    Stock
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 align-top">
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="mt-0.5 text-xs text-slate-600">
                        {product.brand} · SKU: {product.sku}
                      </div>
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      <div>{product.categoryName}</div>
                      <div className="text-xs text-slate-500">{product.subCategoryName}</div>
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">
                      ₹{product.sellingPrice.toLocaleString("en-IN")}
                      {product.discountPercent > 0 && (
                        <span className="ml-1 rounded bg-emerald-50 px-1 py-0.5 text-[11px] font-medium text-emerald-700">
                          {product.discountPercent}% off
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 align-top text-sm text-slate-700">{product.stock}</td>
                    <td className="px-4 py-2 align-top">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {product.status === "active" ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-2 align-top text-right">
                      <div className="inline-flex gap-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="rounded border border-red-200 px-2 py-0.5 text-xs text-red-700 hover:bg-red-50"
                        >
                          Remove
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

const AdminProductsBulk: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    console.log("Bulk upload", file.name);
    setUploaded(true);
    setFile(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Bulk Upload</h2>
        <p className="mt-1 text-sm text-slate-600">
          Upload a CSV/Excel file to add or update multiple products at once.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mx-auto block text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-orange-700 hover:file:bg-orange-100"
            />
            <p className="mt-2 text-xs text-slate-500">
              CSV or Excel. Columns: name, brand, sku, categoryId, subCategoryId, mrp, sellingPrice, stock, etc.
            </p>
          </div>
          {uploaded && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              File uploaded successfully. Process in background (demo).
            </div>
          )}
          <button
            type="submit"
            disabled={!file}
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 disabled:opacity-50"
          >
            Upload and process
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminProducts: React.FC<AdminProductsProps> = ({ type }) => {
  if (type === "bulk") return <AdminProductsBulk />;
  if (type === "all") return <AdminProductsAll />;
  return null; // "new" is handled by AdminAddProduct route
};

export default AdminProducts;
