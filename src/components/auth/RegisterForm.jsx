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

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password value for confirmation validation
  const passwordValue = watch("password");

  // Handle form submission
  const onSubmit = async (data) => {
    clearError();

    try {
      const result = await registerUser({
        username: data.username.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      if (result.success) {
        toast.success("Registrasi berhasil! Selamat datang!");

        // Redirect based on user role (since AuthContext auto-login after register)
        const userRole = result.data.user.role;
        if (userRole === "admin") {
          router.push("/admin");
        } else if (userRole === "cashier") {
          router.push("/cashier");
        } else {
          router.push("/");
        }
      } else {
        toast.error(result.error || "Registrasi gagal");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat registrasi");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Email validation pattern
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <LogoComponent className="w-12 h-12" />
            <h1 className="text-xl font-bold text-[#3572EF]">PadiPos</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-[#919191] mt-2">Please fill in the form to create your account!</p>
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
                <h3 className="text-sm font-medium text-red-800">Registrasi Gagal</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Register Form */}
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
              minLength: {
                value: 3,
                message: "Username minimal 3 karakter",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Username hanya boleh mengandung huruf, angka, dan underscore",
              },
            })}
          />

          {/* Email Field */}
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            className="text-black"
            error={errors.email?.message}
            required
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: emailPattern,
                message: "Format email tidak valid",
              },
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
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                  message: "Password harus mengandung huruf dan angka",
                },
              })}
            />

            {/* Password Toggle Button */}
            <button type="button" className="absolute right-3 top-9 text-gray-400 hover:text-gray-600" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="text-black"
              error={errors.confirmPassword?.message}
              required
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: (value) => value === passwordValue || "Password tidak sama",
              })}
            />

            {/* Confirm Password Toggle Button */}
            <button type="button" className="absolute right-3 top-9 text-gray-400 hover:text-gray-600" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" size="lg" className="w-full cursor-pointer" loading={isLoading} disabled={isLoading}>
            {isLoading ? "Memproses..." : "Daftar"}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <button type="button" className="text-blue-600 hover:text-blue-500 font-medium" onClick={() => router.push("/login")}>
              Login sekarang
            </button>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Dengan mendaftar, Anda menyetujui <span className="text-blue-600 cursor-pointer">Syarat & Ketentuan</span> dan <span className="text-blue-600 cursor-pointer">Kebijakan Privasi</span> kami.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
