import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import MenuGrid from "./MenuGrid";
import SidebarRight from "../layout/SidebarRight";
import DeleteConfirmModal from "./DeleteConfirmModal";

const MenuCatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sidebarMode, setSidebarMode] = useState("default");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);

  // Mock data - replace with API calls
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      category: "foods",
      price: 25000,
      description: "Nasi goreng dengan telur, ayam, dan sayuran segar",
      image: "/images/nasi-goreng.jpg",
      available: true,
    },
    {
      id: 2,
      name: "Es Teh Manis",
      category: "beverages",
      price: 8000,
      description: "Teh manis dingin yang menyegarkan",
      image: "/images/es-teh.jpg",
      available: true,
    },
    {
      id: 3,
      name: "Ice Cream Vanilla",
      category: "desserts",
      price: 15000,
      description: "Es krim vanilla premium dengan topping",
      image: "/images/ice-cream.jpg",
      available: false,
    },
  ]);

  const filteredMenus = activeCategory === "all" ? menus : menus.filter((menu) => menu.category === activeCategory);

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
    setSidebarMode("detail");
  };

  const handleAddMenu = async (menuData) => {
    // API call to add menu
    const newMenu = {
      id: Date.now(),
      ...menuData,
      available: true,
    };
    setMenus([...menus, newMenu]);
    setSidebarMode("default");
  };

  const handleUpdateMenu = async (updatedMenu) => {
    // API call to update menu
    setMenus(menus.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu)));
    setSelectedMenu(updatedMenu);
    setSidebarMode("detail");
  };

  const handleDeleteMenu = (menu) => {
    setMenuToDelete(menu);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async (menuId) => {
    // API call to delete menu
    setMenus(menus.filter((menu) => menu.id !== menuId));
    setSidebarMode("default");
    setSelectedMenu(null);
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Menu Catalog</h1>

          {/* Category Filter */}
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {/* Menu Grid */}
          <MenuGrid menus={filteredMenus} onMenuSelect={handleMenuSelect} />
        </div>
      </div>

      {/* Sidebar Right */}
      <SidebarRight mode={sidebarMode} selectedMenu={selectedMenu} onModeChange={setSidebarMode} onMenuAdd={handleAddMenu} onMenuUpdate={handleUpdateMenu} onMenuDelete={handleDeleteMenu} />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} menu={menuToDelete} onConfirm={confirmDelete} />
    </div>
  );
};

export default MenuCatalogPage;
