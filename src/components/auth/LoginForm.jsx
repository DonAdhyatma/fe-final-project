"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuth } from "../../context/AuthContext";
import { isValidusername } from "../../lib/utils";
import LogoComponent from "../../components/ui/LogoComponent";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  // Watch username value for validation
  const usernameValue = watch("username");

  // Handle form submission
  const onSubmit = async (data) => {
    clearError();

    try {
      const result = await login({
        username: data.username.trim(),
        password: data.password,
      });

      if (result.success) {
        toast.success("Login berhasil!");

        // Redirect based on user role
        const userRole = result.data.user.role;
        if (userRole === "admin") {
          router.push("/admin");
        } else if (userRole === "cashier") {
          router.push("/cashier");
        } else {
          router.push("/");
        }
      } else {
        toast.error(result.error || "Login gagal");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat login");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-[#919191] mt-2">Please enter your username and password here!</p>
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
                <h3 className="text-sm font-medium text-red-800">Login Gagal</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <Input
            label="Username"
            type="text"
            placeholder="Username"
            className="text-black"
            error={errors.username?.message}
            required
            {...register("username", {
              required: "Username wajib diisi",
            })}
          />

          {/* Password Field */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="text-black"
              error={errors.password?.message}
              required
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter",
                },
              })}
            />

            {/* Password Toggle Button */}
            <button type="button" className="absolute right-3 top-9 text-gray-400 hover:text-gray-600" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="rememberMe" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" {...register("rememberMe")} />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Ingat saya
              </label>
            </div>

            <button type="button" className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer" onClick={() => router.push("/reset-password")}>
              Lupa password?
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" size="lg" className="w-full cursor-pointer" loading={isLoading} disabled={isLoading}>
            {isLoading ? "Memproses..." : "Login"}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <button type="button" className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer" onClick={() => router.push("/register")}>
              Daftar sekarang
            </button>
          </p>
        </div>

        {/* Demo Accounts Info */}
        {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center mb-2 font-medium">Demo Accounts:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Admin:</span>
              <span>admin@pos.com / admin123</span>
            </div>
            <div className="flex justify-between">
              <span>Cashier:</span>
              <span>cashier@pos.com / cashier123</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
