'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin, Calendar, Users, ArrowRight, ArrowLeft, Check,
    ChevronLeft, Sparkles, Clock, Sun, Leaf, Bird, Waves,
    Tent, Mountain, Camera, Heart, Send, Loader2
} from 'lucide-react';

/* ============================================
   AI TRIP PLANNER
   Plan Your Assam Journey
   ============================================ */

// Types
interface TripPreferences {
    districts: string[];
    experiences: string[];
    duration: number;
    travelers: number;
    travelMonth: string;
    budget: 'budget' | 'mid-range' | 'luxury';
    pace: 'relaxed' | 'balanced' | 'packed';
    specialRequests: string;
}

// Experience categories
const experienceCategories = [
    { id: 'wildlife', label: 'Wildlife Safari', icon: <Bird className="w-6 h-6" />, description: 'Kaziranga, Manas, one-horned rhinos' },
    { id: 'tea', label: 'Tea Trails', icon: <Leaf className="w-6 h-6" />, description: 'Heritage gardens & tastings' },
    { id: 'river', label: 'River Journeys', icon: <Waves className="w-6 h-6" />, description: 'Brahmaputra cruises & islands' },
    { id: 'tribal', label: 'Tribal Immersion', icon: <Tent className="w-6 h-6" />, description: 'Mising, Bodo, Karbi villages' },
    { id: 'heritage', label: 'Heritage & History', icon: <Camera className="w-6 h-6" />, description: 'Ahom monuments, Satras' },
    { id: 'adventure', label: 'Adventure', icon: <Mountain className="w-6 h-6" />, description: 'Trekking, rafting, camping' },
];

