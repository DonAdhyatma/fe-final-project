"use client";

import { clsx } from "clsx";

const CategoryFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All Menu" },
    { key: "Food", label: "Foods" },
    { key: "Beverages", label: "Beverages" },
    { key: "Desserts", label: "Desserts" },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={clsx("px-4 py-2 text-sm font-medium rounded-md transition-all duration-200", activeFilter === filter.key ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50")}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
