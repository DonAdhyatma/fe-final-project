"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const DeleteConfirmModal = ({ isOpen, onClose, menuItem, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!menuItem) return;

    setIsDeleting(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/menu-items/${menuItem.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }

      toast.success("Menu successfully deleted");
      onConfirm?.(menuItem);
      onClose();
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error("Failed to delete menu item");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Content */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">Are you sure want to delete this file?</h3>

        {menuItem && (
          <p className="text-sm text-gray-600 mb-6">
            <strong>{menuItem.name}</strong> will be permanently deleted. This action cannot be undone.
          </p>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} disabled={isDeleting} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={isDeleting} className="flex-1">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
