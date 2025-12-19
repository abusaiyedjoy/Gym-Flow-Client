"use client";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/services/auth/registerUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOffIcon } from "lucide-react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone || "");
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    try {
      const res = await registerUser(null, formData);

      if (res?.success) {
        toast.success("Registration successful!", {
          description: "Redirecting to dashboard...",
          duration: 3000,
        });
        
        setTimeout(() => {
          router.push("/dashboard");
          reset();
        }, 500);
      } else {
        toast.error("Registration failed", {
          description: res?.message || "Please try again later",
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-900">
      {/* Left Side - Hidden on small screens */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://i.ibb.co.com/6cFnYcnT/anastase-maragos-jz-P8-Rg6a-VU-unsplash.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-10 py-8 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Logo */}
        <div className="absolute top-6 left-6">
          <Logo />
        </div>

        {/* Header */}
        <h2 className="text-white text-3xl font-bold mb-2 text-center z-50">
          Good <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">Morning!</span>
        </h2>
        <p className="text-gray-400 mb-6 text-center z-50">Thank you for joining us!</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md z-50 relative">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Full Name*</label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 transition-all duration-200 ${
                focusedField === "name"
                  ? "border-l-4 border-orange-500 bg-gray-700"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-white"
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Phone Number</label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 transition-all duration-200 ${
                focusedField === "phone"
                  ? "border-l-4 border-orange-500 bg-gray-700"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <input
                type="tel"
                {...register("phone", {
                  pattern: {
                    value: /^(?:\+?88)?01[3-9]\d{8}$/,
                    message: "Please enter a valid Bangladeshi phone number",
                  },
                })}
                placeholder="Enter your phone number (optional)"
                className="w-full bg-transparent outline-none text-white"
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
            </div>
            {errors.phone && (
              <p className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Your Email*</label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 transition-all duration-200 ${
                focusedField === "email"
                  ? "border-l-4 border-orange-500 bg-gray-700"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Password*</label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 transition-all duration-200 ${
                focusedField === "password"
                  ? "border-l-4 border-orange-500 bg-gray-700"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
                placeholder="Create a strong password"
                className="w-full bg-transparent outline-none text-white"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOffIcon/>
                ) : (
                  <Eye/>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-500 mb-1">Confirm Password*</label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 transition-all duration-200 ${
                focusedField === "confirmPassword"
                  ? "border-l-4 border-orange-500 bg-gray-700"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="w-full bg-transparent outline-none text-white"
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon/>
                ) : (
                  <Eye/>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-400 to-red-600 py-3 text-white font-bold rounded cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-gray-400 mt-6 z-50 text-center">
          Already have an account?{" "}
          <Link 
            href="/signin" 
            className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;