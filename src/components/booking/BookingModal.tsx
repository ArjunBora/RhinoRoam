'use client';

import { useState } from 'react';
import { X, Calendar, Users, CreditCard, Check, Loader2, AlertCircle } from 'lucide-react';

/* ============================================
   BOOKING MODAL COMPONENT
   For experience reservations
   ============================================ */

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    experience: {
        id: string;
        title: string;
        price: number;
        priceType: string;
        groupSizeMin: number;
        groupSizeMax: number;
        host: {
            name: string;
        };
    };
}

export default function BookingModal({ isOpen, onClose, experience }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const [formData, setFormData] = useState({
        date: '',
        guests: 2,
        name: '',
        email: '',
        phone: '',
        specialRequests: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const totalPrice = experience.price * formData.guests;
    const serviceFee = Math.round(totalPrice * 0.1);
    const grandTotal = totalPrice + serviceFee;

    const validateStep = (stepNum: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (stepNum === 1) {
            if (!formData.date) {
                newErrors.date = 'Please select a date';
            }
        }

        if (stepNum === 2) {
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }
            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Invalid email format';
            }
            if (!formData.phone) {
                newErrors.phone = 'Phone is required';
            } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
                newErrors.phone = 'Invalid phone number';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(2)) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // TODO: Replace with actual API call
            // const response = await fetch('/api/bookings', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     experienceId: experience.id,
            //     ...formData,
            //     totalAmount: grandTotal,
            //   }),
            // });

            setIsComplete(true);
        } catch (error) {
            console.error('Booking failed:', error);
            setErrors({ submit: 'Booking failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setIsComplete(false);
        setFormData({
            date: '',
            guests: 2,
            name: '',
            email: '',
            phone: '',
            specialRequests: '',
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-lg rounded-3xl overflow-hidden animate-scale-in"
                style={{ background: 'var(--bg-card)' }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: 'var(--bg-secondary)' }}
                >
                    <X className="w-5 h-5" />
                </button>

                {isComplete ? (
                    // Success State
                    <div className="p-8 text-center">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                            style={{ background: 'rgba(46, 125, 50, 0.1)' }}
                        >
                            <Check className="w-10 h-10" style={{ color: 'var(--success)' }} />
                        </div>
                        <h2
                            className="text-2xl font-bold mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Booking Confirmed!
                        </h2>
                        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Your reservation for <strong>{experience.title}</strong> has been confirmed.
                            Check your email for details.
                        </p>
                        <div
                            className="p-4 rounded-xl mb-6 text-left"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span style={{ color: 'var(--text-muted)' }}>Date</span>
                                    <p className="font-semibold">
                                        {new Date(formData.date).toLocaleDateString('en-IN', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)' }}>Guests</span>
                                    <p className="font-semibold">{formData.guests} people</p>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)' }}>Total Paid</span>
                                    <p className="font-semibold" style={{ color: 'var(--tea-deep)' }}>
                                        ₹{grandTotal.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--text-muted)' }}>Booking ID</span>
                                    <p className="font-semibold">AXC-{Date.now().toString(36).toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="btn-primary w-full"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div
                            className="p-6 pb-4"
                            style={{ borderBottom: '1px solid var(--border-light)' }}
                        >
                            <h2
                                className="text-xl font-bold pr-8"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Book: {experience.title}
                            </h2>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                Hosted by {experience.host.name}
                            </p>

                            {/* Progress */}
                            <div className="flex items-center gap-2 mt-4">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex items-center">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'text-white' : ''
                                                }`}
                                            style={{
                                                background: step >= s ? 'var(--gradient-tea)' : 'var(--bg-secondary)',
                                                color: step >= s ? 'white' : 'var(--text-muted)'
                                            }}
                                        >
                                            {step > s ? <Check className="w-4 h-4" /> : s}
                                        </div>
                                        {s < 3 && (
                                            <div
                                                className="w-12 h-1 mx-1"
                                                style={{
                                                    background: step > s ? 'var(--tea-garden)' : 'var(--border-light)'
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {step === 1 && (
                                <div className="space-y-6 animate-fade-in">
                                    <h3 className="font-semibold">Select Date & Guests</h3>

                                    {/* Date */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            Select Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="input-field"
                                        />
                                        {errors.date && (
                                            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                                                {errors.date}
                                            </p>
                                        )}
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            <Users className="w-4 h-4 inline mr-2" />
                                            Number of Guests
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    guests: Math.max(experience.groupSizeMin, prev.guests - 1)
                                                }))}
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                                                style={{ background: 'var(--bg-secondary)' }}
                                                disabled={formData.guests <= experience.groupSizeMin}
                                            >
                                                -
                                            </button>
                                            <span className="text-2xl font-bold w-12 text-center">{formData.guests}</span>
                                            <button
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    guests: Math.min(experience.groupSizeMax, prev.guests + 1)
                                                }))}
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                                                style={{ background: 'var(--bg-secondary)' }}
                                                disabled={formData.guests >= experience.groupSizeMax}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                                            {experience.groupSizeMin}-{experience.groupSizeMax} guests allowed
                                        </p>
                                    </div>

                                    {/* Price Summary */}
                                    <div
                                        className="p-4 rounded-xl"
                                        style={{ background: 'var(--bg-secondary)' }}
                                    >
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>₹{experience.price.toLocaleString()} × {formData.guests} guests</span>
                                            <span>₹{totalPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Service fee</span>
                                            <span>₹{serviceFee.toLocaleString()}</span>
                                        </div>
                                        <div
                                            className="flex justify-between font-semibold pt-2"
                                            style={{ borderTop: '1px solid var(--border-light)' }}
                                        >
                                            <span>Total</span>
                                            <span style={{ color: 'var(--tea-deep)' }}>₹{grandTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-fade-in">
                                    <h3 className="font-semibold">Your Details</h3>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="Enter your full name"
                                            className="input-field"
                                        />
                                        {errors.name && (
                                            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            placeholder="your@email.com"
                                            className="input-field"
                                        />
                                        {errors.email && (
                                            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone *</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            placeholder="+91 99999 99999"
                                            className="input-field"
                                        />
                                        {errors.phone && (
                                            <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Special Requests */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                                        <textarea
                                            value={formData.specialRequests}
                                            onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                                            placeholder="Dietary requirements, accessibility needs, etc."
                                            className="input-field min-h-[80px]"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 animate-fade-in">
                                    <h3 className="font-semibold">Confirm & Pay</h3>

                                    {/* Summary */}
                                    <div
                                        className="p-4 rounded-xl"
                                        style={{ background: 'var(--bg-secondary)' }}
                                    >
                                        <h4 className="font-medium mb-3">{experience.title}</h4>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>Date</span>
                                                <p className="font-medium">
                                                    {formData.date
                                                        ? new Date(formData.date).toLocaleDateString('en-IN', {
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })
                                                        : '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>Guests</span>
                                                <p className="font-medium">{formData.guests} people</p>
                                            </div>
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>Name</span>
                                                <p className="font-medium">{formData.name}</p>
                                            </div>
                                            <div>
                                                <span style={{ color: 'var(--text-muted)' }}>Contact</span>
                                                <p className="font-medium">{formData.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    <div>
                                        <h4 className="font-medium mb-3 flex items-center gap-2">
                                            <CreditCard className="w-5 h-5" />
                                            Payment
                                        </h4>
                                        <div
                                            className="p-4 rounded-xl border-2 border-dashed text-center"
                                            style={{ borderColor: 'var(--border-light)' }}
                                        >
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                Payment integration coming soon. For now, payment will be collected by the host.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div
                                        className="p-4 rounded-xl"
                                        style={{ background: 'rgba(27, 77, 46, 0.08)' }}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">Total to Pay</span>
                                            <span className="text-2xl font-bold" style={{ color: 'var(--tea-deep)' }}>
                                                ₹{grandTotal.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {errors.submit && (
                                        <div
                                            className="flex items-center gap-2 p-3 rounded-xl"
                                            style={{ background: 'rgba(198, 40, 40, 0.1)', color: 'var(--error)' }}
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                            {errors.submit}
                                        </div>
                                    )}

                                    {/* Terms */}
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        By confirming, you agree to the experience's cancellation policy and our Terms of Service.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div
                            className="p-6 pt-4 flex gap-4"
                            style={{ borderTop: '1px solid var(--border-light)' }}
                        >
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(prev => prev - 1)}
                                    className="btn-ghost flex-1"
                                    disabled={isSubmitting}
                                >
                                    Back
                                </button>
                            )}

                            {step < 3 ? (
                                <button
                                    onClick={handleNext}
                                    className="btn-primary flex-1"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="btn-primary flex-1"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>Confirm Booking</>
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
