"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
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
      <div className="relative w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-10 py-8  bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
        <h2 className="text-white text-3xl font-bold mb-2 text-center">
          Good Morning!
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          Thank you for joining us!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md z-50 relative">
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-500 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  message:
                    "Must include uppercase, lowercase, number & special character",
                },
              })}
              placeholder="Create a strong password"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary py-3 text-white font-bold rounded hover:bg-[#b90101ce] transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-gray-400 mt-5 text-center z-50">
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
