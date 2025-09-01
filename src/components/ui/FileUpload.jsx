import { useState, useRef } from "react";
import { clsx } from "clsx";

const FileUpload = ({
  onFileSelect,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  preview = true,
  className = "",
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      alert(`File size too large. Max size is ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Create preview URL
    if (preview && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    // Call parent handler
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={clsx("w-full", className)}>
      {/* Preview Image */}
      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-300" />
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={clsx("relative border-2 border-dashed rounded-lg p-6 text-center transition-colors", dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300", error ? "border-red-300" : "")}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input ref={fileInputRef} type="file" accept={accept} onChange={handleInputChange} className="hidden" />

        <div className="space-y-2">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="text-gray-600">
            <p className="text-sm">
              Drag and drop your file here or{" "}
              <button type="button" onClick={openFileDialog} className="text-blue-600 hover:text-blue-700 font-medium">
                Choose File
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-1">Max file size: {maxSize / (1024 * 1024)}MB</p>
          </div>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