// Popular districts
const popularDistricts = [
    { id: 'kamrup-metro', name: 'Guwahati', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&q=80' },
    { id: 'golaghat', name: 'Kaziranga', image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=300&q=80' },
    { id: 'majuli', name: 'Majuli', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&q=80' },
    { id: 'sivasagar', name: 'Sivasagar', image: 'https://images.unsplash.com/photo-1580744569308-23dc45de0d88?w=300&q=80' },
    { id: 'dibrugarh', name: 'Dibrugarh', image: 'https://images.unsplash.com/photo-1597318109527-4d700f12b5c3?w=300&q=80' },
    { id: 'kokrajhar', name: 'Kokrajhar', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&q=80' },
    { id: 'karbi-anglong', name: 'Karbi Hills', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80' },
    { id: 'dima-hasao', name: 'Haflong', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80' },
];

// Duration options
const durationOptions = [
    { days: 3, label: '3 Days', description: 'Weekend escape' },
    { days: 5, label: '5 Days', description: 'Short break' },
    { days: 7, label: '1 Week', description: 'Recommended' },
    { days: 10, label: '10 Days', description: 'Deep exploration' },
    { days: 14, label: '2 Weeks', description: 'Ultimate journey' },
];

// Months
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Sample generated itinerary
const sampleItinerary = {
    title: 'Wildlife & Culture: The Best of Assam',
    duration: '7 Days / 6 Nights',
    highlights: ['Kaziranga Safari', 'Majuli Satra Tour', 'Tea Garden Stay', 'Sivasagar Heritage'],
    days: [
        {
            day: 1,
            title: 'Arrival in Guwahati',
            location: 'Guwahati',
            activities: [
                'Arrive at Lokpriya Gopinath Bordoloi Airport',
                'Visit Kamakhya Temple',
                'Evening stroll at Brahmaputra riverfront',
                'Welcome dinner with Assamese cuisine'
            ],
            accommodation: 'Hotel in Guwahati',
            meals: 'Dinner'
        },
        {
            day: 2,
            title: 'Journey to Kaziranga',
            location: 'Kaziranga',
            activities: [
                'Early morning drive to Kaziranga (5 hours)',
                'Check-in at eco-lodge',
                'Afternoon Jeep Safari (Central Range)',
                'Evening nature walk'
            ],
            accommodation: 'Kaziranga Eco Lodge',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 3,
            title: 'Kaziranga Safari Day',
            location: 'Kaziranga',
            activities: [
                'Dawn Elephant Safari',
                'Bird watching session',
                'Jeep Safari (Western Range)',
                'Visit local Mising village'
            ],
            accommodation: 'Kaziranga Eco Lodge',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 4,
            title: 'Majuli Island',
            location: 'Majuli',
            activities: [
                'Drive to Jorhat ferry point',
                'Ferry ride to Majuli Island',
                'Visit Kamalabari & Auniati Satras',
                'Mask-making workshop'
            ],
            accommodation: 'Satra Guesthouse',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 5,
            title: 'Majuli & Tea Country',
            location: 'Dibrugarh',
            activities: [
                'Morning cycling tour of Majuli',
                'Visit Mising tribal village',
                'Ferry back and drive to Dibrugarh',
                'Arrive at heritage tea bungalow'
            ],
            accommodation: 'Heritage Tea Bungalow',
            meals: 'Breakfast, Lunch, High Tea, Dinner'
        },
        {
            day: 6,
            title: 'Tea Garden Experience',
            location: 'Dibrugarh',
            activities: [
                'Morning tea plucking experience',
                'Tea factory tour',
                'Tea tasting session',
                'Drive to Sivasagar (2 hours)'
            ],
            accommodation: 'Hotel in Sivasagar',
            meals: 'Breakfast, Lunch, Dinner'
        },
        {
            day: 7,
            title: 'Ahom Heritage & Departure',
            location: 'Sivasagar / Jorhat',
            activities: [
                'Visit Rang Ghar & Talatal Ghar',
                'Explore Sivasagar Tank',
                'Drive to Jorhat airport',
                'Departure'
            ],
            accommodation: '-',
            meals: 'Breakfast'
        }
    ],
    estimatedCost: {
        budget: 35000,
        midRange: 55000,
        luxury: 95000
    }
};

export default function TripPlannerPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showItinerary, setShowItinerary] = useState(false);

    const [preferences, setPreferences] = useState<TripPreferences>({
        districts: [],
        experiences: [],
        duration: 7,
        travelers: 2,
        travelMonth: 'November',
        budget: 'mid-range',
        pace: 'balanced',
        specialRequests: ''
    });

    const toggleDistrict = (id: string) => {
        setPreferences(prev => ({
            ...prev,
            districts: prev.districts.includes(id)
                ? prev.districts.filter(d => d !== id)
                : [...prev.districts, id]
        }));
    };

    const toggleExperience = (id: string) => {
        setPreferences(prev => ({
            ...prev,
            experiences: prev.experiences.includes(id)
                ? prev.experiences.filter(e => e !== id)
                : [...prev.experiences, id]
        }));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsGenerating(false);
        setShowItinerary(true);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="animate-slide-up">
                        <h2
                            className="text-2xl font-bold mb-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            What kind of experiences interest you?
                        </h2>
                        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                            Select all that appeal to you
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {experienceCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => toggleExperience(cat.id)}
                                    className={`p-6 rounded-2xl text-left transition-all ${preferences.experiences.includes(cat.id)
                                        ? 'ring-2 ring-[var(--tea-garden)] shadow-lg'
                                        : ''
                                        }`}
                                    style={{
                                        background: preferences.experiences.includes(cat.id)
                                            ? 'rgba(27, 77, 46, 0.08)'
                                            : 'var(--bg-card)',
                                        borderColor: preferences.experiences.includes(cat.id)
                                            ? 'var(--tea-garden)'
                                            : 'var(--border-light)',
                                        border: '1px solid',
                                    }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                                        style={{
                                            background: preferences.experiences.includes(cat.id)
                                                ? 'var(--gradient-tea)'
                                                : 'var(--bg-secondary)',
                                            color: preferences.experiences.includes(cat.id)
                                                ? 'white'
                                                : 'var(--tea-garden)'
                                        }}
                                    >
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-semibold mb-1">{cat.label}</h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        {cat.description}
                                    </p>
                                    {preferences.experiences.includes(cat.id) && (
                                        <div
                                            className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center text-white"
                                            style={{ background: 'var(--tea-garden)' }}
                                        >
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="animate-slide-up">
                        <h2
                            className="text-2xl font-bold mb-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Where would you like to go?
                        </h2>
                        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                            Select districts to include (or we'll suggest based on your interests)
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {popularDistricts.map((district) => (
                                <button
                                    key={district.id}
                                    onClick={() => toggleDistrict(district.id)}
                                    className={`relative rounded-2xl overflow-hidden transition-all ${preferences.districts.includes(district.id)
                                        ? 'ring-2 ring-[var(--tea-garden)] shadow-lg'
                                        : ''
                                        }`}
                                >
                                    <div className="relative h-28">
                                        <Image
                                            src={district.image}
                                            alt={district.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                background: preferences.districts.includes(district.id)
                                                    ? 'rgba(27, 77, 46, 0.6)'
                                                    : 'rgba(0,0,0,0.3)'
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white font-semibold text-lg">{district.name}</span>
                                        </div>
                                        {preferences.districts.includes(district.id) && (
                                            <div
                                                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white"
                                                style={{ background: 'var(--tea-garden)' }}
                                            >
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="animate-slide-up">
                        <h2
                            className="text-2xl font-bold mb-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Trip Details
                        </h2>
                        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                            Tell us more about your trip preferences
                        </p>

                        <div className="space-y-8">
                            {/* Duration */}
                            <div>
                                <label className="block font-medium mb-4">How many days?</label>
                                <div className="flex flex-wrap gap-3">
                                    {durationOptions.map((option) => (
                                        <button
                                            key={option.days}
                                            onClick={() => setPreferences(prev => ({ ...prev, duration: option.days }))}
                                            className={`px-5 py-3 rounded-xl text-center transition-all ${preferences.duration === option.days ? 'text-white' : ''
                                                }`}
                                            style={{
                                                background: preferences.duration === option.days
                                                    ? 'var(--gradient-tea)'
                                                    : 'var(--bg-card)',
                                                border: '1px solid var(--border-light)'
                                            }}
                                        >
                                            <div className="font-semibold">{option.label}</div>
                                            <div className="text-xs opacity-80">{option.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Travelers */}
                            <div>
                                <label className="block font-medium mb-4">Number of travelers</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setPreferences(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                                        style={{ background: 'var(--bg-secondary)' }}
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-bold w-16 text-center">{preferences.travelers}</span>
                                    <button
                                        onClick={() => setPreferences(prev => ({ ...prev, travelers: Math.min(10, prev.travelers + 1) }))}
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                                        style={{ background: 'var(--bg-secondary)' }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Travel Month */}
                            <div>
                                <label className="block font-medium mb-4">When do you plan to travel?</label>
                                <div className="flex flex-wrap gap-2">
                                    {months.map((month) => (
                                        <button
                                            key={month}
                                            onClick={() => setPreferences(prev => ({ ...prev, travelMonth: month }))}
                                            className={`px-4 py-2 rounded-full text-sm transition-all ${preferences.travelMonth === month ? 'text-white' : ''
                                                }`}
                                            style={{
                                                background: preferences.travelMonth === month
                                                    ? 'var(--gradient-muga)'
                                                    : 'var(--bg-card)',
                                                border: '1px solid var(--border-light)'
                                            }}
                                        >
                                            {month}
                                        </button>
                                    ))}
                                </div>
                                {['May', 'June', 'July', 'August', 'September'].includes(preferences.travelMonth) && (
                                    <p className="mt-3 text-sm p-3 rounded-xl" style={{ background: 'rgba(198, 40, 40, 0.1)', color: 'var(--error)' }}>
                                        ⚠️ Monsoon season: Some areas may be flooded. Kaziranga is closed May-October.
                                    </p>
                                )}
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block font-medium mb-4">Budget preference</label>
                                <div className="flex gap-3">
                                    {(['budget', 'mid-range', 'luxury'] as const).map((budget) => (
                                        <button
                                            key={budget}
                                            onClick={() => setPreferences(prev => ({ ...prev, budget }))}
                                            className={`flex-1 p-4 rounded-xl text-center transition-all ${preferences.budget === budget ? 'text-white' : ''
                                                }`}
                                            style={{
                                                background: preferences.budget === budget
                                                    ? 'var(--gradient-tea)'
                                                    : 'var(--bg-card)',
                                                border: '1px solid var(--border-light)'
                                            }}
                                        >
                                            <div className="font-semibold capitalize">{budget}</div>
                                            <div className="text-xs opacity-80">
                                                {budget === 'budget' && '₹3-5k/day'}
                                                {budget === 'mid-range' && '₹5-10k/day'}
                                                {budget === 'luxury' && '₹10k+/day'}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label className="block font-medium mb-4">Any special requests?</label>
                                <textarea
                                    value={preferences.specialRequests}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, specialRequests: e.target.value }))}
                                    placeholder="E.g., vegetarian food, accessibility needs, specific festivals to attend..."
                                    className="input-field min-h-[100px]"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (showItinerary) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
                {/* Header */}
                <header
                    className="py-6"
                    style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}
                >
                    <div className="container-custom flex items-center justify-between">
                        <button
                            onClick={() => setShowItinerary(false)}
                            className="flex items-center gap-2 text-sm font-medium"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Modify Plan
                        </button>
                        <div className="flex gap-3">
                            <button className="btn-ghost">
                                <Heart className="w-4 h-4" />
                                Save
                            </button>
                            <button className="btn-primary">
                                <Send className="w-4 h-4" />
                                Book This Trip
                            </button>
                        </div>
                    </div>
                </header>

                {/* Itinerary Content */}
                <section className="section-padding">
                    <div className="container-custom max-w-4xl">
                        {/* Title */}
                        <div className="text-center mb-12">
                            <span className="badge badge-muga mb-4">
                                <Sparkles className="w-4 h-4" />
                                AI Generated Itinerary
                            </span>
                            <h1
                                className="text-3xl md:text-4xl font-bold mb-4"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                {sampleItinerary.title}
                            </h1>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                {sampleItinerary.duration} • {preferences.travelers} travelers • {preferences.travelMonth}
                            </p>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {sampleItinerary.highlights.map((highlight, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 rounded-full text-sm font-medium"
                                    style={{ background: 'var(--bg-secondary)' }}
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>

                        {/* Day by Day */}
                        <div className="space-y-6">
                            {sampleItinerary.days.map((day) => (
                                <div key={day.day} className="heritage-card p-6">
                                    <div
                                        className="flex items-center gap-4 mb-4 pb-4"
                                        style={{ borderBottom: '1px solid var(--border-light)' }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white"
                                            style={{ background: 'var(--gradient-tea)' }}
                                        >
                                            {day.day}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{day.title}</h3>
                                            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                                <MapPin className="w-4 h-4" />
                                                {day.location}
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-4">
                                        {day.activities.map((activity, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--tea-garden)' }} />
                                                <span style={{ color: 'var(--text-secondary)' }}>{activity}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                                        {day.accommodation !== '-' && (
                                            <span className="flex items-center gap-1">
                                                🏨 {day.accommodation}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            🍽️ {day.meals}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cost Estimate */}
                        <div
                            className="mt-12 p-8 rounded-2xl text-center"
                            style={{ background: 'var(--bg-secondary)' }}
                        >
                            <h3 className="font-semibold text-lg mb-4">Estimated Cost</h3>
                            <div className="text-4xl font-bold mb-2" style={{ color: 'var(--tea-deep)' }}>
                                ₹{sampleItinerary.estimatedCost[preferences.budget === 'mid-range' ? 'midRange' : preferences.budget].toLocaleString()}
                            </div>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                per person (based on {preferences.budget} budget)
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="py-12 relative overflow-hidden"
                style={{ background: 'var(--gradient-river)' }}
            >
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
                        <span className="badge badge-muga mb-4">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Planning
                        </span>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Plan Your <span style={{ color: 'var(--muga-light)' }}>Dream Trip</span>
                        </h1>
                        <p className="text-lg text-white/80">
                            Tell us your preferences and we'll create a personalized itinerary for your Assam adventure
                        </p>
                    </div>
                </div>
            </header>

            {/* Progress */}
            <div className="py-6" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)' }}>
                <div className="container-custom">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= step ? 'text-white' : ''
                                        }`}
                                    style={{
                                        background: currentStep >= step ? 'var(--gradient-tea)' : 'var(--bg-secondary)',
                                        color: currentStep >= step ? 'white' : 'var(--text-muted)'
                                    }}
                                >
                                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className="w-24 md:w-32 h-1 mx-2"
                                        style={{
                                            background: currentStep > step ? 'var(--tea-garden)' : 'var(--border-light)'
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between max-w-2xl mx-auto mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span>Experiences</span>
                        <span>Destinations</span>
                        <span>Details</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="section-padding">
                <div className="container-custom max-w-4xl">
                    {renderStep()}

                    {/* Navigation */}
                    <div className="flex justify-between mt-12 pt-8" style={{ borderTop: '1px solid var(--border-light)' }}>
                        <button
                            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                            className={`btn-ghost ${currentStep === 1 ? 'opacity-50' : ''}`}
                            disabled={currentStep === 1}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        {currentStep < 3 ? (
                            <button
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                className="btn-primary"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleGenerate}
                                className="btn-primary"
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Generate My Itinerary
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
