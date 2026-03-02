import React, { useState } from "react";
import { TAB_CONFIGS, type TabConfig } from "../../constants/tabs";
import { DealGrid } from ".";
import { mockDeals } from "../../types/deal";

/**
 * Tabs component props
 */
interface TabsProps {
  tabs?: TabConfig[];
  defaultTabId?: string;
  className?: string;
}

/**
 * Tabbed interface component
 */
const Tabs: React.FC<TabsProps> = ({
  tabs = TAB_CONFIGS,
  defaultTabId,
  className = "",
}) => {
  const initialTabId = defaultTabId || tabs[0]?.id || "";
  const [activeTab, setActiveTab] = useState<string>(initialTabId);

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
  };

  const getDealsForTab = (tabId: string) => {
    switch (tabId) {
      case "latest":
        // Latest deals – all mock deals
        return mockDeals;
      case "weekly":
        // Weekly ads – pretend categories like Food/Home/Kitchen
        return mockDeals.filter((deal) =>
          ["Food", "Home", "Kitchen"].includes(deal.category),
        );
      case "travel":
        // Travel deals – any category containing 'Travel'
        return mockDeals.filter((deal) =>
          deal.category.toLowerCase().includes("travel"),
        );
      case "coupons":
        // Quick coupons – high discount
        return mockDeals.filter(
          (deal) => deal.discount != null && deal.discount >= 40,
        );
      default:
        return mockDeals;
    }
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={`mx-auto mt-2 p-4 ${className}`}>
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-300 justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`py-2 px-4 -mb-px font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-600 hover:text-orange-500"
            }`}
            type="button"
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs.map((tab) =>
          tab.id === activeTab ? (
            <div
              key={tab.id}
              className="p-4 bg-gray-50 rounded-lg shadow"
              role="tabpanel"
            >
              <DealGrid deals={getDealsForTab(tab.id)} />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default Tabs;
