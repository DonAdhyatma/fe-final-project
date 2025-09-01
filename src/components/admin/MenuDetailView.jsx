"use client";

import Button from "../ui/Button";

const MenuDetailView = ({ menuItem, onEdit, onDelete, onClose }) => {
  if (!menuItem) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Menu Detail</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Image */}
        {menuItem.image && (
          <div className="mb-4">
            <img src={menuItem.image} alt={menuItem.name} className="w-full h-48 object-cover rounded-lg border border-gray-300" />
          </div>
        )}

        {/* Menu Details */}
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{menuItem.name}</h4>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">{menuItem.category}</span>
          </div>

          <div>
            <p className="text-2xl font-bold text-green-600">{formatPrice(menuItem.price)}</p>
          </div>

          {menuItem.description && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Description</h5>
              <p className="text-gray-600 text-sm leading-relaxed">{menuItem.description}</p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status:</span>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${menuItem.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{menuItem.isAvailable ? "Available" : "Unavailable"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mt-6">
          <Button variant="primary" size="sm" onClick={onEdit} className="flex-1">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>

          <Button variant="danger" size="sm" onClick={onDelete} className="flex-1">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailView;
