"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
    Map,
    Compass,
    Home,
    Users,
    BookOpen,
    Menu,
    X,
    Search,
    User,
    Calendar,
    Mountain,
    MapPin,
    Sparkles,
    Grid3X3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signIn } from "next-auth/react";

// Navigation links matching actual site pages
const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore Map", icon: Map },
    { href: "/ai-trip-planner", label: "AI Trip Planner", icon: Sparkles },
    { href: "/experiences", label: "Experiences", icon: Compass },
    { href: "/collections", label: "Collections", icon: Grid3X3 },
    { href: "/stories", label: "Travel Stories", icon: BookOpen },
    { href: "/trails", label: "Heritage Trails", icon: Mountain },
    { href: "/festivals", label: "Festivals", icon: Calendar },
    { href: "/districts", label: "Districts", icon: MapPin },
    { href: "/communities", label: "Communities", icon: Users },
];

export function Header() {
    const { data: session, status } = useSession();
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

    // Close menu on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when menu is open and dispatch event for ChatWidget
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        // Dispatch custom event to notify ChatWidget about menu state
        window.dispatchEvent(new CustomEvent('navigationMenuToggle', { detail: { isOpen: isMobileMenuOpen } }));
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const toggleMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "nav-header transition-all duration-300",
                    isScrolled && "shadow-md"
                )}
                role="banner"
            >
                <div className="container-custom h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" aria-label="RhinoRoam Home">
                        <Image
                            src="/logo.png"
                            alt="RhinoRoam Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                            unoptimized
                        />
                        <Image
                            src="/name-style.png"
                            alt="RhinoRoam"
                            width={120}
                            height={28}
                            className="object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.slice(0, 5).map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                                    pathname === link.href
                                        ? "bg-[var(--tea-deep)] text-white shadow-sm"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--tea-deep)]"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">


                        {/* Auth Button */}
                        {status === "unauthenticated" ? (
                            <button
                                onClick={() => signIn()}
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--tea-deep)] text-white text-sm font-semibold hover:bg-[var(--forest-kaziranga)] transition-all transform hover:scale-105 active:scale-95 shadow-sm"
                            >
                                <User className="w-4 h-4" />
                                Sign In
                            </button>
                        ) : (
                            <Link
                                href="/profile"
                                className="p-2.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
                                aria-label="User account"
                            >
                                <User className="w-5 h-5 text-[var(--text-secondary)]" aria-hidden="true" />
                            </Link>
                        )}

                        {/* Hamburger Menu Toggle - Always visible and prominent */}
                        <button
                            className={cn(
                                "p-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95",
                                "bg-[var(--tea-deep)] text-white hover:bg-[var(--forest-kaziranga)]",
                                "border-none shadow-sm"
                            )}
                            onClick={toggleMenu}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <Menu className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Slide-in Menu Overlay - z-[1000] to be above Leaflet map */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300",
                    isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Mobile Slide-in Menu Panel - z-[1001] to be above overlay */}
            <aside
                id="mobile-menu"
                className={cn(
                    "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[var(--bg-card)] shadow-2xl z-[1001]",
                    "transform transition-transform duration-300 ease-out",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-light)]">
                    <Link href="/" className="flex items-center gap-2" onClick={closeMenu} aria-label="RhinoRoam Home">
                        <Image
                            src="/logo.png"
                            alt="RhinoRoam Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                            unoptimized
                        />
                        <Image
                            src="/name-style.png"
                            alt="RhinoRoam"
                            width={120}
                            height={28}
                            className="object-contain"
                        />
                    </Link>
                    <button
                        className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Menu Links */}
                <nav className="p-4 flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
                    {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                                    "hover:bg-[var(--bg-secondary)] hover:translate-x-1",
                                    isActive && "bg-[var(--tea-deep)] text-white shadow-md font-semibold"
                                )}
                                onClick={closeMenu}
                                aria-current={isActive ? "page" : undefined}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                }}
                            >
                                <Icon className="w-5 h-5" aria-hidden="true" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}

                    {/* Auth Section for Mobile */}
                    <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
                        {status === "unauthenticated" ? (
                            <button
                                onClick={() => {
                                    closeMenu();
                                    signIn();
                                }}
                                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold bg-[var(--bg-secondary)] text-[var(--tea-deep)] hover:bg-[var(--border-light)] transition-all"
                            >
                                <User className="w-5 h-5 font-bold" />
                                <span>Sign In</span>
                            </button>
                        ) : (
                            <Link
                                href="/profile"
                                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
                                onClick={closeMenu}
                            >
                                <User className="w-5 h-5" />
                                <span>My Account</span>
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Menu Footer - Branding */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border-light)] bg-[var(--bg-secondary)]">
                    <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
                        <Image src="/logo.png" alt="" width={16} height={16} className="object-contain" unoptimized />
                        <span>RhinoRoam • Roam Assam with the Locals</span>
                    </div>
                </div>
            </aside>
        </>
    );
}


export function Footer() {
    return (
        <footer className="bg-[var(--neutral-900)] text-[var(--text-inverse)] py-16">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image
                                src="/logo.png"
                                alt="RhinoRoam Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                                unoptimized
                            />
                            <Image
                                src="/name-style.png"
                                alt="RhinoRoam"
                                width={120}
                                height={28}
                                className="object-contain invert"
                            />
                        </Link>
                        <p className="text-[var(--neutral-400)] text-sm leading-relaxed">
                            Discover Assam&apos;s rich heritage while supporting local communities
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
                            <li><Link href="/ai-trip-planner" className="hover:text-white transition-colors">AI Trip Planner</Link></li>
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
                        © 2026 RhinoRoam. Roam Assam with the Locals. Built for sustainable tourism.
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
