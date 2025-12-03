"use client";
import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/services/auth/registerUser";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setServerError("");
    setServerSuccess("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone || "");
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const res = await registerUser(null, formData);

    if (res?.success) {
      setServerSuccess("Registration successful! Redirecting...");
      router.push("/dashboard"); // registerUser already logs in, so redirect
      reset();
    } else {
      setServerError(res?.message || "Registration failed. Please try again.");
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
        <h2 className="text-white text-3xl font-bold mb-2 text-center">Good Morning!</h2>
        <p className="text-gray-400 mb-6 text-center">Thank you for joining us!</p>

        {/* 🔥 Server errors */}
        {serverError && <p className="text-red-500 mb-4 text-center">{serverError}</p>}
        {serverSuccess && <p className="text-green-500 mb-4 text-center">{serverSuccess}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md z-50 relative">

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Full Name*</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Phone Number</label>
            <input
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^(?:\+?88)?01[3-9]\d{8}$/,
                  message: "Please enter a valid Bangladeshi phone number",
                },
              })}
              placeholder="Enter your phone number (optional)"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Your Email*</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Password*</label>
            <input
              type="password"
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
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1">Confirm Password*</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm your password"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary py-3 text-white font-bold rounded hover:bg-[#b90101ce] transition"
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 mt-5 z-50 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
