import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-slate-900">Welcome to Woah Admin</h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Use this admin area to manage the content and configuration that appears on the
          Woah Deals frontend. Start by reviewing categories, then extend this dashboard as
          more backend APIs become available (deals, banners, etc.).
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-medium text-slate-900">Categories</h3>
          <p className="mt-1 text-xs text-slate-600">
            Create, edit, and deactivate categories used across the storefront.
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-medium text-slate-900">Deals (future)</h3>
          <p className="mt-1 text-xs text-slate-600">
            Once deal APIs are ready, this will let you manage promotions and campaigns.
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-medium text-slate-900">Content (future)</h3>
          <p className="mt-1 text-xs text-slate-600">
            Potential area for managing homepage banners, FAQs, and static content.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

