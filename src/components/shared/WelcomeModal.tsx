'use client';

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    const hide = localStorage.getItem("hideWelcomeModal");
    if (!hide) {
      const timer = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (dontShow) {
      localStorage.setItem("hideWelcomeModal", "1");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          max-w-2xl p-0 overflow-hidden
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0
          data-[state=open]:zoom-in-95
          data-[state=closed]:zoom-out-95
          duration-300
        "
      >
        {/* Accessibility */}
        <DialogTitle className="sr-only">
          Welcome to GymFlow
        </DialogTitle>
        <DialogDescription className="sr-only">
          Sign up to get special offers and updates
        </DialogDescription>

        {/* Close button */}
        <DialogClose asChild>
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-3 right-3 z-20 rounded-full bg-white/80 hover:bg-white p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogClose>

        <div className="flex flex-col md:flex-row">
          {/* Left */}
          <div className="flex-1 p-8">
            <div className="text-sm font-semibold text-orange-500 mb-2">
              GET UP TO 25% OFF
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Sign up to GymFlow
            </h2>
            <p className="text-gray-500 mb-4">
              Subscribe to our newsletter for special offers.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleClose();
              }}
              className="flex mb-4"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 px-4 py-1 border rounded-l-lg outline-none"
              />
              <Button className="rounded-l-none">
                SUBMIT
              </Button>
            </form>

            <label className="flex items-center gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
              />
              Don’t show this again
            </label>
          </div>

          {/* Right */}
          <div className="hidden md:block relative w-64 h-80">
            <Image
              src="/Images/modal.jpg"
              alt="Welcome"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
