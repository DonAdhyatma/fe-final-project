"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import FileUpload from "../ui/FileUpload";
import toast from "react-hot-toast";

const AddMenuForm = ({ onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      category: "Food",
      price: "",
      description: "",
    },
  });

  const categories = [
    { value: "Food", label: "Foods" },
    { value: "Beverages", label: "Beverages" },
    { value: "Desserts", label: "Desserts" },
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("description", data.description);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      // TODO: Replace with actual API call to your Express backend
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }

      const newMenuItem = await response.json();

      toast.success("Menu item added successfully!");
      reset();
      setSelectedFile(null);
      onSuccess?.(newMenuItem);
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Failed to add menu item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Add New Menu</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Menu Image</label>
            <FileUpload onFileSelect={setSelectedFile} accept="image/*" preview={true} />
          </div>

          {/* Menu Name */}
          <Input
            label="Menu Name"
            required
            placeholder="Enter menu name"
            error={errors.name?.message}
            {...register("name", {
              required: "Menu name is required",
              minLength: {
                value: 2,
                message: "Menu name must be at least 2 characters",
              },
            })}
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" {...register("category", { required: "Category is required" })}>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          {/* Price */}
          <Input
            label="Price (Rp)"
            type="number"
            required
            placeholder="Enter price"
            min="0"
            step="1000"
            error={errors.price?.message}
            {...register("price", {
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            })}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Enter menu description (optional)"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("description")}
            />
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button type="submit" variant="primary" loading={isLoading} className="w-full">
              Save Menu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuForm;
