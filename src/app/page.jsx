"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "../components/ui/Button";
import LogoComponent from "../components/ui/LogoComponent";

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  // Auto redirect based on auth status
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/admin");
        } else if (user.role === "cashier") {
          router.push("/cashier");
        }
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If authenticated, show loading while redirecting
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          {/* Header Section - Logo and Title */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <LogoComponent className="w-12 h-12" />
              <h1 className="text-4xl font-bold text-[#3572EF]">PadiPos</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Modern Point of Sale System for Your Business</p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto w-full">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Menu Management</h3>
              <p className="text-gray-600 text-center leading-relaxed">Easy menu management for all your food and beverages with intuitive interface</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Payment Processing</h3>
              <p className="text-gray-600 text-center leading-relaxed">Quick and secure payment processing with automatic receipt printing</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Sales Reports</h3>
              <p className="text-gray-600 text-center leading-relaxed">Comprehensive sales reports and detailed business analytics</p>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mb-16">
            <Button variant="primary" size="xl" onClick={() => router.push("/login")} className="px-12 py-4 text-lg font-semibold cursor-pointer hover:scale-105 transform transition-transform duration-200">
              Get Started
            </Button>
            <p className="text-gray-500 text-sm mt-4">Start managing your business today</p>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-gray-200 pt-8 w-full max-w-4xl">
            <p className="text-gray-500 text-sm">© 2025 PadiPos. Built with Next.js and Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
