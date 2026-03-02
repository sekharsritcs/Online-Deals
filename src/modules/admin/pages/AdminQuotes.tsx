import React, { useMemo, useState } from "react";

type QuoteStatus = "draft" | "sent" | "accepted" | "rejected";

interface QuoteRow {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: QuoteStatus;
  createdAt: string;
}

const SAMPLE_QUOTES: QuoteRow[] = [
  {
    id: "Q-1001",
    customer: "Acme Corp",
    email: "buyer@acme.com",
    total: 1299,
    status: "sent",
    createdAt: "2026-01-10T09:00:00",
  },
  {
    id: "Q-1002",
    customer: "John Smith",
    email: "john@example.com",
    total: 349,
    status: "accepted",
    createdAt: "2026-01-11T11:15:00",
  },
  {
    id: "Q-1003",
    customer: "Globex Inc",
    email: "purchasing@globex.com",
    total: 2200,
    status: "draft",
    createdAt: "2026-01-12T14:30:00",
  },
];

const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteRow[]>(SAMPLE_QUOTES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | QuoteStatus>("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return quotes.filter((quote) => {
      const matchSearch =
        !q ||
        quote.id.toLowerCase().includes(q) ||
        quote.customer.toLowerCase().includes(q) ||
        quote.email.toLowerCase().includes(q);
      const matchStatus = !statusFilter || quote.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [quotes, search, statusFilter]);

  const updateStatus = (id: string, status: QuoteStatus) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Quote management</h2>
          <p className="mt-1 text-sm text-slate-600">
            Track deal quotes, proposal statuses, and follow‑ups.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
        >
          + New quote
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by quote ID, customer, or email…"
            className="min-w-[220px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as QuoteStatus | "")}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Quote
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Customer
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">
                  Total
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
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 align-top text-sm font-medium text-slate-900">
                    {q.id}
                  </td>
                  <td className="px-4 py-2 align-top">
                    <div className="text-sm text-slate-900">{q.customer}</div>
                    <div className="mt-0.5 text-xs text-slate-600">{q.email}</div>
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-slate-700">
                    ${q.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 align-top">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        q.status === "accepted"
                          ? "bg-emerald-50 text-emerald-700"
                          : q.status === "rejected"
                          ? "bg-red-50 text-red-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-slate-700">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 align-top text-right">
                    <div className="inline-flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateStatus(q.id, "accepted")}
                        className="rounded border border-emerald-200 px-2 py-0.5 text-xs text-emerald-700 hover:bg-emerald-50"
                      >
                        Mark accepted
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(q.id, "rejected")}
                        className="rounded border border-red-200 px-2 py-0.5 text-xs text-red-700 hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No quotes match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuotes;

