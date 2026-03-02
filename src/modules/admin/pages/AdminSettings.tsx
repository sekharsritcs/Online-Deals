import React, { useState } from "react";

const AdminSettings: React.FC = () => {
  const [apiBaseUrl, setApiBaseUrl] = useState("https://api.deals.vayavi.com");
  const [enableTracking, setEnableTracking] = useState(true);
  const [enableBetaFeatures, setEnableBetaFeatures] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-600">
          Global configuration for the Woah Deals admin experience. These are demo‑only values.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              API configuration
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">API base URL</label>
                <input
                  type="text"
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Base URL used by the frontend when talking to the Woah Deals backend.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Feature flags
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <label className="flex items-center justify-between gap-4">
                <span>Enable click &amp; conversion tracking</span>
                <input
                  type="checkbox"
                  checked={enableTracking}
                  onChange={(e) => setEnableTracking(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Enable beta admin features</span>
                <input
                  type="checkbox"
                  checked={enableBetaFeatures}
                  onChange={(e) => setEnableBetaFeatures(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Appearance
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Admin theme</label>
                <div className="mt-2 inline-flex rounded-md border border-slate-200 bg-white p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`rounded px-3 py-1 font-medium ${
                      theme === "light"
                        ? "bg-orange-600 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`rounded px-3 py-1 font-medium ${
                      theme === "dark"
                        ? "bg-orange-600 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

