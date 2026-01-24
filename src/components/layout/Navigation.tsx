'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu, X, Search, MapPin, Calendar, Users, Compass,
    ChevronDown, User, Heart, LogOut, Map, Home, Coffee,
    Mountain, Newspaper, Clock
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

/* ============================================
   MAIN NAVIGATION COMPONENT
   Site-wide Navigation
   ============================================ */

const navLinks = [
    {
        label: 'Explore',
        href: '#',
        children: [
            { label: 'Interactive Map', href: '/map', icon: <Map className="w-4 h-4" /> },
            { label: 'All Experiences', href: '/experiences', icon: <Compass className="w-4 h-4" /> },
            { label: 'Heritage Trails', href: '/trails', icon: <Mountain className="w-4 h-4" /> },
            { label: 'Districts', href: '/districts', icon: <MapPin className="w-4 h-4" /> },
            { label: 'Collections', href: '/collections', icon: <Heart className="w-4 h-4" /> },
        ]
    },
    {
        label: 'Plan',
        href: '#',
        children: [
            { label: 'Trip Planner', href: '/plan', icon: <Calendar className="w-4 h-4" /> },
            { label: 'Best Time to Visit', href: '/seasonality', icon: <Clock className="w-4 h-4" /> },
            { label: 'How to Reach', href: '/how-to-reach', icon: <MapPin className="w-4 h-4" /> },
        ]
    },
    {
        label: 'Connect',
        href: '#',
        children: [
            { label: 'Local Guides', href: '/guides', icon: <Users className="w-4 h-4" /> },
            { label: 'Community Hosts', href: '/communities', icon: <Home className="w-4 h-4" /> },
            { label: 'Artisans', href: '/artisans', icon: <Coffee className="w-4 h-4" /> },
            { label: 'Where to Stay', href: '/stays', icon: <Home className="w-4 h-4" /> },
        ]
    },
    { label: 'Festivals', href: '/festivals' },
    { label: 'Articles', href: '/articles' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    // Check if page has transparent header (homepage)
    const hasTransparentHeader = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const navBackground = hasTransparentHeader && !isScrolled
        ? 'transparent'
        : 'var(--glass-bg)';

    const textColor = hasTransparentHeader && !isScrolled
        ? 'white'
        : 'var(--text-primary)';

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: navBackground,
                    backdropFilter: isScrolled || !hasTransparentHeader ? 'blur(16px)' : 'none',
                    borderBottom: isScrolled || !hasTransparentHeader
                        ? '1px solid var(--border-light)'
                        : 'none'
                }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: hasTransparentHeader && !isScrolled
                                        ? 'rgba(255,255,255,0.2)'
                                        : 'var(--gradient-tea)'
                                }}
                            >
                                <span className="text-lg font-bold text-white">🦏</span>
                            </div>
                            <span
                                className="text-xl font-bold hidden sm:block"
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    color: textColor
                                }}
                            >
                                RhinoRoam
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <div key={link.label} className="relative">
                                    {link.children ? (
                                        <button
                                            onMouseEnter={() => setActiveDropdown(link.label)}
                                            onMouseLeave={() => setActiveDropdown(null)}
                                            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                                            style={{ color: textColor }}
                                        >
                                            {link.label}
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${pathname === link.href ? 'font-semibold' : ''
                                                }`}
                                            style={{
                                                color: textColor,
                                                background: pathname === link.href
                                                    ? (hasTransparentHeader && !isScrolled
                                                        ? 'rgba(255,255,255,0.1)'
                                                        : 'var(--bg-secondary)')
                                                    : 'transparent'
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    )}

                                    {/* Dropdown */}
                                    {link.children && activeDropdown === link.label && (
                                        <div
                                            className="absolute top-full left-0 mt-2 w-56 rounded-2xl shadow-xl overflow-hidden animate-scale-in"
                                            style={{ background: 'var(--bg-card)' }}
                                            onMouseEnter={() => setActiveDropdown(link.label)}
                                            onMouseLeave={() => setActiveDropdown(null)}
                                        >
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                                                    style={{
                                                        color: 'var(--text-primary)',
                                                        background: pathname === child.href ? 'var(--bg-secondary)' : 'transparent'
                                                    }}
                                                >
                                                    <span style={{ color: 'var(--tea-garden)' }}>{child.icon}</span>
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <button
                                className="p-2 rounded-xl transition-colors"
                                style={{
                                    color: textColor,
                                    background: hasTransparentHeader && !isScrolled
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'var(--bg-secondary)'
                                }}
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* User Menu */}
                            {status === 'authenticated' ? (
                                <div className="relative group">
                                    <button
                                        className="flex items-center gap-2 p-2 rounded-xl transition-colors"
                                        style={{
                                            color: textColor,
                                            background: hasTransparentHeader && !isScrolled
                                                ? 'rgba(255,255,255,0.1)'
                                                : 'var(--bg-secondary)'
                                        }}
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="hidden md:block text-sm font-medium">
                                            {session?.user?.name?.split(' ')[0]}
                                        </span>
                                    </button>

                                    {/* Dropdown */}
                                    <div
                                        className="absolute top-full right-0 mt-2 w-48 rounded-2xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                                        style={{ background: 'var(--bg-card)' }}
                                    >
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            <User className="w-4 h-4" />
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/saved"
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                                            style={{ color: 'var(--text-primary)' }}
                                        >
                                            <Heart className="w-4 h-4" />
                                            Saved
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-secondary transition-colors"
                                            style={{ color: 'var(--error)' }}
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href="/auth/signin"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                                    style={{
                                        color: hasTransparentHeader && !isScrolled ? 'white' : 'var(--tea-deep)',
                                        background: hasTransparentHeader && !isScrolled
                                            ? 'rgba(255,255,255,0.2)'
                                            : 'var(--bg-secondary)'
                                    }}
                                >
                                    Sign In
                                </Link>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 rounded-xl transition-colors"
                                style={{
                                    color: textColor,
                                    background: hasTransparentHeader && !isScrolled
                                        ? 'rgba(255,255,255,0.1)'
                                        : 'var(--bg-secondary)'
                                }}
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div
                        className="lg:hidden animate-slide-up"
                        style={{
                            background: 'var(--bg-card)',
                            borderTop: '1px solid var(--border-light)'
                        }}
                    >
                        <div className="container-custom py-4 space-y-1">
                            {navLinks.map((link) => (
                                <div key={link.label}>
                                    {link.children ? (
                                        <>
                                            <button
                                                onClick={() => setActiveDropdown(
                                                    activeDropdown === link.label ? null : link.label
                                                )}
                                                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {link.label}
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            {activeDropdown === link.label && (
                                                <div className="ml-4 space-y-1 mb-2">
                                                    {link.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            className="flex items-center gap-3 px-4 py-2 rounded-xl"
                                                            style={{
                                                                color: 'var(--text-secondary)',
                                                                background: pathname === child.href ? 'var(--bg-secondary)' : 'transparent'
                                                            }}
                                                        >
                                                            {child.icon}
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="block px-4 py-3 rounded-xl"
                                            style={{
                                                color: 'var(--text-primary)',
                                                background: pathname === link.href ? 'var(--bg-secondary)' : 'transparent'
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </div>
                            ))}

                            {status !== 'authenticated' && (
                                <div className="pt-4 mt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                                    <Link
                                        href="/auth/signin"
                                        className="btn-primary w-full justify-center"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer for fixed nav */}
            {!hasTransparentHeader && <div className="h-16 md:h-20" />}
        </>
    );
}
