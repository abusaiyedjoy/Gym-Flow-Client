"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Dumbbell, LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logoutUser";
import Avatar from "./Avatar";
import Logo from "./Logo";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Trainers", href: "/trainers" },
    { name: "Pricing", href: "/membership" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
];

interface NavbarProps {
    isAuthenticated?: boolean;
    user?: { name?: string; email?: string; role?: string; profileImage?: string | null } | null;
}

export default function Navbar({ isAuthenticated = true, user = null }: NavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logoutUser();
        } catch (error) {
            console.error('Logout failed:', error);
            router.push('/signin');
        } finally {
            setIsLoggingOut(false);
        }
    };

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Logo/>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-gray-300 hover:text-red-500 transition-colors font-medium ${isActive(link.href) ? "text-red-500" : ""
                                        }`}
                                >
                                    {link.name}

                                    {isActive(link.href) && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
                                    )}
                                </Link>

                            ))}
                        </div>

                        {/* Desktop Auth Buttons / Profile */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isAuthenticated ? (
                                <div className="relative group">
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="border-2 border-red-300 rounded-full transition-all cursor-pointer"
                                    >
                                        <Avatar
                                            src={user?.profileImage || "/profile.jpg"}
                                            alt={user?.name || "User"}
                                            size="sm"
                                        />
                                    </button>

                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-medium">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>

                                            <button
                                                onClick={() => router.push(`/dashboard/${user?.role?.toLowerCase()}`)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                {/* Dashboard icon */}
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </button>

                                            <button
                                                onClick={() => router.push(`/dashboard/${user?.role?.toLowerCase()}/profile`)}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <User className="w-4 h-4" />
                                                My Profile
                                            </button>

                                            <hr className="my-2 border-gray-200 dark:border-gray-700" />

                                            <button
                                                onClick={handleLogout}
                                                disabled={isLoggingOut}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                                            </button>
                                        </div>
                                    )}

                                </div>

                            ) : (
                                <Link href="/signin">
                                    <Button className="bg-linear-to-r from-orange-400 to-red-600 cursor-pointer hover:bg-red-700 text-white px-6">
                                        Sign In
                                    </Button>
                                </Link>
                            )
                            }
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden bg-linear-to-r from-orange-400 to-red-600 text-white p-2 hover:bg-red-700 rounded-lg transition-colors z-50"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${isMobileMenuOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-[70] md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">

                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <Logo/>

                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
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
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 font-medium group ${isActive(link.href)
                                        ? "text-white bg-gradient-to-r from-red-600 to-orange-600 shadow-lg shadow-red-500/20"
                                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                        }`}
                                >
                                    <span className="flex-1">{link.name}</span>

                                    <svg
                                        className={`w-4 h-4 transform transition-all ${isActive(link.href)
                                            ? "text-white"
                                            : "text-gray-500 group-hover:text-red-500 group-hover:translate-x-1"
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

                    {/* Drawer Footer */}
                    <div className="p-6 border-t border-gray-700 space-y-3 bg-gray-900/50">
                        {isAuthenticated ? (
                            <>
                                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                                        Dashboard
                                    </Button>
                                </Link>

                                <Button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg shadow-red-500/20 disabled:opacity-50"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    {isLoggingOut ? "Logging out..." : "Logout"}
                                </Button>
                            </>
                        ) : (
                            <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg shadow-red-500/20">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
}