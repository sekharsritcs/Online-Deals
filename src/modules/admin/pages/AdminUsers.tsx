import React, { useMemo, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

type Mode = "list" | "create" | "edit";

const initialUsers: User[] = [
  { id: 1, name: "Admin User", email: "admin@woahdeals.com", role: "Super Admin", status: "active" },
  { id: 2, name: "Content Manager", email: "content@woahdeals.com", role: "Content Manager", status: "active" },
  { id: 3, name: "Support Agent", email: "support@woahdeals.com", role: "Support", status: "inactive" },
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [mode, setMode] = useState<Mode>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    role: "",
    status: "active",
  });

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.role.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      role: "",
      status: "active",
    });
    setSelectedId(null);
    setMode("list");
  };

  const startCreate = () => {
    resetForm();
    setMode("create");
  };

  const startEdit = (user: User) => {
    setSelectedId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setMode("edit");
  };

  const handleChange = (field: keyof Omit<User, "id">, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "status" ? (value as User["status"]) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.role) return;

    if (mode === "create") {
      const nextId = Math.max(...users.map((u) => u.id)) + 1;
      const next: User = { id: nextId, ...form };
      setUsers((prev) => [...prev, next]);
    } else if (mode === "edit" && selectedId != null) {
      setUsers((prev) => prev.map((u) => (u.id === selectedId ? { ...u, ...form } : u)));
    }

    resetForm();
  };

  const toggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Users</h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage admin and internal users with access to Woah Admin.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, role…"
            className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:w-64"
          />
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
          >
            + New User
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2.1fr,1.1fr]">
        {/* Users table */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            User List
          </div>
          <div className="max-h-[520px] overflow-y-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-sm text-slate-500"
                    >
                      No users match this search.
                    </td>
                  </tr>
                )}
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 whitespace-nowrap text-slate-900">{user.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-600">{user.email}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-slate-700">{user.role}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => toggleStatus(user.id)}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => startEdit(user)}
                        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {mode === "create" && "Add User"}
            {mode === "edit" && "Edit User"}
            {mode === "list" && "User Details"}
          </div>

          {mode === "list" ? (
            <div className="px-4 py-6 text-sm text-slate-500">
              Select a user from the list or click{" "}
              <button
                type="button"
                className="font-medium text-slate-900 underline underline-offset-2"
                onClick={startCreate}
              >
                New User
              </button>{" "}
              to create an account.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4 text-sm">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="block w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="block w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="role" className="block text-xs font-medium text-slate-700">
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="block w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="e.g. Content Manager"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs font-medium text-slate-700">Status</span>
                <div className="flex gap-4 text-xs">
                  <label className="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={form.status === "active"}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="h-3.5 w-3.5 border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                    Active
                  </label>
                  <label className="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={form.status === "inactive"}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="h-3.5 w-3.5 border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                    Inactive
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-orange-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-orange-700"
                >
                  {mode === "create" ? "Create user" : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;

