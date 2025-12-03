"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, Mail, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Animated Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative p-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full">
              <AlertTriangle className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">
            Oops!{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Something Went Wrong
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-lg mx-auto">
            {error?.message ??
              "We encountered an unexpected error. Don't worry — we're working on it."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={reset}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg group"
          >
            <RefreshCcw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-zinc-700 text-white hover:bg-zinc-800 px-8 py-6 text-lg"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="mr-2 w-5 h-5" />
            Go Home
          </Button>
        </div>

        {/* Contact Support */}
        <div className="pt-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-500 mb-4">
            Need help? Our support team is here for you.
          </p>
          <Button
            variant="ghost"
            className="text-orange-400 hover:text-orange-300 hover:bg-orange-950/20"
            onClick={() => (window.location.href = "/contact")}
          >
            <Mail className="mr-2 w-4 h-4" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
