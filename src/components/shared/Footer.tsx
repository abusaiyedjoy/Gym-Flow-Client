import Link from "next/link";
import {
    Dumbbell,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

const footerLinks = {
    company: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" },
    ],
    services: [
        { name: "Membership Plans", href: "#" },
        { name: "Personal Training", href: "#" },
        { name: "Group Classes", href: "#" },
        { name: "Online Coaching", href: "#" },
    ],
    support: [
        { name: "Help Center", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
    ],
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="p-2 bg-red-600 rounded-lg">
                                <Dumbbell className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">
                                Gym<span className="text-red-600">Flow</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Transform your fitness journey with GymFlow. Professional gym
                            management made simple with cutting-edge technology and
                            expert guidance.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-red-500" />
                                <a
                                    href="mailto:info@gymflow.com"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    gymflow@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-red-500" />
                                <a
                                    href="tel:+1234567890"
                                    className="hover:text-red-500 transition-colors"
                                >
                                    +8801988084185
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-red-500" />
                                <span>Foy's Lake, Chattogram</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-orange-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} GymFlow. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors group"
                                    >
                                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                    </a>
                                );
                            })}
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center space-x-6 text-sm">
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-orange-500 transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-orange-500 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
