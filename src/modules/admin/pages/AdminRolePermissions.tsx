import React, { useState } from "react";

type RoleKey = "superAdmin" | "content" | "support";
type ModuleKey =
  | "dashboard"
  | "users"
  | "roles"
  | "categories"
  | "products"
  | "deals"
  | "reports"
  | "settings";

const ROLE_LABELS: Record<RoleKey, string> = {
  superAdmin: "Super Admin",
  content: "Content Manager",
  support: "Support",
};

const MODULE_LABELS: Record<ModuleKey, string> = {
  dashboard: "Dashboard",
  users: "Users",
  roles: "Roles & Permissions",
  categories: "Categories & Coupons",
  products: "Products",
  deals: "Deals",
  reports: "Reports",
  settings: "Settings",
};

type PermissionMatrix = Record<RoleKey, Record<ModuleKey, boolean>>;

const initialMatrix: PermissionMatrix = {
  superAdmin: {
    dashboard: true,
    users: true,
    roles: true,
    categories: true,
    products: true,
    deals: true,
    reports: true,
    settings: true,
  },
  content: {
    dashboard: true,
    users: false,
    roles: false,
    categories: true,
    products: true,
    deals: true,
    reports: false,
    settings: false,
  },
  support: {
    dashboard: true,
    users: false,
    roles: false,
    categories: false,
    products: true,
    deals: true,
    reports: false,
    settings: false,
  },
};

const AdminRolePermissions: React.FC = () => {
  const [matrix, setMatrix] = useState<PermissionMatrix>(initialMatrix);

  const togglePermission = (role: RoleKey, module: ModuleKey) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: !prev[role][module],
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Role Permissions</h2>
        <p className="mt-1 text-sm text-slate-600">
          Configure which admin modules each role can access. This is a visual sample; wire it to
          your backend permission model later.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-slate-50 px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Module
              </th>
              {Object.entries(ROLE_LABELS).map(([key, label]) => (
                <th
                  key={key}
                  className="px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(MODULE_LABELS).map(([moduleKey, moduleLabel], rowIndex, arr) => {
              const isLast = rowIndex === arr.length - 1;
              return (
                <tr key={moduleKey} className="border-t border-slate-100">
                  <td
                    className={`sticky left-0 z-10 bg-white px-4 py-2 text-xs font-medium text-slate-700 ${
                      !isLast ? "border-b border-slate-100" : ""
                    }`}
                  >
                    {moduleLabel}
                  </td>
                  {Object.keys(ROLE_LABELS).map((roleKey) => {
                    const checked = matrix[roleKey as RoleKey][moduleKey as ModuleKey];
                    return (
                      <td
                        key={roleKey}
                        className={`px-4 py-2 text-center ${
                          !isLast ? "border-b border-slate-100" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            togglePermission(roleKey as RoleKey, moduleKey as ModuleKey)
                          }
                          className="h-3.5 w-3.5 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Note: This is client-side only for now. Replace the state with API calls to persist
        permissions in your database.
      </p>
    </div>
  );
};

export default AdminRolePermissions;

