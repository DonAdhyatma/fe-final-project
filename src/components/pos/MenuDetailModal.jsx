"use client";

const MenuDetailModal = ({ isOpen, onClose, menuItem }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - hanya blur tanpa warna gelap */}
      <div 
        className="fixed inset-0 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
          {/* Header dengan Title dan Close Button */}
          <div className="flex items-center justify-center p-4 relative">
            <h2 className="text-lg font-semibold text-gray-900">Detail Menu</h2>
            <button
              onClick={onClose}
              className="absolute right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Menu Image */}
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>

            {/* Menu Info */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">{menuItem?.name || 'Menu Item'}</h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {menuItem?.description || 'Vegetables, egg, tempe, tofu, ketupat, peanut sauce, and kerupuk.'}
              </p>

              {/* Kategori dan Harga - diperbaiki layoutnya */}
              <div className="pt-2 space-y-2">
                <div className="text-sm text-gray-500">
                  Kategori: {menuItem?.category || 'Food'}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {menuItem?.price || 'Rp 25.000'}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
              <svg className="w-5 h-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah ke Pesanan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDetailModal;