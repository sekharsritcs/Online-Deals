import React, { useState } from "react";

interface Role {
  id: number;
  name: string;
  description: string;
  users: number;
}

const initialRoles: Role[] = [
  { id: 1, name: "Super Admin", description: "Full access to all modules and settings.", users: 1 },
  {
    id: 2,
    name: "Content Manager",
    description: "Can manage deals, categories, coupons and homepage content.",
    users: 2,
  },
  {
    id: 3,
    name: "Support",
    description: "Read-only access to products and accounts.",
    users: 1,
  },
];

const AdminRoles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) return;
    const nextId = Math.max(...roles.map((r) => r.id)) + 1;
    setRoles((prev) => [
      ...prev,
      { id: nextId, name, description: description || "Custom role", users: 0 },
    ]);
    setName("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Roles</h2>
          <p className="mt-1 text-sm text-slate-600">
            Define reusable permission groups that can be assigned to users.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1.1fr]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Existing Roles
          </div>
          <ul className="divide-y divide-slate-100 text-sm">
            {roles.map((role) => (
              <li key={role.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-medium text-slate-900">{role.name}</div>
                    <p className="mt-0.5 text-xs text-slate-600">{role.description}</p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div className="font-semibold text-slate-800">{role.users}</div>
                    <div>Users</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Add Role
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4 text-sm">
            <div className="space-y-1.5">
              <label htmlFor="role-name" className="block text-xs font-medium text-slate-700">
                Role name
              </label>
              <input
                id="role-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="e.g. Marketing"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="role-description"
                className="block text-xs font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="role-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="block w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="What can this role do?"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-orange-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-orange-700"
              >
                Create role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRoles;

