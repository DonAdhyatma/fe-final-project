"use client";

import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "../../../components/ui/Button";

export default function CashierPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

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
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">POS - Point of Sales</h1>
              <p className="text-gray-600">Selamat datang, {user?.username}</p>
            </div>
            <div className="flex items-center space-x-4">
              {user?.role === "admin" && (
                <Button variant="outline" onClick={() => router.push("/admin")}>
                  Admin Panel
                </Button>
              )}
              <Button variant="outline" className="cursor-pointer" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main POS Interface */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Menu Section (Left Side) */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>

              {/* Category Filter Buttons - Placeholder */}
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

            {/* Menu Grid - Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-280px)]">
              {/* Placeholder Menu Items */}
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-gray-200 h-24 rounded mb-3"></div>
                  <h3 className="font-medium text-sm mb-1">Menu Item {i + 1}</h3>
                  <p className="text-blue-600 font-semibold">Rp 25.000</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Section (Right Sidebar) */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pesanan</h2>

              {/* Order Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md cursor-pointer">Dine In</button>
                <button className="px-3 py-1 text-sm text-gray-600 rounded-md cursor-pointer">Take Away</button>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3 mb-4">
              <input type="text" placeholder="Nama Customer" className="w-full p-2 border rounded-lg text-sm" />
              <input type="text" placeholder="Nomor Meja" className="w-full p-2 border rounded-lg text-sm" />
            </div>

            {/* Order Items */}
            <div className="border-t border-b py-4 mb-4 max-h-60 overflow-y-auto">
              <p className="text-gray-500 text-center text-sm">Belum ada pesanan</p>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between">
                <span>Pajak (10%):</span>
                <span>Rp 0</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span>
                <span>Rp 0</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button variant="primary" size="lg" className="w-full cursor-pointer">
                Bayar
              </Button>
              <Button variant="outline" size="md" className="w-full cursor-pointer" onClick={() => router.push("/cashier/orders/archive")}>
                Riwayat Pesanan
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
