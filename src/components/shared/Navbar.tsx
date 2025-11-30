"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Trainers", href: "/trainers" },
    { name: "Pricing", href: "/membership" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
                                <Dumbbell className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl lg:text-2xl font-bold text-white">
                                Gym<span className="text-red-600">Flow</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-gray-300 hover:text-red-500 transition-colors font-medium ${
                                        isActive(link.href) ? "text-red-500" : ""
                                    }`}
                                >
                                    {link.name}
                                    {isActive(link.href) && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-red-600 to-orange-600 rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons */}
                        <Link href="/signin" className="hidden md:flex items-center space-x-4">
                            <Button className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-6">
                                Sign In
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <Menu className="w-6 h-6" />    
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-60 md:hidden transition-opacity duration-300 ${
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 z-70 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <Link 
                            href="/" 
                            className="flex items-center space-x-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="p-2 bg-red-600 rounded-lg">
                                <Dumbbell className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">
                                Gym<span className="text-red-600">Flow</span>
                            </span>
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                        <nav className="space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium group ${
                                        isActive(link.href)
                                            ? "text-white bg-linear-to-r from-red-600 to-orange-600 shadow-lg shadow-red-500/20"
                                            : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="flex-1">{link.name}</span>
                                    <svg
                                        className={`w-4 h-4 transform group-hover:translate-x-1 transition-all ${
                                            isActive(link.href) ? "text-white" : "text-gray-500 group-hover:text-red-500"
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Drawer Footer with Auth Buttons */}
                    <Link href="/signin" className="p-6 border-t border-gray-700 space-y-3 bg-gray-900/50">
                        <Button className="w-full bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg shadow-red-500/20">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}