import { StarRating } from './StarRating';
import { User, Calendar } from 'lucide-react';

export interface Review {
    id: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    date: string;
    comment: string;
}

interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 rounded-2xl">
                <p className="text-[var(--text-secondary)]">No reviews yet. Be the first to share your experience!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-[var(--border-light)] pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
                                {review.userAvatar ? (
                                    <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-5 h-5 text-[var(--text-secondary)]" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold">{review.userName}</h4>
                                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </div>
                        <StarRating rating={review.rating} size={16} />
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed pl-13 ml-13">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
}
