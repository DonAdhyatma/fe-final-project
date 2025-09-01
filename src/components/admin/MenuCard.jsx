"use client";

import Button from "../ui/Button";

const MenuCard = ({ menuItem, onDetailClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        {menuItem.image ? (
          <img src={menuItem.image} alt={menuItem.name} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{menuItem.name}</h3>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full ml-2 flex-shrink-0">{menuItem.category}</span>
        </div>

        <p className="text-lg font-bold text-green-600 mb-2">{formatPrice(menuItem.price)}</p>

        {menuItem.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{menuItem.description}</p>}

        {/* Status & Detail Button */}
        <div className="flex items-center justify-between">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${menuItem.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{menuItem.isAvailable ? "Available" : "Unavailable"}</span>

          <Button variant="outline" size="sm" onClick={() => onDetailClick(menuItem)}>
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
