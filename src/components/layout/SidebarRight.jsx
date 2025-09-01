"use client";

import { clsx } from "clsx";

const SidebarRight = ({
  mode = "empty", // "empty", "detail", "edit", "add", "order"
  children,
  className = "",
}) => {
  return <div className={clsx("w-80 bg-white shadow-lg border-l border-gray-200 flex flex-col", className)}>{children}</div>;
};

// SidebarRight Empty State Component
export const SidebarRightEmpty = ({ onAddMenu }) => (
  <SidebarRight mode="empty">
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-gray-500 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">Add Menu</p>
        <button onClick={onAddMenu} className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  </SidebarRight>
);

// SidebarRight for Orders (Cashier)
export const SidebarRightOrder = ({ children }) => (
  <SidebarRight mode="order">
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">Current Order</h3>
    </div>
    <div className="flex-1 overflow-y-auto">{children}</div>
  </SidebarRight>
);

export default SidebarRight;
