"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import CategoryFilter from "../../../../components/admin/CategoryFilter";
import MenuGrid from "../../../../components/admin/MenuGrid";
import SidebarRight, { SidebarRightEmpty } from "../../../../components/layout/SidebarRight";
import AddMenuForm from "../../../../components/admin/AddMenuForm";
import MenuDetailView from "../../../../components/admin/MenuDetailView";
import EditMenuForm from "../../../../components/admin/EditMenuForm";
import DeleteConfirmModal from "../../../../components/admin/DeleteConfirmModal";
import toast from "react-hot-toast";

export default function AdminCatalogPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // State management
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // Sidebar states
  const [sidebarMode, setSidebarMode] = useState("empty"); // "empty", "add", "detail", "edit"
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Auth protection
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "admin") {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Fetch menu items
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Filter items when activeFilter or menuItems change
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter((item) => item.category === activeFilter));
    }
  }, [activeFilter, menuItems]);

  const fetchMenuItems = async () => {
    setIsLoadingItems(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/menu-items");
      if (!response.ok) throw new Error("Failed to fetch menu items");

      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      // Mock data for development
      setMenuItems([
        {
          id: 1,
          name: "Gado-Gado",
          category: "Food",
          price: 15000,
          description: "Traditional Indonesian salad with peanut sauce",
          image: "/images/gado-gado.jpg",
          isAvailable: true,
        },
        {
          id: 2,
          name: "Iced Coffee",
          category: "Beverages",
          price: 12000,
          description: "Cold brew coffee with ice",
          image: "/images/iced-coffee.jpg",
          isAvailable: true,
        },
      ]);
    } finally {
      setIsLoadingItems(false);
    }
  };

  // Event handlers
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleAddMenuClick = () => {
    setSidebarMode("add");
    setSelectedMenuItem(null);
  };

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setSidebarMode("detail");
  };

  const handleEditClick = () => {
    setSidebarMode("edit");
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarMode("empty");
    setSelectedMenuItem(null);
  };

  const handleMenuAdded = (newMenuItem) => {
    setMenuItems((prev) => [...prev, newMenuItem]);
    setSidebarMode("empty");
    setSelectedMenuItem(null);
  };

  const handleMenuUpdated = (updatedMenuItem) => {
    setMenuItems((prev) => prev.map((item) => (item.id === updatedMenuItem.id ? updatedMenuItem : item)));
    setSelectedMenuItem(updatedMenuItem);
    setSidebarMode("detail");
  };

  const handleMenuDeleted = (deletedMenuItem) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== deletedMenuItem.id));
    setSidebarMode("empty");
    setSelectedMenuItem(null);
    setIsDeleteModalOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Not authorized
  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  // Render sidebar content based on mode
  const renderSidebarContent = () => {
    switch (sidebarMode) {
      case "add":
        return <AddMenuForm onSuccess={handleMenuAdded} onCancel={handleCloseSidebar} />;
      case "detail":
        return <MenuDetailView menuItem={selectedMenuItem} onEdit={handleEditClick} onDelete={handleDeleteClick} onClose={handleCloseSidebar} />;
      case "edit":
        return <EditMenuForm menuItem={selectedMenuItem} onSuccess={handleMenuUpdated} onCancel={() => setSidebarMode("detail")} />;
      default:
        return <SidebarRightEmpty onAddMenu={handleAddMenuClick} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Menu Catalog</h1>
              <p className="text-gray-600 mt-1">Manage your restaurant menu items</p>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <CategoryFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
            </div>

            {/* Menu Grid */}
            <MenuGrid menuItems={filteredItems} onMenuClick={handleMenuClick} isLoading={isLoadingItems} />
          </div>
        </div>

        {/* Right Sidebar */}
        {renderSidebarContent()}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} menuItem={selectedMenuItem} onConfirm={handleMenuDeleted} />
    </DashboardLayout>
  );
}
