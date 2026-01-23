"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Settings, BookOpen, Heart, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function UserMenu() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (status === "loading") {
        return (
            <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] animate-pulse" />
        );
    }

    if (!session) {
        return (
            <Link
                href="/auth/signin"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
                <User className="w-4 h-4" />
                Sign In
            </Link>
        );
    }

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
            >
                {session.user?.image ? (
                    <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-heritage flex items-center justify-center text-white text-sm font-medium">
                        {session.user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                )}
                <ChevronDown className={cn(
                    "w-4 h-4 text-[var(--text-muted)] transition-transform",
                    isOpen && "rotate-180"
                )} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border-light)] overflow-hidden animate-scale-in z-50">
                    {/* User Info */}
                    <div className="p-4 border-b border-[var(--border-light)]">
                        <p className="font-medium">{session.user?.name}</p>
                        <p className="text-sm text-[var(--text-muted)] truncate">{session.user?.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                        <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-sm">My Profile</span>
                        </Link>
                        <Link
                            href="/my-itineraries"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-sm">My Itineraries</span>
                        </Link>
                        <Link
                            href="/saved"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Heart className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-sm">Saved Places</span>
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-sm">Settings</span>
                        </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="p-2 border-t border-[var(--border-light)]">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
