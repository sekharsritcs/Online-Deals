import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { AdminProduct } from "../../../types/product";
import {
  SAMPLE_MAIN_CATEGORIES,
  SAMPLE_SUB_CATEGORIES,
  SAMPLE_PRODUCTS,
} from "../../../constants/adminSamples";

const emptySpec = { key: "", value: "" };

type AdminProductPayload = Omit<
  AdminProduct,
  "categoryName" | "subCategoryName" | "discountPercent" | "imageUrls"
> & {
  categoryName: string;
  subCategoryName: string;
  discountPercent: number;
  imageUrls: string[];
  productTemplate: string;
  visibleIndividually: boolean;
};

const AdminAddProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState<"active" | "draft">("active");
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([emptySpec]);
  const [imageUrl, setImageUrl] = useState(""); // single URL for demo; extend to multiple later
  const [saved, setSaved] = useState(false);
  const [productTemplate, setProductTemplate] = useState<string>("Simple product");
  const [visibleIndividually, setVisibleIndividually] = useState<boolean>(true);

  // Load product when editing
  React.useEffect(() => {
    if (!id) return;
    const product = SAMPLE_PRODUCTS.find((p) => p.id === id);
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setSku(product.sku);
      setCategoryId(product.categoryId);
      setSubCategoryId(product.subCategoryId);
      setShortDescription(product.shortDescription);
      setLongDescription(product.longDescription);
      setMrp(String(product.mrp));
      setSellingPrice(String(product.sellingPrice));
      setStock(String(product.stock));
      setStatus(product.status);
      setImageUrl(product.imageUrls[0] || "");
      setSpecs(
        Object.entries(product.specifications).length > 0
          ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
          : [emptySpec]
      );
    }
  }, [id]);

  const subCategoriesForCategory = useMemo(() => {
    if (!categoryId) return [];
    return SAMPLE_SUB_CATEGORIES.filter((s) => s.parentId === categoryId);
  }, [categoryId]);

  const discountPercent = useMemo(() => {
    const m = Number(mrp);
    const s = Number(sellingPrice);
    if (m <= 0 || s >= m) return 0;
    return Math.round(((m - s) / m) * 100);
  }, [mrp, sellingPrice]);

  const addSpec = () => setSpecs((prev) => [...prev, { key: "", value: "" }]);
  const updateSpec = (index: number, field: "key" | "value", value: string) => {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };
  const removeSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim()) specObj[s.key.trim()] = s.value.trim();
    });
    const payload: AdminProductPayload = {
      id: id || `prod-${Date.now()}`,
      name,
      brand,
      sku,
      categoryId,
      categoryName: SAMPLE_MAIN_CATEGORIES.find((c) => c.id === categoryId)?.name ?? "",
      subCategoryId,
      subCategoryName: SAMPLE_SUB_CATEGORIES.find((s) => s.id === subCategoryId)?.name ?? "",
      shortDescription,
      longDescription,
      mrp: Number(mrp),
      sellingPrice: Number(sellingPrice),
      discountPercent,
      imageUrls: imageUrl ? [imageUrl] : [],
      specifications: specObj,
      stock: Number(stock) || 0,
      status,
      productTemplate,
      visibleIndividually,
    };
    console.log("Save product", payload);
    setSaved(true);
    if (!isEdit) setTimeout(() => navigate("/admin/products"), 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {isEdit ? "Edit Product" : "Add Product"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Fill in product details like on Flipkart/Amazon. Category and sub-category define where the product appears.
          </p>
        </div>
        <Link
          to="/admin/products"
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to list
        </Link>
      </div>

      {saved && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {isEdit ? "Product updated successfully." : "Product added. Redirecting to list…"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic info */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Basic information
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Product name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="e.g. Samsung Galaxy S24 128GB"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Brand *</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="e.g. Samsung"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="e.g. SAM-S24-128"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Product template</label>
              <select
                value={productTemplate}
                onChange={(e) => setProductTemplate(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="Simple product">Simple product</option>
                <option value="Grouped product">Grouped product (with variants)</option>
              </select>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                id="visible-individually"
                type="checkbox"
                checked={visibleIndividually}
                onChange={(e) => setVisibleIndividually(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
              />
              <label
                htmlFor="visible-individually"
                className="text-sm font-medium text-slate-700"
              >
                Visible individually (show as standalone product)
              </label>
            </div>
          </div>
        </div>

        {/* Category & Sub-category */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Category &amp; sub-category
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Choose where this product appears in the catalog (like Flipkart/Amazon).
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Main category *</label>
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSubCategoryId("");
                }}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              >
                <option value="">Select category</option>
                {SAMPLE_MAIN_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Sub-category *</label>
              <select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
                disabled={!categoryId}
              >
                <option value="">Select sub-category</option>
                {subCategoriesForCategory.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Pricing</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">MRP (₹) *</label>
              <input
                type="number"
                min={0}
                step={1}
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Selling price (₹) *</label>
              <input
                type="number"
                min={0}
                step={1}
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Discount %</label>
              <input
                type="text"
                readOnly
                value={discountPercent > 0 ? `${discountPercent}%` : "—"}
                className="mt-1 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Description
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Short description</label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="One line summary for listing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Long description</label>
              <textarea
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Full product description for detail page"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Product image
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Main image URL (in production, use file upload).
          </p>
          <div className="mt-4">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="https://..."
            />
            {imageUrl && (
              <div className="mt-2 h-32 w-32 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Specifications
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Key-value pairs shown on product detail page (e.g. Color, RAM, Storage).
          </p>
          <div className="mt-4 space-y-2">
            {specs.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={s.key}
                  onChange={(e) => updateSpec(i, "key", e.target.value)}
                  placeholder="Key (e.g. Color)"
                  className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <input
                  type="text"
                  value={s.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  placeholder="Value"
                  className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  className="rounded-md border border-red-200 px-2 py-1.5 text-sm text-red-700 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpec}
              className="rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              + Add specification
            </button>
          </div>
        </div>

        {/* Inventory & status */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Inventory &amp; status
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Stock quantity *</label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "draft")}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="active">Active (visible on storefront)</option>
                <option value="draft">Draft (hidden)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            to="/admin/products"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            {isEdit ? "Update product" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
