"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Map,
    Compass,
    Home,
    Users,
    BookOpen,
    MessageCircle,
    Menu,
    X,
    Search,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore Map", icon: Map },
    { href: "/destinations", label: "Destinations", icon: Compass },
    { href: "/community", label: "Community", icon: Users },
    { href: "/stories", label: "Stories", icon: BookOpen },
];

export function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "nav-header transition-all duration-300",
                isScrolled && "shadow-md"
            )}
        >
            <div className="container-custom h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-heritage flex items-center justify-center">
                        <Compass className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold font-heading group-hover:text-gradient-heritage transition-colors">
                        GUenARK
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn("nav-link", isActive && "active")}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Search Button */}
                    <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                        <Search className="w-5 h-5 text-[var(--text-secondary)]" />
                    </button>

                    {/* AI Assistant Button */}
                    <button className="hidden sm:flex btn-primary py-2 px-4 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        <span>Ask AI</span>
                    </button>

                    {/* User Menu */}
                    <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                        <User className="w-5 h-5 text-[var(--text-secondary)]" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg-card)] border-t border-[var(--border-light)] shadow-lg animate-slide-down">
                    <nav className="container-custom py-4 flex flex-col gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn("nav-link", isActive && "active")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                        <button className="btn-primary mt-4">
                            <MessageCircle className="w-4 h-4" />
                            <span>Ask AI Assistant</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export function Footer() {
    return (
        <footer className="bg-[var(--neutral-900)] text-[var(--text-inverse)] py-16">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-heritage flex items-center justify-center">
                                <Compass className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold font-heading">GUenARK</span>
                        </Link>
                        <p className="text-[var(--neutral-400)] text-sm leading-relaxed">
                            Discover India&apos;s rich heritage while supporting local communities
                            and promoting sustainable tourism.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm text-[var(--neutral-400)]">
                            <li><Link href="/destinations" className="hover:text-white transition-colors">All Destinations</Link></li>
                            <li><Link href="/explore" className="hover:text-white transition-colors">Interactive Map</Link></li>
                            <li><Link href="/trails" className="hover:text-white transition-colors">Heritage Trails</Link></li>
                            <li><Link href="/plan" className="hover:text-white transition-colors">Trip Planner</Link></li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="font-semibold mb-4">Community</h4>
                        <ul className="space-y-2 text-sm text-[var(--neutral-400)]">
                            <li><Link href="/community" className="hover:text-white transition-colors">Village Tourism</Link></li>
                            <li><Link href="/artisans" className="hover:text-white transition-colors">Local Artisans</Link></li>
                            <li><Link href="/guides" className="hover:text-white transition-colors">Hire a Guide</Link></li>
                            <li><Link href="/stories" className="hover:text-white transition-colors">Travel Stories</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-[var(--neutral-400)]">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--neutral-700)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[var(--neutral-500)]">
                        © 2024 GUenARK. Aligned with SDG 8 & SDG 11. Built for sustainable tourism.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[var(--neutral-500)]">
                        <span>🌍 Sustainable Tourism</span>
                        <span>🤝 Community First</span>
                        <span>🏛️ Heritage Preservation</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
