import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            icon: Icon,
            iconPosition = "left",
            isLoading,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary:
                "bg-gradient-heritage text-white shadow-[0_4px_14px_rgba(212,165,116,0.4)] hover:shadow-[0_6px_20px_rgba(212,165,116,0.5)] hover:-translate-y-0.5 active:translate-y-0",
            secondary:
                "bg-transparent border-2 border-[var(--border-medium)] text-[var(--text-primary)] hover:border-[var(--heritage-gold)] hover:text-[var(--heritage-gold)]",
            ghost:
                "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
            danger:
                "bg-[var(--error)] text-white hover:bg-red-600 shadow-[0_4px_14px_rgba(239,68,68,0.4)]",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
                        {children}
                        {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

interface CardProps {
    className?: string;
    children: React.ReactNode;
    variant?: "default" | "glass" | "heritage";
    hover?: boolean;
}

export function Card({
    className,
    children,
    variant = "default",
    hover = true,
}: CardProps) {
    const variants = {
        default: "bg-[var(--bg-card)] rounded-2xl shadow-[var(--shadow-md)]",
        glass: "glass-card",
        heritage: "heritage-card",
    };

    return (
        <div
            className={cn(
                variants[variant],
                hover && "transition-all duration-300 hover:shadow-[var(--shadow-xl)] hover:-translate-y-1",
                className
            )}
        >
            {children}
        </div>
    );
}

interface BadgeProps {
    className?: string;
    children: React.ReactNode;
    variant?: "heritage" | "nature" | "verified" | "default";
    size?: "sm" | "md";
}

export function Badge({
    className,
    children,
    variant = "default",
    size = "md",
}: BadgeProps) {
    const variants = {
        heritage: "bg-[rgba(212,165,116,0.15)] text-[var(--heritage-bronze)]",
        nature: "bg-[rgba(46,139,139,0.15)] text-[var(--nature-teal)]",
        verified: "bg-[rgba(34,197,94,0.15)] text-[var(--success)]",
        default: "bg-[var(--bg-secondary)] text-[var(--text-secondary)]",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 font-semibold rounded-full uppercase tracking-wider",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon: Icon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {Icon && (
                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "input-field",
                            Icon && "pl-12",
                            error && "border-[var(--error)] focus:border-[var(--error)] focus:shadow-[0_0_0_4px_rgba(239,68,68,0.15)]",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-[var(--error)]">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "rectangular" }: SkeletonProps) {
    const variants = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-xl",
    };

    return (
        <div
            className={cn(
                "animate-pulse bg-[var(--bg-secondary)]",
                variants[variant],
                className
            )}
        />
    );
}

interface RatingProps {
    value: number;
    maxValue?: number;
    size?: "sm" | "md" | "lg";
    showValue?: boolean;
}

export function Rating({ value, maxValue = 5, size = "md", showValue = true }: RatingProps) {
    const sizes = {
        sm: "text-sm gap-0.5",
        md: "text-base gap-1",
        lg: "text-lg gap-1",
    };

    return (
        <div className={cn("flex items-center", sizes[size])}>
            {Array.from({ length: maxValue }).map((_, i) => (
                <span
                    key={i}
                    className={i < Math.floor(value) ? "text-[var(--heritage-gold)]" : "text-[var(--neutral-300)]"}
                >
                    ★
                </span>
            ))}
            {showValue && (
                <span className="ml-1 text-[var(--text-secondary)] font-medium">
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    );
}
