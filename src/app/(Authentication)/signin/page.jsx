"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import { toast } from "sonner";
import { Eye, EyeOffIcon } from "lucide-react";

const SignIn = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  // Demo credentials
  const demoCredentials = [
    {
      role: "Admin",
      email: "abu.saidking@gmail.com",
      password: "01988084185aA@",
      icon: "\uD83D\uDC68\u200D\uD83D\uDCBB", // 👨‍💻
    },
    {
      role: "Trainer",
      email: "143princejoy@gmail.com",
      password: "01988084185aA",
      icon: "\uD83C\uDFCB\uFE0F", // 🏋️
    },
    {
      role: "Member",
      email: "tipusahil7@gmail.com",
      password: "01988084185aA",
      icon: "\uD83D\uDC65", // 👥
    },
  ];

  const handleDemoClick = (cred) => {
    setValue("email", cred.email, { shouldValidate: true });
    setValue("password", cred.password, { shouldValidate: true });
    setFocusedField(null);
  };
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("redirect", "/dashboard");

    try {
      const response = await loginUser(null, formData);
      if (response?.success) {
        toast.success("Login successful!", {
          description: "Redirecting to dashboard...",
          duration: 3000,
        });
        setTimeout(() => {
          router.push(response.redirectTo || "/dashboard");
        }, 500);
        return;
      } else {
        toast.error("Login failed", {
          description: response?.message || "Invalid email or password",
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
          src="https://i.ibb.co.com/rKjPspy8/john-fornander-TAZo-Um-Dqz-Xk-unsplash.jpg"
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
          Welcome <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">Back!</span>
        </h2>
        <p className="text-gray-400 mb-6 text-center z-50">
          Please sign in to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md z-50">
          {/* Email Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-500 mb-1" htmlFor="email">
              Your Email
            </label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 transition-all duration-200 ${focusedField === "email"
                ? "border-l-4 border-orange-500 bg-gray-700"
                : "border-gray-700 bg-gray-800"
                }`}
            >
              <input
                type="email"
                id="email"
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

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-500 mb-1" htmlFor="password">
              Password
            </label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 transition-all duration-200 ${focusedField === "password"
                ? "border-l-4 border-orange-500 bg-gray-700"
                : "border-gray-700 bg-gray-800"
                }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
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
                  <EyeOffIcon />
                ) : (
                  <Eye />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Demo Credentials */}
          <div className="mb-6">
            <div className="rounded-lg bg-zinc-800/80 border border-orange-400/30 p-4 flex flex-col gap-2">
              <div className="text-orange-300 text-sm font-semibold mb-2 flex items-center gap-2">
                Test Credentials (Click to fill):
              </div>
              <div className="flex flex-wrap gap-2">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => handleDemoClick(cred)}
                    className="flex-1 min-w-[110px] bg-zinc-900 border border-orange-400/40 hover:bg-orange-500/20 transition-colors rounded-md px-3 py-2 flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    <span className="text-lg mb-1">{cred.icon}</span>
                    <span className="font-semibold text-orange-200 text-xs">{cred.role}</span>
                    <span className="text-xs text-gray-400 truncate max-w-[90px]">{cred.email}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-gray-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 accent-orange-400 cursor-pointer"
                {...register("rememberMe")}
                disabled={isLoading}
              />
              Remember Me
            </label>
            <Link
              href="/forgot-password"
              className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent text-sm hover:underline"
            >
              Forgot Password?
            </Link>
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Don't have an account? */}
        <p className="text-gray-400 mt-6 text-center z-50">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;