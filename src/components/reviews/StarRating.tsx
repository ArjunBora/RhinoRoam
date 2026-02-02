import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    className?: string;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
}

export function StarRating({
    rating,
    maxRating = 5,
    size = 20,
    className = "",
    onRatingChange,
    readonly = true
}: StarRatingProps) {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        const isFull = i <= rating;
        const isHalf = !isFull && i - 0.5 <= rating;

        stars.push(
            <button
                key={i}
                type={readonly ? "button" : "button"}
                onClick={() => !readonly && onRatingChange?.(i)}
                disabled={readonly}
                className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
            >
                {isFull ? (
                    <Star
                        size={size}
                        className={`fill-[var(--muga-gold)] text-[var(--muga-gold)]`}
                    />
                ) : isHalf ? (
                    <div className="relative">
                        <Star
                            size={size}
                            className="text-gray-300"
                        />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <StarHalf
                                size={size}
                                className={`fill-[var(--muga-gold)] text-[var(--muga-gold)]`}
                            />
                        </div>
                    </div>
                ) : (
                    <Star
                        size={size}
                        className="text-gray-300"
                    />
                )}
            </button>
        );
    }

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {stars}
        </div>
    );
}
