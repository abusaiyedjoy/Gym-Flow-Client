"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Dumbbell } from "lucide-react";
import { loginUser } from "@/services/auth/loginUser";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [focusedField, setFocusedField] = useState(null);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setServerError("");

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("redirect", "/dashboard"); // optional

    const response = await loginUser(null, formData);

    if (response?.success) {
      router.push(response.redirectTo || "/dashboard");
    } else {
      setServerError(response?.message || "Login failed");
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
        {/* Logo */}
        <Link href="/" className="absolute top-12 left-12 flex items-center space-x-2 group">
          <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl lg:text-2xl font-bold text-white">
            Gym<span className="text-red-600">Flow</span>
          </span>
        </Link>
        {/* Header */}
        <h2 className="text-white text-3xl font-bold mb-2 text-center">
          Welcome Back!
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          Please sign in to continue.
        </p>

        {/* 🔥 Show server errors */}
        {serverError && (
          <p className="text-red-500 mb-4 text-center">{serverError}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md z-50">
          {/* Email Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-500 mb-1" htmlFor="email">
              Your Email
            </label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 ${focusedField === "email"
                ? "border-l-4 border-primary bg-gray-700"
                : "border-gray-700 bg-gray-800"
                }`}
            >
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-500 mb-1" htmlFor="password">
              Password
            </label>
            <div
              className={`w-full p-3 rounded flex items-center border-2 ${focusedField === "password"
                ? "border-l-4 border-primary bg-gray-700"
                : "border-gray-700 bg-gray-800"
                }`}
            >
              <input
                type="password"
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
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-gray-400 text-sm">
              <input
                type="checkbox"
                className="mr-2 accent-primary"
                {...register("rememberMe")}
              />
              Remember Me
            </label>
            <Link href="/forgot-password" className="text-primary text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary py-3 text-white font-bold rounded hover:bg-[#b90101ce] transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Don't have an account? */}
        <p className="text-gray-400 mt-5 text-center z-50">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
