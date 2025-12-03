"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (

    <div className="relative w-full flex flex-col justify-center items-center bg-gray-900 min-h-screen px-10  bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
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

      <h2 className="text-white text-3xl font-bold mb-2">Forgot Password?</h2>
      <p className="text-gray-400 mb-6">Enter your email to reset your password</p>

      <form onSubmit={handleSubmit(() => { })} className="w-full max-w-sm z-20 relative">
        <div className="relative w-full mb-4">
          <input
            type="email"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {errors.email && <span className="text-red-600">Email is required</span>}

        <button type="submit" className="w-full mt-3 bg-primary py-3 text-white font-bold rounded">
          Send Reset Link
        </button>
      </form>

      <p className="text-gray-400 mt-5 z-20">
        Remember your password? <Link href="/signin" className="text-primary">Login</Link>
      </p>
      <p className="text-gray-400 mt-5 z-20">
        Remember your password? <Link href="/otp-verification" className="text-primary">OTP</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
