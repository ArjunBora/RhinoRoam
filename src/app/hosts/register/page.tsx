'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft, MapPin, Star, Check, ArrowRight, Users,
    Globe, BadgeCheck, Wallet, Heart, Camera, Upload,
    Loader2, AlertCircle
} from 'lucide-react';

/* ============================================
   BECOME A HOST PAGE
   Host registration flow
   ============================================ */

const hostTypes = [
    {
        id: 'guide',
        label: 'Local Guide',
        description: 'Share your knowledge of local history, culture, and hidden gems',
        icon: <MapPin className="w-6 h-6" />,
    },
    {
        id: 'homestay',
        label: 'Homestay Owner',
        description: 'Welcome guests into your home for authentic village experiences',
        icon: <Heart className="w-6 h-6" />,
    },
    {
        id: 'artisan',
        label: 'Artisan / Craftsperson',
        description: 'Teach traditional crafts like weaving, pottery, or mask-making',
        icon: <Camera className="w-6 h-6" />,
    },
    {
        id: 'tour_operator',
        label: 'Tour Operator',
        description: 'Organize multi-day tours and curated travel experiences',
        icon: <Globe className="w-6 h-6" />,
    },
    {
        id: 'chef',
        label: 'Local Chef / Cook',
        description: 'Share authentic recipes and cooking experiences',
        icon: <Heart className="w-6 h-6" />,
    },
];

const benefits = [
    {
        icon: <Wallet className="w-8 h-8" />,
        title: 'Earn Extra Income',
        description: 'Turn your local knowledge and skills into a sustainable income source',
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: 'Meet Global Travelers',
        description: 'Connect with curious travelers from around the world',
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: 'Preserve Culture',
        description: 'Help preserve and share Assam\'s rich cultural heritage',
    },
    {
        icon: <BadgeCheck className="w-8 h-8" />,
        title: 'Get Verified',
        description: 'Build trust with our verification badge and superhost status',
    },
];

const districts = [
    'Kamrup Metro (Guwahati)', 'Golaghat (Kaziranga)', 'Majuli', 'Sivasagar',
    'Dibrugarh', 'Jorhat', 'Kokrajhar', 'Karbi Anglong', 'Dima Hasao (Haflong)',
    'Tinsukia', 'Nagaon', 'Sonitpur', 'Other'
];

const communities = [
    'Assamese', 'Mising', 'Bodo', 'Karbi', 'Dimasa', 'Tiwa', 'Rabha',
    'Tai-Ahom', 'Koch-Rajbongshi', 'Deori', 'Sonowal Kachari', 'Other'
];

