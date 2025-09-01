"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuth } from "../../context/AuthContext";
import LogoComponent from "../../components/ui/LogoComponent";

const ResetPasswordForm = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: New Password
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const { resetPassword, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  // Form untuk Step 1 (Email)
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  // Form untuk Step 2 (New Password)
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    watch,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch new password value for confirmation validation
  const newPasswordValue = watch("newPassword");

  // Email validation pattern
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Handle Step 1 submission (Email)
  const onSubmitStep1 = async (data) => {
    clearError();

    try {
      const result = await resetPassword(data.email.trim());

      if (result.success) {
        setResetEmail(data.email.trim());
        setCurrentStep(2);
        toast.success("Link verifikasi telah dikirim! Silakan lanjutkan dengan password baru.");
      } else {
        toast.error(result.error || "Gagal mengirim link reset password");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengirim link reset");
    }
  };

  // Handle Step 2 submission (New Password)
  const onSubmitStep2 = async (data) => {
    clearError();

    try {
      // Simulate API call untuk update password
      // Replace dengan real API call nanti
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Password berhasil direset! Silakan login dengan password baru.");
      router.push("/login");
    } catch (err) {
      toast.error("Terjadi kesalahan saat reset password");
    }
  };

  // Toggle new password visibility
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Back to step 1
  const backToStep1 = () => {
    setCurrentStep(1);
    setResetEmail("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <LogoComponent className="w-12 h-12" />
            <h1 className="text-xl font-bold text-[#3572EF]">PadiPos</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{currentStep === 1 ? "Reset Password" : "Create New Password"}</h2>
          <p className="text-[#919191] mt-2">{currentStep === 1 ? "Enter your email address to receive reset instructions" : "Enter your new password to complete the reset"}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? "bg-[#3572EF] text-white" : "bg-gray-200 text-gray-600"}`}>1</div>
              <span className="ml-2 text-sm text-gray-600">Email</span>
            </div>

            {/* Connector */}
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? "bg-[#3572EF]" : "bg-gray-200"}`}></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? "bg-[#3572EF] text-white" : "bg-gray-200 text-gray-600"}`}>2</div>
              <span className="ml-2 text-sm text-gray-600">Password</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Reset Password Gagal</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Email Form */}
        {currentStep === 1 && (
          <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
            {/* Email Field */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              className="text-black"
              error={errorsStep1.email?.message}
              required
              {...registerStep1("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: emailPattern,
                  message: "Format email tidak valid",
                },
              })}
            />

            {/* Submit Button */}
            <Button type="submit" variant="primary" size="lg" className="w-full cursor-pointer" loading={isLoading} disabled={isLoading}>
              {isLoading ? "Mengirim..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        {/* Step 2: New Password Form */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
            {/* Email Info */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
              <div className="flex">
                <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-green-800">Email Verified</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Reset link sent to: <strong>{resetEmail}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <Input
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="text-black"
                error={errorsStep2.newPassword?.message}
                required
                {...registerStep2("newPassword", {
                  required: "Password baru wajib diisi",
                  minLength: {
                    value: 6,
                    message: "Password minimal 6 karakter",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                    message: "Password harus mengandung huruf dan angka",
                  },
                })}
              />

              {/* New Password Toggle Button */}
              <button type="button" className="absolute right-3 top-9 text-gray-400 hover:text-gray-600" onClick={toggleNewPasswordVisibility}>
                {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            {/* Confirm New Password Field */}
            <div className="relative">
              <Input
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="text-black"
                error={errorsStep2.confirmPassword?.message}
                required
                {...registerStep2("confirmPassword", {
                  required: "Konfirmasi password wajib diisi",
                  validate: (value) => value === newPasswordValue || "Password tidak sama",
                })}
              />

              {/* Confirm Password Toggle Button */}
              <button type="button" className="absolute right-3 top-9 text-gray-400 hover:text-gray-600" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {/* Back Button */}
              <Button type="button" variant="secondary" size="lg" className="w-full cursor-pointer" onClick={backToStep1} disabled={isLoading}>
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
              </Button>

              {/* Submit Button */}
              <Button type="submit" variant="primary" size="lg" className="w-full cursor-pointer" loading={isLoading} disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <button type="button" className="text-blue-600 hover:text-blue-500 font-medium" onClick={() => router.push("/login")}>
              Back to Login
            </button>
          </p>
        </div>

        {/* Help Info */}
        {currentStep === 1 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">Enter the email address associated with your PadiPos account and we'll send you instructions to reset your password.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
