"use client";

import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import Button from "../../../components/ui/Button";
import MenuDetailModal from "../../../components/pos/MenuDetailModal";

export default function CashierPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample menu data
  const menuItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Menu Item ${i + 1}`,
    description: 'Vegetables, egg, tempe, tofu, ketupat, peanut sauce, and kerupuk.',
    price: 'Rp 25.000',
    category: 'Food'
  }));

  const handleOpenModal = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMenuItem(null);
  };

  // Redirect if not authenticated or not cashier/admin
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "cashier" && user?.role !== "admin") {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authorized
  if (!isAuthenticated || (user?.role !== "cashier" && user?.role !== "admin")) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">POS - Point of Sales</h1>
          <p className="text-gray-600 mt-2">Selamat datang, {user?.username}</p>
        </div>

        {/* Main POS Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Menu Section (Left Side) */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>

              {/* Category Filter Buttons */}
              <div className="flex space-x-2">
                <Button size="sm" variant="primary" className="cursor-pointer">
                  All Menu
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  Foods
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  Beverages
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  Desserts
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari menu..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-360px)]">
              {/* Menu Items */}
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    // Handle add to cart when clicking on card
                    console.log('Add to cart:', item);
                  }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group relative"
                >
                  <div className="bg-gray-200 h-24 rounded mb-3 group-hover:bg-gray-300 transition-colors"></div>
                  <h3 className="font-medium text-sm mb-1 text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-xs mt-1 mb-2">{item.description}</p>
                  <p className="text-blue-600 font-semibold text-sm">{item.price}</p>
                  
                  {/* Detail Menu Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(item);
                    }}
                    className="absolute bottom-2 right-2 p-2 text-gray-900 hover:text-blue-600 hover:border-blue-500 border border-gray-300 rounded-md transition-colors cursor-pointer bg-white hover:bg-blue-50"
                    title="Detail Menu"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Section (Right Sidebar) */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            {/* Header dengan Archive Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">List Pesanan</h2>
              
              {/* Archive Order Button - Icon only */}
              <button
                onClick={() => router.push("/cashier/orders/archive")}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                title="Archive Orders"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </button>
            </div>

            {/* Order Number */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">ORDR#001</p>
            </div>

            {/* Order Type Toggle */}
            <div className="flex rounded-lg p-1 mb-4 gap-3">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md cursor-pointer transition-colors">
                Dine In
              </button>
              <button className="flex-1 px-3 py-2 text-sm text-gray-600 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
                Take Away
              </button>
            </div>

            {/* Customer Info - Side by side for Dine In */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Customer
                </label>
                <input
                  type="text"
                  placeholder="Nama customer"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. Meja
                </label>
                <input
                  type="text"
                  placeholder="No meja"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-b border-gray-200 py-4 mb-4 max-h-60 overflow-y-auto">
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">Belum ada pesanan</p>
                <p className="text-gray-400 text-xs mt-1">Pilih menu untuk menambah pesanan</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Pajak (10%):</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 text-gray-900">
                <span>Total:</span>
                <span>Rp 0</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="primary" size="lg" className="w-full cursor-pointer">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Pay
              </Button>
              
              <Button variant="outline" size="sm" className="w-full cursor-pointer">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Detail Modal */}
      <MenuDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        menuItem={selectedMenuItem}
      />
    </DashboardLayout>
  );
}