export default function BecomeHostPage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1
        hostType: '',

        // Step 2
        name: '',
        email: '',
        phone: '',
        district: '',
        community: '',

        // Step 3
        bio: '',
        specialties: '',
        languages: [] as string[],
        yearsExperience: '',

        // Step 4
        agreeTerms: false,
        agreeVerification: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep = (stepNum: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (stepNum === 1) {
            if (!formData.hostType) {
                newErrors.hostType = 'Please select a host type';
            }
        }

        if (stepNum === 2) {
            if (!formData.name) newErrors.name = 'Name is required';
            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Invalid email format';
            }
            if (!formData.phone) newErrors.phone = 'Phone is required';
            if (!formData.district) newErrors.district = 'Please select your district';
        }

        if (stepNum === 3) {
            if (!formData.bio || formData.bio.length < 100) {
                newErrors.bio = 'Please write at least 100 characters about yourself';
            }
            if (!formData.specialties) newErrors.specialties = 'Please list your specialties';
            if (formData.languages.length === 0) newErrors.languages = 'Select at least one language';
        }

        if (stepNum === 4) {
            if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
            if (!formData.agreeVerification) newErrors.agreeVerification = 'You must agree to verification';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // TODO: Replace with actual API call
            // const response = await fetch('/api/hosts', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData),
            // });

            setIsComplete(true);
        } catch (error) {
            console.error('Registration failed:', error);
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleLanguage = (lang: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang]
        }));
    };

    if (isComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center max-w-md">
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                        style={{ background: 'rgba(46, 125, 50, 0.1)' }}
                    >
                        <Check className="w-12 h-12" style={{ color: 'var(--success)' }} />
                    </div>
                    <h1
                        className="text-3xl font-bold mb-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Welcome to RhinoRoam!
                    </h1>
                    <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Your application has been received. Our team will review your profile and
                        get back to you within 48 hours.
                    </p>
                    <div
                        className="p-6 rounded-2xl mb-8 text-left"
                        style={{ background: 'var(--bg-secondary)' }}
                    >
                        <h3 className="font-semibold mb-4">What's Next?</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--tea-garden)' }} />
                                <span>We'll review your application within 48 hours</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--tea-garden)' }} />
                                <span>You'll receive a verification call or video call</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--tea-garden)' }} />
                                <span>Once approved, you can start creating experiences</span>
                            </li>
                        </ul>
                    </div>
                    <Link href="/" className="btn-primary inline-flex">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Hero */}
            <div className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'var(--gradient-tea)' }}>
                <div className="absolute inset-0 tea-pattern-bg opacity-10" />
                <div className="container-custom relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="max-w-2xl">
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Share Your <span style={{ color: 'var(--muga-light)' }}>Assam</span> with the World
                        </h1>
                        <p className="text-lg text-white/80">
                            Join our community of local hosts and help travelers discover the authentic soul of Assam
                        </p>
                    </div>
                </div>
            </div>

            {/* Benefits (show only on step 1) */}
            {step === 1 && (
                <section className="section-padding-sm" style={{ background: 'var(--bg-secondary)' }}>
                    <div className="container-custom">
                        <div className="grid md:grid-cols-4 gap-6">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="text-center p-4">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                        style={{ background: 'var(--bg-card)', color: 'var(--tea-garden)' }}
                                    >
                                        {benefit.icon}
                                    </div>
                                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Form */}
            <section className="section-padding">
                <div className="container-custom max-w-2xl">
                    {/* Progress */}
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'text-white' : ''
                                        }`}
                                    style={{
                                        background: step >= s ? 'var(--gradient-tea)' : 'var(--bg-secondary)',
                                        color: step >= s ? 'white' : 'var(--text-muted)'
                                    }}
                                >
                                    {step > s ? <Check className="w-5 h-5" /> : s}
                                </div>
                                {s < 4 && (
                                    <div
                                        className="w-16 md:w-24 h-1 mx-2"
                                        style={{
                                            background: step > s ? 'var(--tea-garden)' : 'var(--border-light)'
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Host Type */}
                    {step === 1 && (
                        <div className="animate-slide-up">
                            <h2
                                className="text-2xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                What type of host are you?
                            </h2>
                            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                                Select the category that best describes what you'll offer
                            </p>

                            <div className="space-y-4">
                                {hostTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setFormData(prev => ({ ...prev, hostType: type.id }))}
                                        className={`w-full p-6 rounded-2xl text-left transition-all flex items-start gap-4 ${formData.hostType === type.id ? 'ring-2 ring-[var(--tea-garden)] shadow-lg' : ''
                                            }`}
                                        style={{
                                            background: formData.hostType === type.id
                                                ? 'rgba(27, 77, 46, 0.08)'
                                                : 'var(--bg-card)',
                                            border: '1px solid var(--border-light)',
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: formData.hostType === type.id
                                                    ? 'var(--gradient-tea)'
                                                    : 'var(--bg-secondary)',
                                                color: formData.hostType === type.id ? 'white' : 'var(--tea-garden)'
                                            }}
                                        >
                                            {type.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{type.label}</h3>
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                {type.description}
                                            </p>
                                        </div>
                                        {formData.hostType === type.id && (
                                            <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                                                style={{ background: 'var(--tea-garden)' }}
                                            >
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {errors.hostType && (
                                <p className="text-sm mt-4" style={{ color: 'var(--error)' }}>
                                    {errors.hostType}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Step 2: Basic Info */}
                    {step === 2 && (
                        <div className="animate-slide-up">
                            <h2
                                className="text-2xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Tell us about yourself
                            </h2>
                            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                                Basic information for your host profile
                            </p>

                            <div className="space-y-6">
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
                                        <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.name}</p>
                                    )}
                                </div>

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
                                        <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.email}</p>
                                    )}
                                </div>

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
                                        <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">District *</label>
                                    <select
                                        value={formData.district}
                                        onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                                        className="input-field"
                                    >
                                        <option value="">Select your district</option>
                                        {districts.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {errors.district && (
                                        <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.district}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Community (Optional)</label>
                                    <select
                                        value={formData.community}
                                        onChange={(e) => setFormData(prev => ({ ...prev, community: e.target.value }))}
                                        className="input-field"
                                    >
                                        <option value="">Select your community</option>
                                        {communities.map((community) => (
                                            <option key={community} value={community}>{community}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Experience */}
                    {step === 3 && (
                        <div className="animate-slide-up">
                            <h2
                                className="text-2xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Share your expertise
                            </h2>
                            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                                Help guests understand what makes you unique
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        About You * <span style={{ color: 'var(--text-muted)' }}>(min 100 characters)</span>
                                    </label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                        placeholder="Tell us your story. What makes you passionate about hosting? What will guests learn from you?"
                                        className="input-field min-h-[150px]"
                                        rows={5}
                                    />
                                    <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                                        <span>{formData.bio.length}/100 characters</span>
                                        {errors.bio && (
                                            <span style={{ color: 'var(--error)' }}>{errors.bio}</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Your Specialties *</label>
                                    <input
                                        type="text"
                                        value={formData.specialties}
                                        onChange={(e) => setFormData(prev => ({ ...prev, specialties: e.target.value }))}
                                        placeholder="e.g., Wildlife Safari, Tea Tasting, Mask Making"
                                        className="input-field"
                                    />
                                    {errors.specialties && (
                                        <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{errors.specialties}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Languages *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['English', 'Hindi', 'Assamese', 'Bengali', 'Mising', 'Bodo', 'Karbi', 'Other'].map((lang) => (
                                            <button
                                                key={lang}
                                                type="button"
                                                onClick={() => toggleLanguage(lang)}
                                                className={`px-4 py-2 rounded-full text-sm transition-all ${formData.languages.includes(lang) ? 'text-white' : ''
                                                    }`}
                                                style={{
                                                    background: formData.languages.includes(lang)
                                                        ? 'var(--gradient-tea)'
                                                        : 'var(--bg-secondary)',
                                                }}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.languages && (
                                        <p className="text-sm mt-2" style={{ color: 'var(--error)' }}>{errors.languages}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Years of Experience (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.yearsExperience}
                                        onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                                        placeholder="e.g., 5 years"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Confirm */}
                    {step === 4 && (
                        <div className="animate-slide-up">
                            <h2
                                className="text-2xl font-bold mb-2"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                Final Step
                            </h2>
                            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                                Review and submit your application
                            </p>

                            {/* Summary */}
                            <div
                                className="p-6 rounded-2xl mb-8"
                                style={{ background: 'var(--bg-secondary)' }}
                            >
                                <h3 className="font-semibold mb-4">Application Summary</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span style={{ color: 'var(--text-muted)' }}>Host Type</span>
                                        <p className="font-medium capitalize">{formData.hostType.replace('_', ' ')}</p>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)' }}>Name</span>
                                        <p className="font-medium">{formData.name}</p>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)' }}>Email</span>
                                        <p className="font-medium">{formData.email}</p>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--text-muted)' }}>District</span>
                                        <p className="font-medium">{formData.district}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span style={{ color: 'var(--text-muted)' }}>Languages</span>
                                        <p className="font-medium">{formData.languages.join(', ')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Agreements */}
                            <div className="space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeTerms}
                                        onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                                        className="w-5 h-5 mt-0.5 rounded"
                                    />
                                    <span className="text-sm">
                                        I agree to RhinoRoam's <Link href="/terms" className="underline">Terms of Service</Link> and
                                        <Link href="/privacy" className="underline"> Privacy Policy</Link>
                                    </span>
                                </label>
                                {errors.agreeTerms && (
                                    <p className="text-sm ml-8" style={{ color: 'var(--error)' }}>{errors.agreeTerms}</p>
                                )}

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeVerification}
                                        onChange={(e) => setFormData(prev => ({ ...prev, agreeVerification: e.target.checked }))}
                                        className="w-5 h-5 mt-0.5 rounded"
                                    />
                                    <span className="text-sm">
                                        I understand that RhinoRoam will verify my identity and may conduct a
                                        background check before approving my host profile
                                    </span>
                                </label>
                                {errors.agreeVerification && (
                                    <p className="text-sm ml-8" style={{ color: 'var(--error)' }}>{errors.agreeVerification}</p>
                                )}
                            </div>

                            {errors.submit && (
                                <div
                                    className="flex items-center gap-2 p-4 rounded-xl mt-6"
                                    style={{ background: 'rgba(198, 40, 40, 0.1)', color: 'var(--error)' }}
                                >
                                    <AlertCircle className="w-5 h-5" />
                                    {errors.submit}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-4 mt-12">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(prev => prev - 1)}
                                className="btn-ghost flex-1"
                                disabled={isSubmitting}
                            >
                                Back
                            </button>
                        )}

                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="btn-primary flex-1"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
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
                                        Submitting...
                                    </>
                                ) : (
                                    <>Submit Application</>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
