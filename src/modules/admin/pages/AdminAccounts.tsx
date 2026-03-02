import React, { useMemo, useState } from "react";

type AccountRole = "customer" | "partner" | "ops";
type AccountStatus = "active" | "suspended";

interface AccountRow {
  id: string;
  name: string;
  email: string;
  role: AccountRole;
  status: AccountStatus;
  createdAt: string;
}

const SAMPLE_ACCOUNTS: AccountRow[] = [
  {
    id: "u-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "customer",
    status: "active",
    createdAt: "2026-01-01T09:00:00",
  },
  {
    id: "u-2",
    name: "Best Deals Blog",
    email: "partner@bestdeals.com",
    role: "partner",
    status: "active",
    createdAt: "2026-01-05T10:30:00",
  },
  {
    id: "u-3",
    name: "Ops Admin",
    email: "ops@woahdeals.com",
    role: "ops",
    status: "suspended",
    createdAt: "2026-01-10T14:15:00",
  },
];

const AdminAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountRow[]>(SAMPLE_ACCOUNTS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"" | AccountRole>("");
  const [statusFilter, setStatusFilter] = useState<"" | AccountStatus>("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return accounts.filter((a) => {
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      const matchRole = !roleFilter || a.role === roleFilter;
      const matchStatus = !statusFilter || a.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [accounts, search, roleFilter, statusFilter]);

  const toggleStatus = (id: string) => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "suspended" : "active" } : a
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Accounts</h2>
          <p className="mt-1 text-sm text-slate-600">
            View and manage customer, partner, and operations user accounts.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
        >
          + Add account
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or ID…"
            className="min-w-[220px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as AccountRole | "")}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All roles</option>
            <option value="customer">Customer</option>
            <option value="partner">Partner</option>
            <option value="ops">Ops</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AccountStatus | "")}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Account
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Created
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 align-top">
                    <div className="font-medium text-slate-900">{a.name}</div>
                    <div className="mt-0.5 text-xs text-slate-600">{a.email}</div>
                    <div className="mt-0.5 text-[11px] text-slate-400">ID: {a.id}</div>
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-slate-700">
                    {a.role === "customer"
                      ? "Customer"
                      : a.role === "partner"
                      ? "Partner"
                      : "Ops"}
                  </td>
                  <td className="px-4 py-2 align-top">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        a.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {a.status === "active" ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-slate-700">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 align-top text-right">
                    <div className="inline-flex gap-2">
                      <button
                        type="button"
                        className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-100"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(a.id)}
                        className="rounded border border-orange-200 px-2 py-0.5 text-xs text-orange-700 hover:bg-orange-50"
                      >
                        {a.status === "active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No accounts match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAccounts;

