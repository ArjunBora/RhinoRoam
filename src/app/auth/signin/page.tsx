"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Compass,
    Mail,
    Lock,
    User,
    ArrowRight,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";

function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const error = searchParams.get("error");

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setFormError("");

        try {
            if (isLogin) {
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    setFormError("Invalid email or password");
                } else {
                    router.push(callbackUrl);
                    router.refresh();
                }
            } else {
                // Register
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (!data.success) {
                    setFormError(data.error || "Registration failed");
                } else {
                    // Auto login after registration
                    await signIn("credentials", {
                        email: formData.email,
                        password: formData.password,
                        redirect: false,
                    });
                    router.push(callbackUrl);
                    router.refresh();
                }
            }
        } catch {
            setFormError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl });
    };

    return (
        <div className="w-full max-w-md">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-heritage flex items-center justify-center">
                    <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold font-heading">GUenARK</span>
            </Link>

            {/* Heading */}
            <h1 className="text-3xl font-heading font-bold mb-2">
                {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
                {isLogin
                    ? "Sign in to continue your heritage journey"
                    : "Join us to discover India's cultural treasures"}
            </p>

            {/* Error Messages */}
            {(error || formError) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {formError || "Authentication failed. Please try again."}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="Your name"
                                className="input-field pl-12"
                                required={!isLogin}
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="you@example.com"
                            className="input-field pl-12"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            placeholder="••••••••"
                            className="input-field pl-12 pr-12"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded" />
                            <span>Remember me</span>
                        </label>
                        <Link
                            href="/auth/forgot-password"
                            className="text-[var(--heritage-gold)] hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-4 disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {isLogin ? "Sign In" : "Create Account"}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--border-light)]" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[var(--bg-primary)] text-[var(--text-muted)]">
                        or continue with
                    </span>
                </div>
            </div>

            {/* Social Login */}
            <button
                onClick={handleGoogleSignIn}
                className="w-full btn-secondary py-4"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Continue with Google
            </button>

            {/* Toggle */}
            <p className="text-center mt-8 text-[var(--text-secondary)]">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setFormError("");
                    }}
                    className="text-[var(--heritage-gold)] font-medium hover:underline"
                >
                    {isLogin ? "Sign up" : "Sign in"}
                </button>
            </p>
        </div>
    );
}

function LoadingFallback() {
    return (
        <div className="w-full max-w-md flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--heritage-gold)]" />
        </div>
    );
}

export default function SignInPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <Suspense fallback={<LoadingFallback />}>
                    <SignInForm />
                </Suspense>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=1600&q=80"
                    alt="Heritage"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <blockquote className="text-2xl font-heading font-medium leading-relaxed mb-4">
                        &ldquo;Traveling – it leaves you speechless, then turns you into a
                        storyteller.&rdquo;
                    </blockquote>
                    <p className="text-white/80">— Ibn Battuta</p>
                </div>
            </div>
        </div>
    );
}
