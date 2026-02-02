'use client';

import { useState } from 'react';
import { StarRating } from './StarRating';
import { Loader2 } from 'lucide-react';

interface ReviewFormProps {
    onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }
        if (comment.trim().length < 10) {
            setError('Please write at least 10 characters');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await onSubmit({ rating, comment });
            setIsSuccess(true);
            setRating(0);
            setComment('');
            // Reset success message after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (err) {
            setError('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[var(--bg-secondary)]/30 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 font-heading">Write a Review</h3>

            {isSuccess ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center">
                    Thank you for your review! It has been submitted successfully.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Rating</label>
                        <StarRating
                            rating={rating}
                            onRatingChange={setRating}
                            readonly={false}
                            size={28}
                            className="mb-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Your Experience</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this host..."
                            className="input-field w-full min-h-[120px] resize-none"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full disabled:opacity-70"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Submitting...
                            </>
                        ) : 'Submit Review'}
                    </button>
                </form>
            )}
        </div>
    );
}
