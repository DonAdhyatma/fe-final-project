import { clsx } from "clsx";

const Input = ({ label, type = "text", placeholder, value, onChange, error, disabled = false, required = false, className = "", ...props }) => {
  const baseStyles = "block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} required={required} className={clsx(baseStyles, error ? variants.error : variants.default, className)} {...props} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
