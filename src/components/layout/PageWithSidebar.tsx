import React from "react";
import HotDealsSidebar from "./HotDealsSidebar";

interface PageWithSidebarProps {
  children: React.ReactNode;
  excludeDealId?: string;
}

/**
 * Layout wrapper: main content + Hot Deals sidebar (like detail page)
 */
const PageWithSidebar: React.FC<PageWithSidebarProps> = ({
  children,
  excludeDealId,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <div className="flex-1 min-w-0">{children}</div>
      <HotDealsSidebar excludeDealId={excludeDealId} />
    </div>
  );
};

export default PageWithSidebar;
